// Button.stories.js

import React from "react";
import { AddQuestionComponent } from "../components/AddQuestionComponent";

export default {
  title: "Components/AddQuestionComponent",
  component: AddQuestionComponent,
};

const Template = (args) => <AddQuestionComponent />;
export const Primary = Template.bind({});
