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

const Button: React.FC<BaseButtonProps> = (props) => {
  const {
    btnType,
    disabled,
    size,
    children,
    href,
  } = props;

  const classes = classNames("btn", {
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
      >
        { children }
      </a>
    );
  } else {
    return (
      <button
        className={ classes }
        disabled={ disabled }
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