import { useState } from 'react';
import { bool, func } from 'prop-types';
import { connect } from 'react-redux';
import { push } from 'connected-react-router';

import { SESSION_ACTIONS } from '../actions/types';

import AppToolbar from '../components/AppToolbar';

import Typography from '@material-ui/core/Typography';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Box from '@material-ui/core/Box';
import Snackbar from '@material-ui/core/Snackbar';

import Portal from '../components/Portal'
import Alert from '../utils/Alert'




function Login({  setUserDetails, push }) {
  const handleLogin = () => {
    push('/');
  };

const [credentials, setCredentials] = useState({username: '', password: ''})
const [loginData, setLoginData] = useState({})
const [alertOpen, setAlertOpen] = useState(false)

async function loginUser(data) {
 return fetch('http://localhost:3001/api/login', {
   method: 'POST',
   headers: {
     'Content-Type': 'application/json',
     'access-control-allow-origin':'https://localhost:3000'
   },
   body: JSON.stringify(data)
 })
   .then(data => data.json())
   .then(d => {
     setAlertOpen(true)
     setLoginData(d)
     if(!d.status){
       setUserDetails(d)
       localStorage.setItem('LoggedIn', 'true');
       handleLogin()
     }
   })
}

  

  return (<>
   
       <Snackbar open={alertOpen} autoHideDuration={6000} onClose={() => setAlertOpen(false)}  anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}> 
         <Alert severity="error">  <span data-testid="error">{ loginData.message }</span> </Alert>
       </Snackbar>
    <Card variant="outlined" className="card" >
      <CardContent>
        <Typography variant="h4" component="h4" gutterBottom> Please log in below</Typography>
        <form noValidate autoComplete="off">
           
           <TextField id="username" className="m1"  value={credentials.username} label="Username" variant="outlined" onChange={e => setCredentials({...credentials, username: e.target.value})}/>
           <TextField id="pass" className="m1"    type="password" value={credentials.password} label="Password" variant="outlined" onChange={e => setCredentials({...credentials, password: e.target.value})}/>
           <Box  component="footer" className="flex-bt " >
             <Button variant="contained" color="primary" m={1} className="m1"  id="Login" onClick={() => loginUser(credentials)}>
                Login
              </Button>
              <Button variant="contained" color="primary" className="m1"  onClick={() => setCredentials({username: '', password: ''})}>
                Reset
              </Button>
            </Box  >
        </form>
      </CardContent>
    </Card >
   
    </>
  );
}

Login.propTypes = {
  setUserDetails: func.isRequired,
  push: func.isRequired
};


const mapStateToProps = state => {
  return {
  };
};

const mapDispatchToProps = dispatch => {
  return {
    setUserDetails: (x) => dispatch({type: SESSION_ACTIONS.SET_USER_DETAILS, payload: x}),
    push: path => dispatch(push(path))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
