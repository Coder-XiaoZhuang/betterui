import { FC } from 'react';
export type AlertType = 'success' | 'default' | 'danger' | 'warning';
export interface AlertProps {
    /**必填，设置 Alert 的标题 */
    title: string;
    /**选填，设置 Alert 的描述 */
    description?: string;
    /**选填，设置 Alert 的类型 */
    type?: AlertType;
    /**选填，设置 Alert 关闭时触发的事件 */
    onClose?: () => void;
    /**选填，设置 Alert 是否显示关闭图标*/
    closable?: boolean;
}
/**
 * 用来展现需要重点关注的信息。
 *
 * ~~~js
 * // 这样引用
 * import { BetterAlert } from 'betterui';
 * ~~~
 *
 */
export declare const Alert: FC<AlertProps>;
export default Alert;
