import React from 'react';
import { ComponentMeta } from '@storybook/react';
import BetterIcon from './icon';
import BetterButton from '../Button';

export default { 
  title: 'Icon 组件',
  id: 'BetterIcon',
  component: BetterIcon,
  parameters: {
    docs: {
      source: {
        type: "code",
      },
    },
  },
} as ComponentMeta<typeof BetterIcon>;

export const DefaultIcons = () => (
  <>
    <div style={{ marginBottom: '1rem', }}>将鼠标移动到图标上可查看图标名称</div>

    <BetterIcon title="user" icon="user" size="2x"/>
    <BetterIcon title="house" icon="house" size="2x"/>
    <BetterIcon title="download" icon="download" size="2x"/>
    <BetterIcon title="image" icon="image" size="2x"/>
    <BetterIcon title="magnifying-glass" icon="magnifying-glass" size="2x"/>
    <BetterIcon title="check" icon="check" size="2x"/>
    <BetterIcon title="times" icon="times" size="2x"/>
    <BetterIcon title="anchor" icon="anchor" size="2x"/>
    <BetterIcon title="trash" icon="trash" size="2x"/>
    <BetterIcon title="phone" icon="phone" size="2x"/>
    <BetterIcon title="star" icon="star" size="2x"/>
    <BetterIcon title="heart" icon="heart" size="2x"/>
    <BetterIcon title="file" icon="file" size="2x"/>
    <BetterIcon title="bell" icon="bell" size="2x"/>
    <BetterIcon title="car" icon="car" size="2x"/>
    <BetterIcon title="pen" icon="pen" size="2x"/>
    <BetterIcon title="paperclip" icon="paperclip" size="2x"/>
    <BetterIcon title="arrow-up-from-bracket" icon="arrow-up-from-bracket" size="2x"/>
    <BetterIcon title="bolt" icon="bolt" size="2x"/>
    <BetterIcon title="circle-user" icon="circle-user" size="2x"/>
    <BetterIcon title="circle-up" icon="circle-up" size="2x"/>
    <BetterIcon title="circle-down" icon="circle-down" size="2x"/>
    <BetterIcon title="bookmark" icon="bookmark" size="2x"/>
    <BetterIcon title="rotate-right" icon="rotate-right" size="2x"/>
    <BetterIcon title="lock" icon="lock" size="2x"/>
    <BetterIcon title="headphones" icon="headphones" size="2x"/>
    <BetterIcon title="tag" icon="tag" size="2x"/>
    <BetterIcon title="book" icon="book" size="2x"/>
    <BetterIcon title="print" icon="print" size="2x"/>
    <BetterIcon title="camera" icon="camera" size="2x"/>
    <BetterIcon title="font" icon="font" size="2x"/>
    <BetterIcon title="video" icon="video" size="2x"/>
    <BetterIcon title="droplet" icon="droplet" size="2x"/>
    <BetterIcon title="pen-to-square" icon="pen-to-square" size="2x"/>
    <BetterIcon title="share-from-square" icon="share-from-square" size="2x"/>
    <BetterIcon title="plus" icon="plus" size="2x"/>
    <BetterIcon title="minus" icon="minus" size="2x"/>
    <BetterIcon title="share" icon="share" size="2x"/>
    <BetterIcon title="circle-exclamation" icon="circle-exclamation" size="2x"/>
    <BetterIcon title="fire" icon="fire" size="2x"/>
    <BetterIcon title="eye" icon="eye" size="2x"/>
    <BetterIcon title="eye-slash" icon="eye-slash" size="2x"/>
    <BetterIcon title="plane" icon="plane" size="2x"/>
    <BetterIcon title="hand" icon="hand" size="2x"/>
    <BetterIcon title="folder" icon="folder" size="2x"/>
    <BetterIcon title="folder-open" icon="folder-open" size="2x"/>
    <BetterIcon title="thumbs-up" icon="thumbs-up" size="2x"/>
    <BetterIcon title="thumbs-down" icon="thumbs-down" size="2x"/>
    <BetterIcon title="comments" icon="comments" size="2x"/>
    <BetterIcon title="key" icon="key" size="2x"/>
    <BetterIcon title="gears" icon="gears" size="2x"/>
    <BetterIcon title="paper-plane" icon="paper-plane" size="2x"/>
    <BetterIcon title="code" icon="code" size="2x"/>
    <BetterIcon title="globe" icon="globe" size="2x"/>
    <BetterIcon title="wifi" icon="wifi" size="2x"/>
    <BetterIcon title="sliders" icon="sliders" size="2x"/>
    <BetterIcon title="person" icon="person" size="2x"/>
    <BetterIcon title="person-dress" icon="person-dress" size="2x"/>
    <BetterIcon title="address-book" icon="address-book" size="2x"/>
    <BetterIcon title="right-to-bracket" icon="right-to-bracket" size="2x"/>
    <BetterIcon title="cloud-arrow-up" icon="cloud-arrow-up" size="2x"/>
    <BetterIcon title="link" icon="link" size="2x"/>
    <BetterIcon title="bug" icon="bug" size="2x"/>
    <BetterIcon title="chart-simple" icon="chart-simple" size="2x"/>
    <BetterIcon title="location-pin" icon="location-pin" size="2x"/>
    <BetterIcon title="user-minus" icon="user-minus" size="2x"/>
    <BetterIcon title="calendar" icon="calendar" size="2x"/>
    <BetterIcon title="cart-plus" icon="cart-plus" size="2x"/>
    <BetterIcon title="clock" icon="clock" size="2x"/>
    <BetterIcon title="circle" icon="circle" size="2x"/>
    <BetterIcon title="play" icon="play" size="2x"/>
    <BetterIcon title="backward" icon="backward" size="2x"/>
    <BetterIcon title="chevron-up" icon="chevron-up" size="2x"/>
    <BetterIcon title="chevron-down" icon="chevron-down" size="2x"/>
    <BetterIcon title="upload" icon="upload" size="2x"/>
    <BetterIcon title="database" icon="database" size="2x"/>
    <BetterIcon title="copy" icon="copy" size="2x"/>
    <BetterIcon title="forward" icon="forward" size="2x"/>
    <BetterIcon title="flag" icon="flag" size="2x"/>
    <BetterIcon title="file-excel" icon="file-excel" size="2x"/>
    <BetterIcon title="file-export" icon="file-export" size="2x"/>
    <BetterIcon title="angle-up" icon="angle-up" size="2x"/>
    <BetterIcon title="expand" icon="expand" size="2x"/>
    <BetterIcon title="tags" icon="tags" size="2x"/>
    <BetterIcon title="arrow-down" icon="arrow-down" size="2x"/>
    <BetterIcon title="power-off" icon="power-off" size="2x"/>
    <BetterIcon title="file-word" icon="file-word" size="2x"/>
    <BetterIcon title="file-import" icon="file-import" size="2x"/>
    <BetterIcon title="toggle-on" icon="toggle-on" size="2x"/>
    <BetterIcon title="arrow-up-right-from-square" icon="arrow-up-right-from-square" size="2x"/>
    <BetterIcon title="arrow-left" icon="arrow-left" size="2x"/>
    <BetterIcon title="file-pdf" icon="file-pdf" size="2x"/>
    <BetterIcon title="square-xmark" icon="square-xmark" size="2x"/>
    <BetterIcon title="square-check" icon="square-check" size="2x"/>
    <BetterIcon title="user-plus" icon="user-plus" size="2x"/>
    <BetterIcon title="repeat" icon="repeat" size="2x"/>
    <BetterIcon title="reply" icon="reply" size="2x"/>
    <BetterIcon title="square-minus" icon="square-minus" size="2x"/>
    <BetterIcon title="recycle" icon="recycle" size="2x"/>
    <BetterIcon title="clone" icon="clone" size="2x"/>
    <BetterIcon title="unlock" icon="unlock" size="2x"/>
  </>
);
DefaultIcons.storyName = "默认的图标";

