import React from "react";
import classNames from "classnames";

export enum ButtonSize {
  Large = "lg",
  Small = "sm",
};

export enum ButtonType {
  Primary = "primary",
  Default = "default",
  Danger = "danger",
  Link = "link",
};

interface BaseButtonProps {
  className?: string;
  disabled?: boolean;
  size?: ButtonSize;
  btnType?: ButtonType;
  children: React.ReactNode;
  href?: string;
};

type NativeButtonProps = BaseButtonProps & React.ButtonHTMLAttributes<HTMLElement>;
type AnchorButtonProps = BaseButtonProps & React.AnchorHTMLAttributes<HTMLElement>;
export type ButtonProps = Partial<NativeButtonProps & AnchorButtonProps>;

const Button: React.FC<ButtonProps> = (props) => {
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
    "disabled": (btnType === ButtonType.Link) && disabled,
  });

  // 当按钮类型为 Link 时，返回 a 标签
  if (btnType === ButtonType.Link && href) {
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
  btnType: ButtonType.Default,
};

export default Button;