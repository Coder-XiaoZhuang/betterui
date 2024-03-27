import React from 'react';
import { ComponentMeta } from '@storybook/react';
import Form from './form';
import Item from './formItem';
import Input from '../Input';
import Button from '../Button';

const formMeta: ComponentMeta<typeof Form> = {
  title: 'Form 表单',
  id: 'Form',
  component: Form,
  subcomponents: { 
    'Item': Item,
  },
  parameters: {
    docs: {
      source: {
        type: "code",
      },
    },
  },
};
export default formMeta;

export const BasicForm = () => {
  return (
    <Form initialValues={{ username: 'better', password: '1234' }}>
      <Item label='用户名' name='username' rules={[{type: 'email', required: true, }]}>
        <Input />
      </Item>
      <Item label='密码' name='password' rules={[{type: 'string', required: false, min: 3, max: 8}]}>
        <Input type='password' />
      </Item>
      <div className='better-form-submit-area'>
        <Button type="submit" btnType='primary'>登陆</Button>
      </div>
    </Form>
  );
};
BasicForm.storyName = '基本的登录表单';