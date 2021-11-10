import React from 'react';

import Portal from '../../components/Portal';

import Snackbar from '@material-ui/core/Snackbar';
import Alert from '../../utils/Alert'

export default {
  component: Portal,
  title: 'Design System/Components/Portal',
};

const Template = args => <Portal {...args} />;

export const Default = Template.bind({});

export const Example = Template.bind({});
Example.args = {
  children:(<Snackbar open={true} autoHideDuration={6000} onClose={() => false}  anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}> 
             <Alert severity="success"> Logged in succesfully </Alert>
           </Snackbar> )
};
