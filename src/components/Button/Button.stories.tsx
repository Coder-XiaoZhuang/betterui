import React from "react";
import Button from "./button";
import mdx from "./button.mdx";
import { ComponentMeta, ComponentStory } from "@storybook/react";

const buttonMeta: ComponentMeta<typeof Button> = {
  title: "Button 按钮",
  component: Button,
  parameters: {
    docs: {
      page: mdx,
    },
  },
};
export default buttonMeta;

const Template: ComponentStory<typeof Button> = (args) => (
  <Button {...args}></Button>
);

export const Deafault = Template.bind({});
Deafault.args = {
  children: 'Default Button',
};
Deafault.storyName = "默认按钮";

export const Large = Template.bind({});
Large.args = {
  size: 'lg',
  children: 'Large Button',
};

export const Small = Template.bind({});
Small.args = {
  size: 'sm',
  children: 'Small Button',
};

export const Primary = Template.bind({});
Primary.args = {
  btnType: 'primary',
  children: 'Primary Button',
};

export const Danger = Template.bind({});
Danger.args = {
  btnType: 'danger',
  children: 'Danger Button',
};

export const Link = Template.bind({});
Link.args = {
  btnType: 'link',
  children: 'Link Button',
  href: 'https://google.com'
};
