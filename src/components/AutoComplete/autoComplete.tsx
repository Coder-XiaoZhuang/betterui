import React, { FC, useState, ChangeEvent, KeyboardEvent, ReactElement, useEffect, useRef } from 'react';
import classNames from 'classnames';
import Input, { InputProps } from '../Input/input';
import Icon from '../Icon/icon';
import useDebounce from '../../hooks/useDebounce';
import useClickOutside from '../../hooks/useClickOutside';

interface DataSourceObject {
  value: string;
};
export type DataSourceType<T = {}> = T & DataSourceObject;
export interface AutoCompleteProps extends Omit<InputProps, 'onSelect'> {
  fetchSuggestions: (str: string) => DataSourceType[] | Promise<DataSourceType[]>;
  onSelect?: (item: DataSourceType) => void;
  renderOption?: (item: DataSourceType) => ReactElement;
}

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
      <ul>
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
    );
  };
  return (
    <div className='better-auto-comlete' ref={ componentRef }>
      <Input
        value={ inputValue }
        { ...restProps }
        onChange={ handleChange }
        onKeyDown={ handleKeyDown }
      >
      </Input>
      { loading && <ul><Icon icon='spinner' spin /></ul> }
      { suggestions.length > 0 && generateDropdown() }
    </div>
  );
}