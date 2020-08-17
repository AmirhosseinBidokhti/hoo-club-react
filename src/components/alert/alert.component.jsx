import React from 'react';

import './alert.styles.scss';



const Alert = ({ errorMessage, danger, warning, success }) => {
    



    return(
        <div className={`alert ${danger ? 'danger' : warning ? 'warning' : success ? 'success' : ''}`}>
            
        <p>{errorMessage}</p>
               
        </div>)
};

export default Alert;