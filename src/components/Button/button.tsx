import React from "react";
import classNames from "classnames";

export type ButtonSize = 'lg' | 'sm';
export type ButtonType = 'primary' | 'default' | 'danger' | 'link';
interface BaseButtonProps {
  /**选填，设置 Button 的自定义类名 */
  className?: string;
  /**选填，设置 Button 的禁用 */
  disabled?: boolean;
  /**选填，设置 Button 的尺寸 */
  size?: ButtonSize;
  /**选填，设置 Button 的类型 */
  btnType?: ButtonType;
  /**选填，设置 Button 的子元素 */
  children: React.ReactNode;
  /**选填，设置 Button 的超链接目标，仅在btnType属性为link时有效 */
  href?: string;
};

type NativeButtonProps = BaseButtonProps & React.ButtonHTMLAttributes<HTMLElement>;
type AnchorButtonProps = BaseButtonProps & React.AnchorHTMLAttributes<HTMLElement>;
export type ButtonProps = Partial<NativeButtonProps & AnchorButtonProps>;

/**
 * 页面中最常用的的按钮元素，适合于完成特定的交互，支持 HTML button 和 a 链接 的所有属性
 * 
 * ~~~js
 * // 这样引用
 * import { BetterButton } from 'betterui';
 * ~~~
 * 
 */
export const Button: React.FC<ButtonProps> = (props) => {
  const {
    btnType,
    className,
    disabled,
    size,
    children,
    href,
    ...restProps
  } = props;

  const classes = classNames("btn", className, {
    [`btn-${btnType}`]: btnType,
    [`btn-${size}`]: size,
    "disabled": (btnType === "link") && disabled,
  });

  // 当按钮类型为 Link 时，返回 a 标签
  if (btnType === "link" && href) {
    return (
      <a
        className={ classes }
        href={ href }
        { ...restProps }
      >
        { children }
      </a>
    );
  } else {
    return (
      <button
        className={ classes }
        disabled={ disabled }
        { ...restProps }
      >
        { children }
      </button>
    );
  }
}

Button.defaultProps = {
  disabled: false,
  btnType: "default",
};

export default Button;