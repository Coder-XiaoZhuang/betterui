import React, { FC, useState, useRef, ChangeEvent } from 'react';
import axios from 'axios';
import Button from '../Button/button';

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
  beforeUpload? : (file: File) => boolean | Promise<File>;
  onProgress?: (percentage: number, file: File) => void;
  onSuccess?: (data: any, file: File) => void;
  onError?: (err: any, file: File) => void;
  onChange?: (file: File) => void;
};

export const Upload: FC<UploadProps> = (props) => {
  const {
    action,
    beforeUpload,
    onProgress,
    onSuccess,
    onError,
    onChange,
  } = props;
  const fileInput = useRef<HTMLInputElement>(null);
  const [fileList, setFileList] = useState<UploadFile[]>([]);
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
    setFileList([_file, ...fileList]);
    const formData = new FormData();
    formData.append(file.name, file);
    axios.post(action, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
      onUploadProgress: (e) => {
        const percentage = Math.round((e.loaded * 100) / (e.total ?? 1)) || 0;
        if (percentage < 100) {
          updateFileList(_file, { 
            percent: percentage, 
            status: 'uploading',
          });
          if (onProgress) {
            onProgress(percentage, file);
          }
        }
      }
    }).then(res => {
      updateFileList(_file, { 
        status: 'success', 
        response: res.data 
      });
      if (onSuccess) {
        onSuccess(res.data, file);
      }
      if (onChange) {
        onChange(file);
      }
    }).catch(err => {
      updateFileList(_file, { 
        status: 'error', 
        error: err,
      });
      if (onError) {
        onError(err, file);
      }
      if (onChange) {
        onChange(file);
      }
    });
  }
  console.log('fileList的值:', fileList);
  return (
    <div className='better-upload-component'>
      <Button btnType='primary' onClick={ handleClick }>点击上传</Button>
      <input 
        type="file" 
        className="better-file-input" 
        ref={ fileInput }
        style={{ display: 'none' }}
        onChange={ handleChange }
      />
    </div>
  );
};
export default Upload;