import React from 'react';


import Alert from '../../utils/Alert'

export default {
  component: Alert,
  title: 'Design System/Components/Alert',
};

const Template = args => <Alert {...args} />;

export const Default = Template.bind({});

export const Example = Template.bind({});
Example.args = {
  children: "Alert"
};
