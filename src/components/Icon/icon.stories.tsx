import React from 'react';
import { ComponentMeta } from '@storybook/react';
import Icon from './icon';
import Button from '../Button/button';

export default { 
  title: 'Icon 组件',
  id: 'Icon',
  component: Icon,
  parameters: {
    docs: {
      source: {
        type: "code",
      },
    },
  },
} as ComponentMeta<typeof Icon>;

export const DefaultIcons = () => (
  <>
    <div style={{ marginBottom: '1rem', }}>将鼠标移动到图标上可查看图标名称</div>

    <Icon title="user" icon="user" size="2x"/>
    <Icon title="house" icon="house" size="2x"/>
    <Icon title="download" icon="download" size="2x"/>
    <Icon title="image" icon="image" size="2x"/>
    <Icon title="magnifying-glass" icon="magnifying-glass" size="2x"/>
    <Icon title="check" icon="check" size="2x"/>
    <Icon title="times" icon="times" size="2x"/>
    <Icon title="anchor" icon="anchor" size="2x"/>
    <Icon title="trash" icon="trash" size="2x"/>
    <Icon title="phone" icon="phone" size="2x"/>
    <Icon title="star" icon="star" size="2x"/>
    <Icon title="heart" icon="heart" size="2x"/>
    <Icon title="file" icon="file" size="2x"/>
    <Icon title="bell" icon="bell" size="2x"/>
    <Icon title="car" icon="car" size="2x"/>
    <Icon title="pen" icon="pen" size="2x"/>
    <Icon title="paperclip" icon="paperclip" size="2x"/>
    <Icon title="arrow-up-from-bracket" icon="arrow-up-from-bracket" size="2x"/>
    <Icon title="bolt" icon="bolt" size="2x"/>
    <Icon title="circle-user" icon="circle-user" size="2x"/>
    <Icon title="circle-up" icon="circle-up" size="2x"/>
    <Icon title="circle-down" icon="circle-down" size="2x"/>
    <Icon title="bookmark" icon="bookmark" size="2x"/>
    <Icon title="rotate-right" icon="rotate-right" size="2x"/>
    <Icon title="lock" icon="lock" size="2x"/>
    <Icon title="headphones" icon="headphones" size="2x"/>
    <Icon title="tag" icon="tag" size="2x"/>
    <Icon title="book" icon="book" size="2x"/>
    <Icon title="print" icon="print" size="2x"/>
    <Icon title="camera" icon="camera" size="2x"/>
    <Icon title="font" icon="font" size="2x"/>
    <Icon title="video" icon="video" size="2x"/>
    <Icon title="droplet" icon="droplet" size="2x"/>
    <Icon title="pen-to-square" icon="pen-to-square" size="2x"/>
    <Icon title="share-from-square" icon="share-from-square" size="2x"/>
    <Icon title="plus" icon="plus" size="2x"/>
    <Icon title="minus" icon="minus" size="2x"/>
    <Icon title="share" icon="share" size="2x"/>
    <Icon title="circle-exclamation" icon="circle-exclamation" size="2x"/>
    <Icon title="fire" icon="fire" size="2x"/>
    <Icon title="eye" icon="eye" size="2x"/>
    <Icon title="eye-slash" icon="eye-slash" size="2x"/>
    <Icon title="plane" icon="plane" size="2x"/>
    <Icon title="hand" icon="hand" size="2x"/>
    <Icon title="folder" icon="folder" size="2x"/>
    <Icon title="folder-open" icon="folder-open" size="2x"/>
    <Icon title="thumbs-up" icon="thumbs-up" size="2x"/>
    <Icon title="thumbs-down" icon="thumbs-down" size="2x"/>
    <Icon title="comments" icon="comments" size="2x"/>
    <Icon title="key" icon="key" size="2x"/>
    <Icon title="gears" icon="gears" size="2x"/>
    <Icon title="paper-plane" icon="paper-plane" size="2x"/>
    <Icon title="code" icon="code" size="2x"/>
    <Icon title="globe" icon="globe" size="2x"/>
    <Icon title="wifi" icon="wifi" size="2x"/>
    <Icon title="sliders" icon="sliders" size="2x"/>
    <Icon title="person" icon="person" size="2x"/>
    <Icon title="person-dress" icon="person-dress" size="2x"/>
    <Icon title="address-book" icon="address-book" size="2x"/>
    <Icon title="right-to-bracket" icon="right-to-bracket" size="2x"/>
    <Icon title="cloud-arrow-up" icon="cloud-arrow-up" size="2x"/>
    <Icon title="link" icon="link" size="2x"/>
    <Icon title="bug" icon="bug" size="2x"/>
    <Icon title="chart-simple" icon="chart-simple" size="2x"/>
    <Icon title="location-pin" icon="location-pin" size="2x"/>
    <Icon title="user-minus" icon="user-minus" size="2x"/>
    <Icon title="calendar" icon="calendar" size="2x"/>
    <Icon title="cart-plus" icon="cart-plus" size="2x"/>
    <Icon title="clock" icon="clock" size="2x"/>
    <Icon title="circle" icon="circle" size="2x"/>
    <Icon title="play" icon="play" size="2x"/>
    <Icon title="backward" icon="backward" size="2x"/>
    <Icon title="chevron-up" icon="chevron-up" size="2x"/>
    <Icon title="chevron-down" icon="chevron-down" size="2x"/>
    <Icon title="upload" icon="upload" size="2x"/>
    <Icon title="database" icon="database" size="2x"/>
    <Icon title="copy" icon="copy" size="2x"/>
    <Icon title="forward" icon="forward" size="2x"/>
    <Icon title="flag" icon="flag" size="2x"/>
    <Icon title="file-excel" icon="file-excel" size="2x"/>
    <Icon title="file-export" icon="file-export" size="2x"/>
    <Icon title="angle-up" icon="angle-up" size="2x"/>
    <Icon title="expand" icon="expand" size="2x"/>
    <Icon title="tags" icon="tags" size="2x"/>
    <Icon title="arrow-down" icon="arrow-down" size="2x"/>
    <Icon title="power-off" icon="power-off" size="2x"/>
    <Icon title="file-word" icon="file-word" size="2x"/>
    <Icon title="file-import" icon="file-import" size="2x"/>
    <Icon title="toggle-on" icon="toggle-on" size="2x"/>
    <Icon title="arrow-up-right-from-square" icon="arrow-up-right-from-square" size="2x"/>
    <Icon title="arrow-left" icon="arrow-left" size="2x"/>
    <Icon title="file-pdf" icon="file-pdf" size="2x"/>
    <Icon title="square-xmark" icon="square-xmark" size="2x"/>
    <Icon title="square-check" icon="square-check" size="2x"/>
    <Icon title="user-plus" icon="user-plus" size="2x"/>
    <Icon title="repeat" icon="repeat" size="2x"/>
    <Icon title="reply" icon="reply" size="2x"/>
    <Icon title="square-minus" icon="square-minus" size="2x"/>
    <Icon title="recycle" icon="recycle" size="2x"/>
    <Icon title="clone" icon="clone" size="2x"/>
    <Icon title="unlock" icon="unlock" size="2x"/>
  </>
);
DefaultIcons.storyName = "默认的图标";

