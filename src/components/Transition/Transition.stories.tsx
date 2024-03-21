import React, { useState } from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import Transition from './transition';
import Button from '../Button/button';

export default {
  title: 'Transition 过渡效果',
  id: 'Transition',
  component: Transition,
  parameters: {
    docs: {
      source: {
        type: "code",
      },
    },
  },
} as ComponentMeta<typeof Transition>;

export const DefaultTransition: ComponentStory<typeof Transition> = (args) => {
  const [ show, setShow ] = useState(false);
  return (
    <>
      <Button 
        size="lg" 
        btnType='primary' 
        onClick={ () => setShow(!show) }
      >
        { show ? 'close' : 'open' }
      </Button>
      
      {/* 当wrapper为true时，Transition组件的子元素无须包裹一个根元素 */}
      <Transition {...args } in={ show } timeout={ 300 } wrapper>
         hi, I am betterui!
      </Transition>

      {/* 当wrapper为false时，Transition组件的子元素必须包裹一个根元素 */}
      <Transition {...args } in={ show } timeout={ 300 } wrapper={ false }>
         <div>hi, I am betterui!</div>
      </Transition>
    </>
  );
};

DefaultTransition.args = {
  animation: 'zoom-in-left',
  wrapper: false,
};
DefaultTransition.storyName = '默认的过渡效果';

export const CombineTransition = () => {
  const [ show, setShow ] = useState(false);
  return (
    <>
      <Button 
        size="lg" 
        btnType='primary' 
        style={ { margin: '10px 0' } } 
        onClick={ () => setShow(!show) }
      >
        { show ? 'close' : 'open' }
      </Button>

      <Transition
        in={ show }
        timeout={ 300 }
        animation="zoom-in-left"
        wrapper
      >
        <Button size="lg"> Default Button </Button>
      </Transition>
    </>
  );
};
CombineTransition.storyName = '其他组件和过渡效果结合使用';