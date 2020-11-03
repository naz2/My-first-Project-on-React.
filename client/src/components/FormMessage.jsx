import React from 'react';
import PropTypes from 'prop-types';

const FormMessage = ({type, children}) => {
return <div style={{color:type === "error" ? "#9a3f38" : "#9a3f38"}}>{children}</div>
    
}

FormMessage.propTypes = {
   type: PropTypes.oneOf(['error', 'info']).isRequired,
}

FormMessage.defaultProps = {
    type: 'error',
    
}

//"color: #9a3f38"
export default FormMessage
