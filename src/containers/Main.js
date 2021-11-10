import { useState, useEffect } from 'react';

import Snackbar from '@material-ui/core/Snackbar';

import Portal from '../components/Portal'

import Alert from '../utils/Alert'

function Main() {
  
  const [alertOpen, setAlertOpen] = useState(false)

  useEffect(() => {
    if(localStorage.getItem('LoggedIn')){
      setAlertOpen(true)
      setTimeout(() => {
        setAlertOpen(false)

        localStorage.removeItem('LoggedIn')
      }, 7000)

    }
  }, [])

  return (
    
   <> 
      <Portal>
       <Snackbar open={alertOpen} autoHideDuration={6000} onClose={() => setAlertOpen(false)}  anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}> 
         <Alert severity="success"> Logged in succesfully </Alert>
       </Snackbar>
     </Portal>
   </> 
  );
}


export default Main;
