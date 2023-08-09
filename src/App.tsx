import React from 'react';
import Button, { ButtonSize, ButtonType } from './components/Button/button';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <Button disabled>Hello Button1</Button>
        <Button btnType={ ButtonType.Primary } size={ ButtonSize.Large }>Hello Button2</Button>  
        <Button btnType={ ButtonType.Danger }>Hello Button3</Button>
        <Button btnType={ ButtonType.Link } href="http://baidu.com" disabled>Hello Button4</Button>
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