export const ThemeIcons = () => (
  <>
    <Icon title="anchor" icon="anchor" size="2x" theme="primary"/>
    <Icon title="reply" icon="reply" size="2x" theme="secondary" />
    <Icon title="check" icon="check" size="2x" theme="success"/>
    <Icon title="repeat" icon="repeat" size="2x" theme="info"/>
    <Icon title="recycle" icon="recycle" size="2x" theme="warning"/>
    <Icon title="times" icon="times" size="2x" theme="danger"/>
    <Icon title="expand" icon="expand" size="2x" theme="danger"/>
    <Icon title="exclamation-circle" icon="exclamation-circle" size="2x" theme="light" />
    <Icon title="tags" icon="tags" size="2x" theme="dark" />
  </>
);
ThemeIcons.storyName = "不同主题的图标";

export const CustomIcons = () => (
  <>
    <Icon title='spinner' icon="spinner" size="2x" theme="primary" spin/>
    <Icon title='spinner' icon="spinner" size="2x" theme="success" pulse/>
  </>
);
CustomIcons.storyName = "更多行为的图标";

export const CombineIcons = () => (
  <>
    {/* 其他组件和图标结合使用，必须增加类名combine-icon */}
    <Button className="combine-icon" size="lg" btnType="primary">
      <Icon icon="check"/> check
    </Button>
  </>
);
CombineIcons.storyName = "其他组件和图标结合使用";
