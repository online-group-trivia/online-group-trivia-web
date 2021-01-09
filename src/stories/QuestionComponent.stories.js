import React from "react";
import { QuestionComponent } from "../components/QuestionComponent";

export default {
  title: "Components/QuestionComponent",
  component: QuestionComponent,
};

const Template = (args) => <QuestionComponent {...args} />;
export const Primary = Template.bind({});
Primary.args = {
  question: "this",
};
export const Secondary = Template.bind({});
Secondary.args = {
  question: "asodij oiasjd oasijd oasijd oaisj d?",
};
