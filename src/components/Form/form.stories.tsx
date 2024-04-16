/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useRef } from 'react';
import { ComponentMeta } from '@storybook/react';
import Form, { FormProps, IFormRef } from './form';
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

export const BasicForm = (args: JSX.IntrinsicAttributes & FormProps) => {
  return (
    <Form { ...args } >
      <Item label='用户名' name='name' rules={[{type: 'string', required: true, message: '请输入用户名'}]}>
        <Input/>
      </Item>
      <Item label='密码' name='password' rules={[{type: 'string', required: true, min: 3, max: 8, message: '请输入长度为3-8位的密码'}]}>
        <Input type="password"/>
      </Item>
      <div className='better-form-submit-area'>
        <Button type="submit" btnType='primary'>登陆</Button>
      </div>
    </Form>
  )
}
BasicForm.storyName = '基本的表单';

export const RegForm = (args: JSX.IntrinsicAttributes & FormProps) => { 
  const initialValues = {
    agreement: false,
  };
  return (
    <Form { ...args } initialValues={ initialValues }>
      <Item label='邮件' name='email' rules={[{type: 'email', required: true, message: '请输入正确的邮箱'}]}>
        <Input/>
      </Item>
      <Item label='密码' name='password' rules={[{type: 'string', required: true, min: 3, max: 8, message: '请输入长度为3-8位的密码'}]}>
        <Input type="password"/>
      </Item>
      <div className='agreement-section' style={{'display': 'flex', 'justifyContent': 'center'}}>
        <Item
          name='agreement' 
          rules={[{type: 'enum', enum: [true], message: '请先同意协议'}]}
          getValueFromEvent={ (e) => e.target.checked }
          valuePropName='checked'
        >
          <Input type="checkbox"/>
        </Item>
        <span className="agree-text">注册即代表你同意<a href='#'>用户协议</a></span>
      </div>
      <div className='better-form-submit-area'>
        <Button type="submit" btnType='primary'>登陆</Button>
      </div>
    </Form>
  )
}
RegForm.storyName = '典型的表单';

const confirmRules: CustomRule[] = [
  {type: 'string', required: true, min: 3, max: 8, message: '请输入长度为3-8位的密码',},
  ({ getFieldValue }) => ({
    asyncValidator(rule, value, callback, source, options) {
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          if (value !== getFieldValue('password')) {
            reject('两次输入的密码不一致');
          }
          resolve();
        }, 1000);
      });
    },
  }),
];

export const CustomForm = (args: JSX.IntrinsicAttributes & FormProps) => {
  const ref = useRef<IFormRef>();
  const resetAll = () => {
    ref.current?.resetFieldsValue();
  }
  const initialValues = {
    username: 'better',
    password: '123',
  };
  return (
    <Form initialValues={ initialValues } { ...args } ref={ ref as React.RefObject<IFormRef> | null }>
      {
        ({isValid, isSubmit}) => (
          <>
            <Item name='username' label='用户名' rules={[{type: 'string', required: true, message: '请输入用户名'}]}>
              <Input />
            </Item>
            <Item name='password' label='密码' rules={[{type: 'string', required: true, min: 3, max: 8, message: '请输入长度为3-8位的密码'}]}>
              <Input type='password' />
            </Item>
            <Item name='confirmPwd' label='重复密码' rules={ confirmRules }>
              <Input type='password' />
            </Item>
            <div className="better-form-submit-area">
              <Button type='submit' btnType='primary'>登录 { isSubmit ? '验证中' : '验证完毕' } { isValid ? '通过' : '失败' }</Button>
              <Button type="button" onClick={ resetAll }>重置</Button>
            </div>
          </>
        )
      }
    </Form>
  );
};
CustomForm.storyName = '自定义校验规则';