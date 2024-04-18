/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useRef } from 'react';
import { ComponentMeta } from '@storybook/react';
import BetterForm, { FormProps, IFormRef } from './form';
import BetterItem from './formItem';
import BetterInput from '../Input';
import BetterButton from '../Button';
import BetterSelect from '../Select';
import { CustomRule } from './useStore';
import { JSX } from 'react/jsx-runtime';

const formMeta: ComponentMeta<typeof BetterForm> = {
  title: 'Form 表单',
  id: 'BetterForm',
  component: BetterForm,
  subcomponents: { 
    'BetterItem': BetterItem,
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
    <BetterForm { ...args } >
      <BetterItem label='用户名' name='name' rules={[{type: 'string', required: true, message: '请输入用户名'}]}>
        <BetterInput placeholder='请输入' />
      </BetterItem>
      <BetterItem label='密码' name='password' rules={[{type: 'string', required: true, min: 3, max: 8, message: '请输入长度为3-8位的密码'}]}>
        <BetterInput type="password" placeholder='请输入' />
      </BetterItem>
      <div className='better-form-submit-area'>
        <BetterButton type="submit" btnType='primary'>登陆</BetterButton>
      </div>
    </BetterForm>
  )
}
BasicForm.storyName = '基本的表单';

export const RegForm = (args: JSX.IntrinsicAttributes & FormProps) => { 
  const initialValues = {
    agreement: false,
  };
  return (
    <BetterForm { ...args } initialValues={ initialValues }>
      <BetterItem label='邮件' name='email' rules={[{type: 'email', required: true, message: '请输入正确的邮箱'}]}>
        <BetterInput placeholder='请输入' />
      </BetterItem>
      <BetterItem label='密码' name='password' rules={[{type: 'string', required: true, min: 3, max: 8, message: '请输入长度为3-8位的密码'}]}>
        <BetterInput type="password" placeholder='请输入' />
      </BetterItem>
      <BetterItem 
        label='性别' 
        name='gender' 
        rules={[{required: true, message: '请选择性别'}]}
        getValueFromEvent={ (e) => e }
        valuePropName='defaultValue'
      >
        <BetterSelect placeholder='请选择'>
          <BetterSelect.Option value='男' />
          <BetterSelect.Option value='女' />
        </BetterSelect>
      </BetterItem>
      <div className='agreement-section' style={{'display': 'flex', 'justifyContent': 'center'}}>
        <BetterItem
          name='agreement' 
          rules={[{type: 'enum', enum: [true], message: '请先同意协议'}]}
          getValueFromEvent={ (e) => e.target.checked }
          valuePropName='checked'
        >
          <BetterInput type="checkbox"/>
        </BetterItem>
        <span className="agree-text">注册即代表你同意<a href='#'>用户协议</a></span>
      </div>
      <div className='better-form-submit-area'>
        <BetterButton type="submit" btnType='primary'>登陆</BetterButton>
      </div>
    </BetterForm>
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
    <BetterForm initialValues={ initialValues } { ...args } ref={ ref as React.RefObject<IFormRef> | null }>
      {
        ({isValid, isSubmit}) => (
          <>
            <BetterItem name='username' label='用户名' rules={[{type: 'string', required: true, message: '请输入用户名'}]}>
              <BetterInput placeholder='请输入'  />
            </BetterItem>
            <BetterItem name='password' label='密码' rules={[{type: 'string', required: true, min: 3, max: 8, message: '请输入长度为3-8位的密码'}]}>
              <BetterInput type='password' placeholder='请输入'  />
            </BetterItem>
            <BetterItem name='confirmPwd' label='重复密码' rules={ confirmRules }>
              <BetterInput type='password' placeholder='请输入'  />
            </BetterItem>
            <div className="better-form-submit-area">
              <BetterButton type='submit' btnType='primary'>登录 { isSubmit ? '验证中' : '验证完毕' } { isValid ? '通过' : '失败' }</BetterButton>
              <BetterButton type="button" onClick={ resetAll }>重置</BetterButton>
            </div>
          </>
        )
      }
    </BetterForm>
  );
};
CustomForm.storyName = '自定义校验规则';