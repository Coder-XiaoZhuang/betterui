import React  from 'react';
import { ComponentMeta } from '@storybook/react';
import BetterUpload, { UploadProps } from './upload';
import BetterButton from '../Button';
import BetterIcon from '../Icon';
import { JSX } from 'react/jsx-runtime';

export default { 
  title: 'Upload 上传',
  id: 'BetterUpload',
  component: BetterUpload,
  parameters: {
    docs: {
      source: {
        type: "code",
      },
    },
  },
} as ComponentMeta<typeof BetterUpload>;

export const SimpleUpload = (args: JSX.IntrinsicAttributes & UploadProps) => (
  <BetterUpload
    {...args}
    action="https://jsonplaceholder.typicode.com/posts"
  >
    <BetterButton size="lg" btnType="primary"><BetterIcon icon="upload" />点击上传</BetterButton>
  </BetterUpload>  
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
    <BetterUpload
      {...args}
      action="https://jsonplaceholder.typicode.com/posts"
      beforeUpload={ checkFileSize }
    >
      <BetterButton size="lg" btnType="primary"><BetterIcon icon="upload" />不能传大于50Kb！</BetterButton>
    </BetterUpload>  
  )
}
CheckUpload.storyName = '限制上传';

export const DragUpload = (args: JSX.IntrinsicAttributes & UploadProps) => (
  <BetterUpload
    {...args}
    action="https://jsonplaceholder.typicode.com/posts"
    name="fileName"
    multiple
    drag
  >
    <BetterIcon icon="upload" size="5x" theme="secondary" />
    <br/>
    <p>点击上传 / 拖拽文件到此区域上传</p>
  </BetterUpload>
);
DragUpload.storyName = '拖拽上传';