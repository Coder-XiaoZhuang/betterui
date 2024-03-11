import React, { FC, useState, ChangeEvent } from 'react';
import Input, { InputProps } from '../Input/input';

export interface AutoCompleteProps extends Omit<InputProps, 'onSelect'> {
  fetchSuggestions: (str: string) => string[] | Promise<string[]>;
  onSelect?: (item: string) => void;
}

export const AutoComplete: FC<AutoCompleteProps> = (props) => {
  const { fetchSuggestions, onSelect, value, ...restProps } = props;
  const [inputValue, setInputValue] = useState(value);
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.trim();
    setInputValue(value);
    if (value) {
      const results = fetchSuggestions(value);
      setSuggestions(results);
    } else {
      setSuggestions([]);
    }
  };
  const handleSelect = (item: string) => {
    setInputValue(item);
    setSuggestions([]);
    if (onSelect) {
      onSelect(item);
    }
  }
  const generateDropdown = () => {
    return (
      <ul>
        { 
          suggestions.map((item, index) => {
            return (
              <li key={ index } onClick={ () => handleSelect(item) }>
                { item }
              </li>
            );
          })
        }
      </ul>
    );
  };
  return (
    <div className='better-auto-comlete'>
      <Input
        value={ inputValue }
        { ...restProps }
        onChange={ handleChange }
      >
      </Input>
      { suggestions.length > 0 && generateDropdown() }
    </div>
  );
}