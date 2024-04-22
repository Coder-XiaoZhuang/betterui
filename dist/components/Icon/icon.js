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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
import React from 'react';
import classNames from 'classnames';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
;
/**
 * 提供了一套常用的图标集合，基于 react-fontawesome 实现
 *
 * 支持 react-fontawesome 的所有属性，可以在这里查询：
 *  https://github.com/FortAwesome/react-fontawesome#basic
 *
 * 支持 react-fontawesome 所有 free-solid-icons，可以在这里查看所有图标：
 *  https://fontawesome.com/icons?d=gallery&s=solid&m=free
 *
 * ~~~js
 * // 这样引用
 * import { BetterIcon } from 'betterui';
 * ~~~
 *
 */
export var Icon = function (props) {
    var _a;
    var className = props.className, theme = props.theme, restProps = __rest(props, ["className", "theme"]);
    var classes = classNames('better-icon', className, (_a = {},
        _a["icon-".concat(theme)] = theme,
        _a));
    return (React.createElement(FontAwesomeIcon, __assign({ className: classes }, restProps)));
};
export default Icon;
