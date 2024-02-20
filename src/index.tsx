import React from 'react';
import { createRoot } from 'react-dom/client';
import './styles/index.scss';
import App from './App';
import reportWebVitals from './reportWebVitals';

const container = document.getElementById('root') as HTMLElement;
const root = createRoot(container);

root.render(
  // react 严格模式不兼容部分旧的写法，例如CSSTransition库
  // <React.StrictMode>
  //   <App />
  // </React.StrictMode>
  <App />
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
