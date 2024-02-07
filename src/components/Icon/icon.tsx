import React, { FC } from 'react';
import classNames from 'classnames';
import { FontAwesomeIcon, FontAwesomeIconProps } from '@fortawesome/react-fontawesome';

export type ThemeProps = 'primary' | 'secondary' | 'success' | 'info' | 'warning' | 'danger' | 'light' | 'dark';

export interface IconProps extends FontAwesomeIconProps {
  /** 支持框架主题 根据主题显示不同的颜色 */
  theme? : ThemeProps,
}

export const Icon: FC<IconProps> = (props) => {
  const { className, theme, ...restProps } = props;
  const classes = classNames('better-icon', className, {
    [`icon-${theme}`]: theme,
  });
  return (
    <FontAwesomeIcon className={ classes } { ...restProps } />
  );
}

export default Icon;