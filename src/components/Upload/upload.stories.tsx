import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { Upload } from './upload';

const SimpleUpload = () => {
  return (
    <Upload 
      action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
      onProgress={ action('progress') }
      onSuccess={ action('success') }
      onError={ action('error') }
    />
  );
}

storiesOf('Upload', module)
  .add('Simple Upload', () => (
    <SimpleUpload />
  ));