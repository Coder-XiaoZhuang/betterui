import React, { useState } from 'react';
import { library } from '@fortawesome/fontawesome-svg-core';
import { fas } from '@fortawesome/free-solid-svg-icons';
import Button from './components/Button';
import Menu from './components/Menu/menu';
import MenuItem from './components/Menu/menuItem';
import SubMenu from './components/Menu/subMenu';
import Icon from './components/Icon';
import Transition from './components/Transition';

library.add(fas);

function App() {
  const [ show, setShow ] = useState(false);

  return (
    <div className="App">
      <header className="App-header">
        <Icon icon="coffee" theme="primary" size="10x" />
        <Menu defaultIndex="0" onSelect={(index) => alert(index)} mode="horizontal">
          <MenuItem>
            cool link
          </MenuItem>
          <MenuItem disabled>
            cool link 2
          </MenuItem>
          <SubMenu title='dropdown'>
            <MenuItem>
              dropdown1
            </MenuItem>
            <MenuItem>
              dropdown2
            </MenuItem>
          </SubMenu>
          <MenuItem>
            cool link 3
          </MenuItem>
        </Menu>
        <Button size="lg" btnType='primary' onClick={ () => setShow(!show) }>{ show ? 'close' : 'open' }</Button>
        <Transition
          in={ show }
          timeout={ 300 }
          animation="zoom-in-left"
        >
          <div>hi, I am better</div>
        </Transition>
        <Transition
          in={ show }
          timeout={ 300 }
          animation="zoom-in-left"
          wrapper
        >
          <div><Button size="lg" btnType='primary'>better btn</Button></div>
        </Transition>
      </header>
    </div>
  );
}

export default App;
