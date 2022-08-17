import React from "react";
import { Toast } from "./index.js";

export default {
  title: "WiP/Toast",
  component: Toast,
  argTypes: {},
};

const Template = (args) => <Toast {...args} />;

export const Default = Template.bind({});
Default.args = {
  text: "Default Message.",
};

export const Waring = Template.bind({});
Waring.args = {
  variant: "warning",
  text: "Warning Message.",
};

export const Error = Template.bind({});
Error.args = {
  variant: "error",
  text: "Error Message.",
};

export const Danger = Template.bind({});
Danger.args = {
  variant: "danger",
  text: "Danger Message.",
};

export const Success = Template.bind({});
Success.args = {
  variant: "success",
  text: "Success Message",
};

export const ToastWithLongText = Template.bind({});
ToastWithLongText.args = {
  text: "Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet.",
};

export const autoDismiss = Template.bind({});
autoDismiss.args = {
  text: "AutoDismiss in 10 sec.",
  autoDismiss: true,
};
