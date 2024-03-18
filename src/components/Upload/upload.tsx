import React, { FC, useRef, ChangeEvent } from 'react';
import axios from 'axios';
import Button from '../Button/button';

export interface UploadProps {
  action: string;
  onProgress?: (percentage: number, file: File) => void;
  onSuccess?: (data: any, file: File) => void;
  onError?: (err: any, file: File) => void;
};

export const Upload: FC<UploadProps> = (props) => {
  const {
    action,
    onProgress,
    onSuccess,
    onError
  } = props;
  const fileInput = useRef<HTMLInputElement>(null);
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
      const formData = new FormData();
      formData.append(file.name, file);
      axios.post(action, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
        onUploadProgress: (e) => {
          const percentage = Math.round((e.loaded * 100) / (e.total ?? 1)) || 0;
          if (percentage < 100) {
            if (onProgress) {
              onProgress(percentage, file);
            }
          }
        }
      }).then(res => {
        if (onSuccess) {
          onSuccess(res.data, file);
        }
      }).catch(err => {
        if (onError) {
          onError(err, file);
        }
      });
    });
  };
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