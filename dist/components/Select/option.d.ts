import { FC, ReactNode } from 'react';
export interface SelectOptionProps {
    /** 选填，标记选项的索引下标*/
    index?: string;
    /** 必填，默认根据此属性值进行筛选，该值不能相同*/
    value: string;
    /** 选填，选项的标签，若不设置则默认与 value 相同*/
    label?: string;
    /** 选填，是否禁用该选项*/
    disabled?: boolean;
    children?: ReactNode;
}
export declare const Option: FC<SelectOptionProps>;
export default Option;
