import React, { useState } from 'react';
import { library } from '@fortawesome/fontawesome-svg-core';
import { fas } from '@fortawesome/free-solid-svg-icons';
import BetterButton from './components/Button';
import BetterMenu from './components/Menu';
import BetterIcon from './components/Icon';
import BetterTransition from './components/Transition';

library.add(fas);

function App() {
  const [ show, setShow ] = useState(false);

  return (
    <div className="App">
      <header className="App-header">
        <BetterIcon icon="coffee" theme="primary" size="10x" />
        <BetterMenu defaultIndex="0" onSelect={(index) => alert(index)} mode="horizontal">
          <BetterMenu.Item>
            cool link
          </BetterMenu.Item>
          <BetterMenu.Item disabled>
            cool link 2
          </BetterMenu.Item>
          <BetterMenu.SubMenu title='dropdown'>
            <BetterMenu.Item>
              dropdown1
            </BetterMenu.Item>
            <BetterMenu.Item>
              dropdown2
            </BetterMenu.Item>
          </BetterMenu.SubMenu>
          <BetterMenu.Item>
            cool link 3
          </BetterMenu.Item>
        </BetterMenu>
        <BetterButton size="lg" btnType='primary' onClick={ () => setShow(!show) }>{ show ? 'close' : 'open' }</BetterButton>
        <BetterTransition
          in={ show }
          timeout={ 300 }
          animation="zoom-in-left"
        >
          <div>hi, I am better</div>
        </BetterTransition>
        <BetterTransition
          in={ show }
          timeout={ 300 }
          animation="zoom-in-left"
          wrapper
        >
          <div><BetterButton size="lg" btnType='primary'>better btn</BetterButton></div>
        </BetterTransition>
      </header>
    </div>
  );
}

export default App;
