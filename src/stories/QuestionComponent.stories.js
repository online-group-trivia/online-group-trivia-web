// Button.stories.js

import React from "react";
import { QuestionComponent } from "../components/QuestionComponent";

export default {
  title: "Components/QuestionComponent",
  component: QuestionComponent,
};

const Template = (args) => <QuestionComponent question={"this"} />;
export const Primary = Template.bind({});
