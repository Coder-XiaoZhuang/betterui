import React  from 'react';
import { ComponentMeta } from '@storybook/react';
import { Upload, UploadProps } from './upload';
import Button from '../Button';
import Icon from '../Icon';
import { JSX } from 'react/jsx-runtime';

export default { 
  title: 'Upload 上传',
  id: 'Upload',
  component: Upload,
  parameters: {
    docs: {
      source: {
        type: "code",
      },
    },
  },
} as ComponentMeta<typeof Upload>;

export const SimpleUpload = (args: JSX.IntrinsicAttributes & UploadProps) => (
  <Upload
    {...args}
    action="https://jsonplaceholder.typicode.com/posts"
  >
    <Button size="lg" btnType="primary"><Icon icon="upload" />点击上传</Button>
  </Upload>  
);
SimpleUpload.storyName = '基本上传';

export const CheckUpload = (args: JSX.IntrinsicAttributes & UploadProps) => {
  const checkFileSize = (file: File) => {
    if (Math.round(file.size / 1024) > 50) {      
      alert('上传文件不能大于50Kb！');
      return false;
    }
    return true;
  };
  return (
    <Upload
      {...args}
      action="https://jsonplaceholder.typicode.com/posts"
      beforeUpload={ checkFileSize }
    >
      <Button size="lg" btnType="primary"><Icon icon="upload" />不能传大于50Kb！</Button>
    </Upload>  
  )
}
CheckUpload.storyName = '限制上传';

export const DragUpload = (args: JSX.IntrinsicAttributes & UploadProps) => (
  <Upload
    {...args}
    action="https://jsonplaceholder.typicode.com/posts"
    name="fileName"
    multiple
    drag
  >
    <Icon icon="upload" size="5x" theme="secondary" />
    <br/>
    <p>点击上传 / 拖拽文件到此区域上传</p>
  </Upload>
);
DragUpload.storyName = '拖拽上传';