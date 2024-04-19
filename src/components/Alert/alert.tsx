import React, { FC, useState } from 'react';
import classNames from 'classnames';
import BetterIcon from '../Icon';
import BetterTransition from '../Transition';

export type AlertType = 'success' | 'default' | 'danger' | 'warning';
export interface AlertProps {
  /**必填，设置 Alert 的标题 */
  title: string;
  /**选填，设置 Alert 的描述 */
  description?: string;
  /**选填，设置 Alert 的类型 */
  type?: AlertType;
  /**选填，设置 Alert 关闭时触发的事件 */
  onClose?: () => void;
  /**选填，设置 Alert 是否显示关闭图标*/
  closable?: boolean;
};

/**
 * 用来展现需要重点关注的信息。
 * 
 * ~~~js
 * // 这样引用
 * import { BetterAlert } from 'betterui';
 * ~~~
 * 
 */
export const Alert: FC<AlertProps> = (props) => {
  const [ hide, setHide ] = useState(false);
  const {
    title,
    description,
    type,
    onClose,
    closable,
  } = props;
  const classes = classNames('better-alert', {
    [`better-alert-${type}`]: type,
  });
  const titleClass = classNames('better-alert-title', {
    'bold-title': description,
  });
  const handleClose = (e: React.MouseEvent) => {
    if (onClose) {
      onClose();
    }
    setHide(true);
  };
  return (
    <BetterTransition
      in={ !hide }
      timeout={ 300 }
      animation="zoom-in-top" 
    >
      <div className={ classes }>
        <span className={ titleClass }>{ title }</span>
        { description && <p className="better-alert-desc">{ description }</p> }
        { closable && <span className="better-alert-close" onClick={ handleClose }><BetterIcon icon="times"/></span> }
      </div>
    </BetterTransition>
  );
};

Alert.defaultProps = {
  type: 'default',
  closable: true,
};
export default Alert;