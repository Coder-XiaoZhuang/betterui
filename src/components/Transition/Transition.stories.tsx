import React, { useState } from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import BetterTransition from './transition';
import BetterButton from '../Button';

export default {
  title: 'Transition 过渡效果',
  id: 'BetterTransition',
  component: BetterTransition,
  parameters: {
    docs: {
      source: {
        type: "code",
      },
    },
  },
} as ComponentMeta<typeof BetterTransition>;

export const DefaultTransition: ComponentStory<typeof BetterTransition> = (args) => {
  const [ show, setShow ] = useState(false);
  return (
    <>
      <BetterButton 
        size="lg" 
        btnType='primary' 
        onClick={ () => setShow(!show) }
      >
        { show ? 'close' : 'open' }
      </BetterButton>
      
      {/* 当wrapper为true时，Transition组件的子元素无须包裹一个根元素 */}
      <BetterTransition {...args } in={ show } timeout={ 300 } wrapper>
         hi, I am betterui!
      </BetterTransition>

      {/* 当wrapper为false时，Transition组件的子元素必须包裹一个根元素 */}
      <BetterTransition {...args } in={ show } timeout={ 300 } wrapper={ false }>
         <div>hi, I am betterui!</div>
      </BetterTransition>
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
      <BetterButton 
        size="lg" 
        btnType='primary' 
        style={ { margin: '10px 0' } } 
        onClick={ () => setShow(!show) }
      >
        { show ? 'close' : 'open' }
      </BetterButton>

      <BetterTransition
        in={ show }
        timeout={ 300 }
        animation="zoom-in-left"
        wrapper
      >
        <BetterButton size="lg"> Default BetterButton </BetterButton>
      </BetterTransition>
    </>
  );
};
CombineTransition.storyName = '其他组件和过渡效果结合使用';