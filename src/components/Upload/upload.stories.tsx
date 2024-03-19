import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { Upload, UploadFile } from './upload';
import Button from '../Button/button';
import Icon from '../Icon/icon';

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
    // <Upload
    //   action='https://jsonplaceholder.typicode.com/posts'
    //   onChange={ action('changed') }
    //   defaultFileList={ defaultFileList }
    //   onRemove={ action('removed') }
    //   name='fileName'
    //   data={{ 'key': 'value' }}
    //   headers={{ 'X-Powered-By': 'betterui' }}
    //   accept='.jpg'
    //   multiple
    // />
    // <Upload
    //   action='https://jsonplaceholder.typicode.com/posts'
    //   onChange={ action('changed') }
    //   defaultFileList={ defaultFileList }
    //   onRemove={ action('removed') }
    //   name='fileName'
    //   data={{ 'key': 'value' }}
    //   headers={{ 'X-Powered-By': 'betterui' }}
    //   accept='.jpg'
    //   multiple
    // >
    //   <Button btnType="primary">点击上传</Button>
    // </Upload>
    <Upload
      action='https://jsonplaceholder.typicode.com/posts'
      onChange={ action('changed') }
      onRemove={ action('removed') }
      name='fileName'
      multiple
      drag
    >
      <Icon icon="upload" size="5x" theme="secondary" />
      <br />
      <p>点击或拖动到此区域进行上传</p>
    </Upload>
  );
}

storiesOf('Upload', module)
  .add('Simple Upload', () => (
    <SimpleUpload />
  ));