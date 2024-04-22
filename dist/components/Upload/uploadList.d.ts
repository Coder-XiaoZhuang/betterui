import { FC } from 'react';
import { UploadFile } from './upload';
interface UploadListProps {
    fileList: UploadFile[];
    onRemove: (file: UploadFile) => void;
}
export declare const UploadList: FC<UploadListProps>;
export default UploadList;
