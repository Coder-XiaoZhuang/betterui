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
  action: string;
  defaultFileList?: UploadFile[];
  beforeUpload? : (file: File) => boolean | Promise<File>;
  onProgress?: (percentage: number, file: UploadFile) => void;
  onSuccess?: (data: any, file: UploadFile) => void;
  onError?: (err: any, file: UploadFile) => void;
  onChange?: (file: UploadFile) => void;
  onRemove?: (file: UploadFile) => void;
  headers?: {[key: string]: any};
  name?: string;
  data?: {[key: string]: any};
  withCredentials?: boolean;
  accept?: string;
  multiple?: boolean;
  children?: ReactNode;
  drag?: boolean;
};

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