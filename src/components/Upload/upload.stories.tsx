import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { Upload, UploadFile } from './upload';

const defaultFileList: UploadFile[] = [
  { uid: '123', name: 'hello.md', size: 1234, status: 'uploading', percent: 30 },
  { uid: '122', name: 'xyz.md', size: 1234, status: 'success', percent: 30 },
  { uid: '121', name: 'eyiha.md', size: 1234, status: 'error', percent: 30 },
];
// const checkFileSize = (file: File) => {
//   if (Math.round(file.size / 1024) > 50) {
//     alert('file too big');
//     return false;
//   }
//   return true;
// }
// const filePromise =(file: File) => {
//   const newFile = new File([file], 'new_name.docx', { type: file.type });
//   return Promise.resolve(newFile);
// }

const SimpleUpload = () => {
  return (
    // <Upload 
    //   action="https://jsonplaceholder.typicode.com/posts"
    //   onChange={ action('changed') }
    //   beforeUpload={ checkFileSize }
    // />
    // <Upload 
    //   action="https://jsonplaceholder.typicode.com/posts"
    //   onChange={ action('changed') }
    //   beforeUpload={ filePromise }
    // />
    // <Upload 
    //   action="https://jsonplaceholder.typicode.com/posts"
    //   onChange={ action('changed') }
    //   defaultFileList={ defaultFileList }
    //   onRemove={ action('removed') }
    // />
    <Upload
      action='https://jsonplaceholder.typicode.com/posts'
      onChange={ action('changed') }
      defaultFileList={ defaultFileList }
      onRemove={ action('removed') }
    />
  );
}

storiesOf('Upload', module)
  .add('Simple Upload', () => (
    <SimpleUpload />
  ));