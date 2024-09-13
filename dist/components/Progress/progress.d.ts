import React, { FC } from 'react';
import { ThemeProps } from '../Icon/icon';
export interface ProgressProps {
    /**必填，设置进度条的进度百分比 */
    percent: number;
    /**选填，设置进度条的高度，默认为15px */
    strokeHeight?: number;
    /**选填，是否显示进度条的百分比，默认展示 */
    showText?: boolean;
    /**选填，设置进度条的样式 */
    styles?: React.CSSProperties;
    /**选填，设置进度条的主题，仅支持以下9种主题 */
    theme?: ThemeProps;
}
/**
 * 进度条，给予用户当前系统执行中任务运行状态的反馈，多用于运行一段时间的场景，有效减轻用户在等待中产生的焦虑感。
 *
 * ~~~js
 * // 这样引用
 * import { BetterProgress } from 'betterui';
 * ~~~
 *
 */
export declare const Progress: FC<ProgressProps>;
export default Progress;
