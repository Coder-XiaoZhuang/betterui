/* eslint-disable testing-library/no-wait-for-multiple-assertions */
/* eslint-disable testing-library/await-async-utils */
/* eslint-disable testing-library/no-render-in-setup */
import React from 'react';
import { render, fireEvent, screen, waitFor } from '@testing-library/react';
import Form, { FormProps } from './form';
import Item from './formItem';
import Input from '../Input';
import Button from '../Button';

const testProps: FormProps = {
  name: 'test-form',
  initialValues: { username: 'better', password: '12345', confirmPwd: '23456' },
  onSuccessfulSubmit: jest.fn(),
  onFailedSubmit: jest.fn(),
};
let nameInput: HTMLInputElement, pwdInput: HTMLInputElement, conPwdInput: HTMLInputElement, submitButton: HTMLButtonElement;

describe('testing Form component', () => {
  beforeEach(() => {
    render(
      <Form { ...testProps }>
        <Item label='username' name='username' 
          rules={[
            {type: 'string', required: true, message:'name error'}, 
            {type: 'string', min: 3, message: 'less than 3'},
          ]}
        >
          <Input/>
        </Item>
        <Item label='password' name='password' 
          rules={[
            {type: 'string', required: true, message: 'password error'},
            {type: 'string', min: 4, message: 'less then 4'},
          ]}
        >
          <Input type='password'/>
        </Item>
        <Item label='confirmPwd' name='confirmPwd' 
          rules={[
            {type: 'string', required: true, message: 'confirmPwd password error' },
            {type: 'string', min: 4, message: 'less then 4' },
            ({ getFieldValue }) => ({
                asyncValidator(rule, value) {
                  return new Promise((resolve, reject) => {
                    if (value !== getFieldValue('password')) {
                      reject('Do not match!');
                    }
                    resolve();
                  });
                }
            }),
          ]}
        >
          <Input type='password'/>
        </Item>
        <Button type="submit" btnType='primary'>Login in</Button>
      </Form>
    )
    nameInput = screen.getByDisplayValue('better');
    pwdInput = screen.getByDisplayValue('12345');
    conPwdInput = screen.getByDisplayValue('23456');
    submitButton = screen.getByText('Login in');
  });
  it('should render the correct Form component', () => {
    // should contains two labels
    expect(screen.getByText('username')).toBeInTheDocument();
    expect(screen.getByText('password')).toBeInTheDocument();
    expect(screen.getByText('confirmPwd')).toBeInTheDocument();
    // should fill in three inputs
    expect(nameInput).toBeInTheDocument();
    expect(pwdInput).toBeInTheDocument();
    expect(conPwdInput).toBeInTheDocument();
    // should render the submit button
    expect(submitButton).toBeInTheDocument();
  })
  it('submit form with invliad values should show the error message', () => {
    fireEvent.change(nameInput, {target: {value: ''}});
    fireEvent.change(pwdInput, {target: {value: ''}});
    fireEvent.click(submitButton);
    waitFor(() => {
      expect(screen.getByText('name error')).toBeInTheDocument();
      expect(screen.getByText('password error')).toBeInTheDocument();
      expect(testProps.onFailedSubmit).toHaveBeenCalled();
    });
  });
  it('change single input to invalid values should trigger the validate', () => {
    // name input, type: string
    fireEvent.change(nameInput, {target: {value: ''}});
    fireEvent.blur(nameInput);
    waitFor(() => {
      expect(screen.getByText('name error')).toBeInTheDocument();
    });
    fireEvent.change(nameInput, {target: {value: '12'}});
    fireEvent.blur(nameInput);
    waitFor(() => {
      expect(screen.getByText('less than 3')).toBeInTheDocument();
    });
  });
  it('custom rules should work', () => {
    // change and blur comfirmPwd
    fireEvent.change(conPwdInput, {target: {value: '23456'}});
    fireEvent.blur(conPwdInput);
    waitFor(() => {
      expect(screen.getByText('Do not match!')).toBeInTheDocument();
    });
    // change to the same
    fireEvent.change(conPwdInput, {target: {value: '12345'}});
    fireEvent.blur(conPwdInput);
    waitFor(() => {
      expect(screen.queryByText('Do not match!')).not.toBeInTheDocument();
    });
    fireEvent.click(submitButton);
    // submit the form with the right data
    waitFor(() => { 
      expect(testProps.onSuccessfulSubmit).toHaveBeenCalled();
    });
  });
});