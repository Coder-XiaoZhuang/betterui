import React, { useState } from 'react';
import classNames from 'classnames';
import Icon from '../Icon';
import Transition from '../Transition';
;
/**
 * 用来展现需要重点关注的信息。
 *
 * ~~~js
 * // 这样引用
 * import { BetterAlert } from 'betterui';
 * ~~~
 *
 */
export var Alert = function (props) {
    var _a;
    var _b = useState(false), hide = _b[0], setHide = _b[1];
    var title = props.title, description = props.description, type = props.type, onClose = props.onClose, closable = props.closable;
    var classes = classNames('better-alert', (_a = {},
        _a["better-alert-".concat(type)] = type,
        _a));
    var titleClass = classNames('better-alert-title', {
        'bold-title': description,
    });
    var handleClose = function (e) {
        if (onClose) {
            onClose();
        }
        setHide(true);
    };
    return (React.createElement(Transition, { in: !hide, timeout: 300, animation: "zoom-in-top" },
        React.createElement("div", { className: classes },
            React.createElement("span", { className: titleClass }, title),
            description && React.createElement("p", { className: "better-alert-desc" }, description),
            closable && React.createElement("span", { className: "better-alert-close", onClick: handleClose },
                React.createElement(Icon, { icon: "times" })))));
};
Alert.defaultProps = {
    type: 'default',
    closable: true,
};
export default Alert;
