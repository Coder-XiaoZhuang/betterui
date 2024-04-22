import React, { createContext, useState } from "react";
import classNames from "classnames";
;
;
export var MenuContext = createContext({ index: '0' });
/**
 * 为网站提供导航功能的菜单。支持横向纵向两种模式，支持下拉菜单
 *
 * ~~~js
 * // 这样引用，再分别使用 <BetterMenu>，<BetterMenu.SubMenu>，<BetterMenu.Item>
 * import { BetterMenu } from 'betterui';
 * ~~~
 *
 */
export var Menu = function (props) {
    var className = props.className, mode = props.mode, style = props.style, children = props.children, defaultIndex = props.defaultIndex, onSelect = props.onSelect, defaultOpenSubMenus = props.defaultOpenSubMenus;
    var _a = useState(defaultIndex), currentActive = _a[0], setActive = _a[1];
    var classes = classNames("better-menu", className, {
        "menu-vertical": mode === "vertical",
        'menu-horizontal': mode !== 'vertical',
    });
    var handleClick = function (index) {
        setActive(index);
        if (onSelect) {
            onSelect(index);
        }
    };
    var passedContext = {
        index: currentActive || '0',
        onSelect: handleClick,
        mode: mode,
        defaultOpenSubMenus: defaultOpenSubMenus,
    };
    var renderChildren = function () {
        return React.Children.map(children, function (child, index) {
            var childElement = child;
            var displayName = childElement.type.displayName;
            if (displayName === 'MenuItem' || displayName === 'SubMenu') {
                return React.cloneElement(childElement, {
                    index: index.toString(),
                });
            }
            else {
                console.error('Warning: Menu has a child which is not a MenuItem component');
            }
        });
    };
    return (React.createElement("ul", { className: classes, style: style, "data-testid": "test-menu" },
        React.createElement(MenuContext.Provider, { value: passedContext }, renderChildren())));
};
Menu.defaultProps = {
    defaultIndex: '0',
    mode: "horizontal",
    defaultOpenSubMenus: [],
};
export default Menu;
