var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
import React, { useContext, useState } from "react";
import classNames from "classnames";
import { MenuContext } from "./menu";
import Icon from '../Icon';
import Transition from '../Transition';
;
var SubMenu = function (props) {
    var index = props.index, title = props.title, className = props.className, children = props.children;
    var context = useContext(MenuContext);
    var openedSubMenus = context.defaultOpenSubMenus;
    var isOpen = (index && context.mode === 'vertical') ? openedSubMenus.includes(index) : false;
    var _a = useState(isOpen), menuOpen = _a[0], setOpen = _a[1];
    var classes = classNames("menu-item submenu-item", className, {
        "is-active": context.index.includes("".concat(index)),
        'is-opened': menuOpen,
        'is-vertical': context.mode === 'vertical',
    });
    var handleClick = function (e) {
        e.preventDefault();
        setOpen(!menuOpen);
    };
    var timer;
    var handleMouse = function (e, toggle) {
        clearTimeout(timer);
        e.preventDefault();
        timer = setTimeout(function () {
            setOpen(toggle);
        }, 300);
    };
    var allEvents = (context.mode !== 'vertical' ?
        {
            onClick: handleClick,
            onMouseEnter: function (e) { handleMouse(e, true); },
            onMouseLeave: function (e) { handleMouse(e, false); },
        } :
        {
            onClick: handleClick,
        });
    var renderChildren = function () {
        var subMenuClasses = classNames("better-submenu", {
            "menu-opened": menuOpen,
        });
        var childrenComponent = React.Children.map(children, function (child, i) {
            var childElement = child;
            if (childElement.type.displayName === "MenuItem") {
                return React.cloneElement(childElement, {
                    index: "".concat(index, "-").concat(i),
                });
            }
            else {
                console.error("Warning: SubMenu has a child which is not a MenuItem component");
            }
        });
        return (React.createElement(Transition, { in: menuOpen, timeout: 300, animation: "zoom-in-top" },
            React.createElement("ul", { className: subMenuClasses }, childrenComponent)));
    };
    return (React.createElement("li", __assign({ key: index, className: classes }, allEvents),
        React.createElement("div", __assign({ className: "submenu-title" }, allEvents),
            title,
            React.createElement(Icon, { icon: "angle-down", className: "arrow-icon" })),
        renderChildren()));
};
SubMenu.displayName = 'SubMenu';
export default SubMenu;
