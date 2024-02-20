import React from "react";
import Button from "./button";
import { ComponentMeta, ComponentStory } from "@storybook/react";

const buttonMeta: ComponentMeta<typeof Button> = {
  title: "Button",
  component: Button,
};

export default buttonMeta;

export const DeafaultButton: ComponentStory<typeof Button> = () => (
  <Button>Default Button</Button>
);
DeafaultButton.storyName = "默认按钮样式";

export const ButtonWithSize: ComponentStory<typeof Button> = () => (
  <>
    <Button size="lg">Large Button</Button>
    <Button size="sm">Small Button</Button>
  </>
);
ButtonWithSize.storyName = "不同尺寸的按钮";

export const ButtonWithType: ComponentStory<typeof Button> = () => (
  <>
    <Button btnType="primary">Primary Button</Button>
    <Button btnType="danger">Danger Button</Button>
    <Button btnType="link" href="https://google.com">Link Button</Button>
  </>
);
ButtonWithType.storyName = "不同类型的按钮";