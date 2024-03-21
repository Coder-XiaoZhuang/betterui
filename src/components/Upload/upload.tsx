import React, { FC, useState, useRef, ChangeEvent, ReactNode } from 'react';
import axios from 'axios';
import Dragger from './dragger';
import UploadList from './uploadList';

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
};
export interface UploadProps {
  /**必填, 上传的地址 */
  action: string;
  /**选填，上传的文件列表 */
  defaultFileList?: UploadFile[];
  /**选填，上传文件之前的钩子，参数为上传的文件，若返回 false 或者 Promise 则停止上传 */
  beforeUpload? : (file: File) => boolean | Promise<File>;
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
  headers?: {[key: string]: any};
  /**选填，上传的文件字段名 */
  name?: string;
  /**选填，上传时附带的额外参数 */
  data?: {[key: string]: any};
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
};


/**
 * 通过点击或者拖拽上传文件。
 * 
 * ~~~js
 * // 这样引用
 * import { Upload } from 'betterui';
 * ~~~
 * 
 */
export const Upload: FC<UploadProps> = (props) => {
  const {
    action,
    defaultFileList,
    beforeUpload,
    onProgress,
    onSuccess,
    onError,
    onChange,
    onRemove,
    headers,
    name,
    data,
    withCredentials,
    accept,
    multiple,
    children,
    drag,
  } = props;
  const fileInput = useRef<HTMLInputElement>(null);
  const [fileList, setFileList] = useState<UploadFile[]>(defaultFileList || []);
  const updateFileList = (updateFile: UploadFile, updateObj: Partial<UploadFile>) => {
    setFileList(prevList => {
      return prevList.map(file => {
        if (file.uid === updateFile.uid) {
          return { ...file, ...updateObj };
        } else {
          return file;
        }
      });
    });
  }
  const handleClick = () => {
    if (fileInput.current) {
      fileInput.current.click();
    }
  };
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) {
      return;
    }
    uploadFiles(files);
    if (fileInput.current) {
      fileInput.current.value = '';
    }
  }
  const handleRemove = (file: UploadFile) => {
    setFileList(prevList => {
      return prevList.filter(item => item.uid !== file.uid);
    });
    if (onRemove) {
      onRemove(file);
    }
  }
  const uploadFiles = (files: FileList) => {
    const postFiles = Array.from(files);
    postFiles.forEach(file => {
      if (!beforeUpload) {
        post(file);
      } else {
        const result = beforeUpload(file);
        if (result && result instanceof Promise) {
          result.then(processedFile => {
            post(processedFile);
          });
        } else if (result !== false) {
          post(file);
        }
      }
    });
  };
  const post = (file: File) => {
    const _file: UploadFile = {
      uid: Date.now() + 'upload-file',
      status: 'ready',
      name: file.name,
      size: file.size,
      percent: 0,
      raw: file,
    };
    setFileList(prevList => {
      return [_file, ...prevList];
    });
    const formData = new FormData();
    formData.append(name || 'file', file);
    if (data) {
      Object.keys(data).forEach(key => {
        formData.append(key, data[key]);
      });
    }
    axios.post(action, formData, {
      headers: {
        ...headers,
        'Content-Type': 'multipart/form-data',
      },
      withCredentials,
      onUploadProgress: (e) => {
        const percentage = Math.round((e.loaded * 100) / (e.total ?? 1)) || 0;
        if (percentage < 100) {
          updateFileList(_file, { 
            percent: percentage, 
            status: 'uploading',
          });
          if (onProgress) {
            onProgress(percentage, _file);
          }
        }
      }
    }).then(res => {
      updateFileList(_file, { 
        status: 'success', 
        response: res.data 
      });
      if (onSuccess) {
        onSuccess(res.data, _file);
      }
      if (onChange) {
        onChange(_file);
      }
    }).catch(err => {
      updateFileList(_file, { 
        status: 'error', 
        error: err,
      });
      if (onError) {
        onError(err, _file);
      }
      if (onChange) {
        onChange(_file);
      }
    });
  };
  return (
    <div className='better-upload-component' style={{ display: 'inline-block' }} onClick={ handleClick }>
      { drag ? <Dragger onFile={ files => { uploadFiles(files) } }>{ children }</Dragger> : children }
      <input 
        type="file" 
        className="better-file-input" 
        ref={ fileInput }
        style={{ display: 'none' }}
        onChange={ handleChange }
        accept={ accept }
        multiple={ multiple }
      />
      <UploadList fileList={ fileList } onRemove={ handleRemove } />
    </div>
  );
};
Upload.defaultProps = {
  name: 'file',
};
export default Upload;