import React from 'react';

import Login from '../../containers/Login';

import { Provider } from "react-redux";
import configureMockStore from "redux-mock-store";

const mockStore = configureMockStore();
const store = mockStore({});


export default {
  component: Login,
  title: 'Design System/Containers/Login',
};

const Template = args => <Provider store={store}><Login {...args} /></Provider >;

export const Default = Template.bind({});

