import React, { FC, useState, ChangeEvent, KeyboardEvent, ReactElement, useEffect, useRef } from 'react';
import classNames from 'classnames';
import Input, { InputProps } from '../Input/input';
import Icon from '../Icon/icon';
import Transition from '../Transition/transition';
import useDebounce from '../../hooks/useDebounce';
import useClickOutside from '../../hooks/useClickOutside';
interface DataSourceObject {
  value: string;
};
export type DataSourceType<T = {}> = T & DataSourceObject;
export interface AutoCompleteProps extends Omit<InputProps, 'onSelect'> {
  /** 必填，可以拿到当前的输入，然后返回同步的数组或者是异步的 Promise */
  fetchSuggestions: (str: string) => DataSourceType[] | Promise<DataSourceType[]>;
  /** 选填，选中后执行的回调函数 */
  onSelect?: (item: DataSourceType) => void;
  /** 选填，支持自定义渲染下拉列表 */
  renderOption?: (item: DataSourceType) => ReactElement;
}

/**
 * 联想搜索，通过鼠标或键盘输入内容进行自动联想，支持同步和异步两种方式。
 * 支持 Input 组件的所有属性，支持键盘事件选择
 * 
 * ~~~js
 * // 这样引用
 * import { AutoComplete } from 'betterui';
 * ~~~
 * 
 */
export const AutoComplete: FC<AutoCompleteProps> = (props) => {
  const { fetchSuggestions, onSelect, value, renderOption, ...restProps } = props;
  const [inputValue, setInputValue] = useState(value as string);
  const [suggestions, setSuggestions] = useState<DataSourceType[]>([]);
  const [ loading, setLoading ] = useState(false);
  const [ highlightIndex, setHighlightIndex] = useState(-1);
  const triggerSearch = useRef(false);
  const componentRef = useRef<HTMLDivElement>(null);
  const debounceValue = useDebounce(inputValue, 500);
  useClickOutside(componentRef, () => { setSuggestions([]); });
  useEffect(() => {
    if (debounceValue && triggerSearch.current) {
      const results = fetchSuggestions(debounceValue);
      if (results instanceof Promise) {
        setLoading(true);
        results.then(data => {
          setLoading(false);
          setSuggestions(data);
        });
      } else {
        setSuggestions(results);
      }
    } else {
      setSuggestions([]);
    }
    setHighlightIndex(-1);
  }, [debounceValue, fetchSuggestions]);
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.trim();
    setInputValue(value);
    triggerSearch.current = true;
  };
  const handleSelect = (item: DataSourceType) => {
    setInputValue(item.value);
    setSuggestions([]);
    if (onSelect) {
      onSelect(item);
    }
    triggerSearch.current = false;
  }
  const highlight = (index: number) => {
    if (index < 0) index = 0;
    if (index >= suggestions.length) {
      index = suggestions.length - 1;
    }
    setHighlightIndex(index);
  }
  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    switch(e.keyCode) {
      // 回车键
      case 13:
        if (suggestions[highlightIndex]) {
          handleSelect(suggestions[highlightIndex]);
        }
        break;
      // 向上键
      case 38:
        highlight(highlightIndex - 1);
        break;
      // 向下键
      case 40:
        highlight(highlightIndex + 1);
        break;
      // ESC键
      case 27:
        setSuggestions([]);
        break;
      default:
        break;
    }
  }
  const renderTemplate = (item: DataSourceType) => {
    return renderOption ? renderOption(item) : item.value;
  }
  const generateDropdown = () => {
    return (
      <Transition
        in={ suggestions.length > 0 }
        animation="zoom-in-top"
        timeout={ 300 }
      >
        <ul className="better-suggestion-list">    
          { 
            suggestions.map((item, index) => {
              const activeItem = classNames('suggestion-item', {
                'is-active': index === highlightIndex,
              });
              return (
                <li key={ index } className={ activeItem } onClick={ () => handleSelect(item) }>
                  { renderTemplate(item) }
                </li>
              );
            })
          }
        </ul>
      </Transition>
    );
  };
  return (
    <div className='better-auto-complete' ref={ componentRef }>
      <Input
        value={ inputValue }
        { ...restProps }
        onChange={ handleChange }
        onKeyDown={ handleKeyDown }
      >
      </Input>  
      { loading &&
        <div className="loading-icon">
          <Icon icon="spinner" spin/>
        </div>
      } 
      { suggestions.length > 0 && generateDropdown() }
    </div>
  );
}

export default AutoComplete;