import React from 'react';
;
/**
 * 进度条，给予用户当前系统执行中任务运行状态的反馈，多用于运行一段时间的场景，有效减轻用户在等待中产生的焦虑感。
 *
 * ~~~js
 * // 这样引用
 * import { BetterProgress } from 'betterui';
 * ~~~
 *
 */
export var Progress = function (props) {
    var percent = props.percent, strokeHeight = props.strokeHeight, showText = props.showText, styles = props.styles, theme = props.theme;
    return (React.createElement("div", { className: "better-progress-bar", style: styles },
        React.createElement("div", { className: "better-progress-bar-outer", style: { height: "".concat(strokeHeight, "px") } },
            React.createElement("div", { className: "better-progress-bar-inner color-".concat(theme), style: { width: "".concat(percent, "%") } }, showText && React.createElement("span", { className: "inner-text" }, "".concat(percent, "%"))))));
};
Progress.defaultProps = {
    strokeHeight: 15,
    showText: true,
    theme: "primary",
};
export default Progress;
