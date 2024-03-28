import React from 'react';
import { ComponentMeta } from '@storybook/react';
import Form, { FormProps } from './form';
import Item from './formItem';
import Input from '../Input';
import Button from '../Button';
import { CustomRule } from './useStore';
import { JSX } from 'react/jsx-runtime';

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

const confirmRules: CustomRule[] = [
  { type: 'string', required: true, min: 3, max: 8, message: '请输入长度为3-8位的密码', },
  ({ getFieldValue }) => ({
    asyncValidator(rule, value, callback, source, options) {
      return new Promise((resolve, reject) => {
        if (value !== getFieldValue('password')) {
          reject('两次输入的密码不一致');
        }
        setTimeout(() => {
          resolve();
        }, 1000);
      });
    },
  }),
];

export const BasicForm = (args: JSX.IntrinsicAttributes & FormProps) => {
  return (
    <Form initialValues={{ username: 'better', password: '1234' }} { ...args }>
      <Item label='用户名' name='username' rules={[{type: 'string', required: true, message: '请输入用户名', }]}>
        <Input />
      </Item>
      <Item label='密码' name='password' rules={[{type: 'string', required: true, min: 3, max: 8, message: '请输入长度为3-8位的密码', }]}>
        <Input type='password' />
      </Item>
      <Item label='重复密码' name='comfirmPwd' rules={ confirmRules }>
        <Input type='password' />
      </Item>
      <div className='better-form-submit-area'>
        <Button type="submit" btnType='primary'>登陆</Button>
      </div>
    </Form>
  );
};
BasicForm.storyName = '基本的登录表单';