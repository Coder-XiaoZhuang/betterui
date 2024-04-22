import { FC, ReactNode } from 'react';
export type UploadFileStatus = 'ready' | 'uploading' | 'success' | 'error';
export interface UploadFile {
    uid: string;
    size: number;
    name: string;
    status?: UploadFileStatus;
    percent: number;
    raw?: File;
    response?: any;
    error?: any;
}
export interface UploadProps {
    /**必填, 上传的地址 */
    action: string;
    /**选填，上传的文件列表 */
    defaultFileList?: UploadFile[];
    /**选填，上传文件之前的钩子，参数为上传的文件，若返回 false 或者 Promise 则停止上传 */
    beforeUpload?: (file: File) => boolean | Promise<File>;
    /**选填，文件上传时的钩子 */
    onProgress?: (percentage: number, file: UploadFile) => void;
    /**选填，文件上传成功时的钩子 */
    onSuccess?: (data: any, file: UploadFile) => void;
    /**选填，文件上传失败时的钩子 */
    onError?: (err: any, file: UploadFile) => void;
    /**选填，文件状态改变时的钩子，上传成功或者失败时都会被调用	 */
    onChange?: (file: UploadFile) => void;
    /**选填，文件列表移除文件时的钩子 */
    onRemove?: (file: UploadFile) => void;
    /**选填，设置上传的请求头部 */
    headers?: {
        [key: string]: any;
    };
    /**选填，上传的文件字段名 */
    name?: string;
    /**选填，上传时附带的额外参数 */
    data?: {
        [key: string]: any;
    };
    /**选填，是否支持发送 cookie 凭证信息 */
    withCredentials?: boolean;
    /**选填，可选参数, 接受上传的文件类型 */
    accept?: string;
    /**选填，是否支持多选文件，默认不支持 */
    multiple?: boolean;
    /**设置 Upload 的子元素 */
    children?: ReactNode;
    /**选填，是否支持拖拽上传，默认为否 */
    drag?: boolean;
}
/**
 * 通过点击或者拖拽上传文件。
 *
 * ~~~js
 * // 这样引用
 * import { BetterUpload } from 'betterui';
 * ~~~
 *
 */
export declare const Upload: FC<UploadProps>;
export default Upload;
