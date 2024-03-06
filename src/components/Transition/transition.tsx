import React from 'react';
import { CSSTransition } from 'react-transition-group';
import { CSSTransitionProps } from 'react-transition-group/CSSTransition';

type AnimationName = 'zoom-in-top' | 'zoom-in-left' | 'zoom-in-bottom' | 'zoom-in-right';
export type TransitionProps = {
  /**选填，设置动画的过渡方向 */
  animation?: AnimationName,
  /**
   * 选填，设置 Transition 的子元素是否有根元素进行包裹，
   * 当wrapper为false时，Transition组件的子元素必须包裹一个根元素
   * */
  wrapper?: boolean,
  /**选填，设置 Transition 的子元素<br /> */
  children?: React.ReactNode,
  /**选填，设置 Transition 的自定义类名<br /> */
  classNames?: unknown,
} & CSSTransitionProps;

/**
 * 页面中常用的内置组件，可以帮助你制作基于状态变化的过渡和动画效果
 * 
 * ~~~js
 * // 这样引用
 * import { Transition } from 'betterui';
 * ~~~
 * 
 */
export const Transition: React.FC<TransitionProps> = (props) => {
  const {
    children,
    classNames,
    animation,
    wrapper,
    ...restProps
  } = props;
  return (
    <CSSTransition
      classNames = { classNames ? classNames : animation }
      { ...restProps }
    >
      { wrapper ? <div>{ children }</div> : children }
    </CSSTransition>
  );
}
Transition.defaultProps = {
  unmountOnExit: true,
  appear: true,
};

export default Transition;