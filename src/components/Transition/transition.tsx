import React, { ReactNode } from 'react';
import { CSSTransition } from 'react-transition-group';
import { CSSTransitionProps } from 'react-transition-group/CSSTransition';

type AnimationName = 'zoom-in-top' | 'zoom-in-left' | 'zoom-in-bottom' | 'zoom-in-right';

type TransitionProps = CSSTransitionProps & {
  animation?: AnimationName,
  wrapper?: boolean,
  children?: ReactNode,
};

const Transition: React.FC<TransitionProps> = (props) => {
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