export const ThemeIcons = () => (
  <>
    <BetterIcon title="anchor" icon="anchor" size="2x" theme="primary"/>
    <BetterIcon title="reply" icon="reply" size="2x" theme="secondary" />
    <BetterIcon title="check" icon="check" size="2x" theme="success"/>
    <BetterIcon title="repeat" icon="repeat" size="2x" theme="info"/>
    <BetterIcon title="recycle" icon="recycle" size="2x" theme="warning"/>
    <BetterIcon title="times" icon="times" size="2x" theme="danger"/>
    <BetterIcon title="expand" icon="expand" size="2x" theme="danger"/>
    <BetterIcon title="exclamation-circle" icon="exclamation-circle" size="2x" theme="light" />
    <BetterIcon title="tags" icon="tags" size="2x" theme="dark" />
  </>
);
ThemeIcons.storyName = "不同主题的图标";

export const CustomIcons = () => (
  <>
    <BetterIcon title='spinner' icon="spinner" size="2x" theme="primary" spin/>
    <BetterIcon title='spinner' icon="spinner" size="2x" theme="success" pulse/>
  </>
);
CustomIcons.storyName = "更多行为的图标";

export const CombineIcons = () => (
  <>
    {/* 其他组件和图标结合使用，必须增加类名combine-icon */}
    <BetterButton className="combine-icon" size="lg" btnType="primary">
      <BetterIcon icon="check"/> check
    </BetterButton>
  </>
);
CombineIcons.storyName = "其他组件和图标结合使用";
