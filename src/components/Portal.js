import ReactDOM from  'react-dom';

import { element } from 'prop-types';

const Portal = ({ children }) => {

  Portal.propTypes = {
    children: element.isRequired,
  };

 
  return ReactDOM.createPortal(
     <div data-testid="alert"> 
       { children }
     </div>
    ,document.body);
  }


export default Portal;