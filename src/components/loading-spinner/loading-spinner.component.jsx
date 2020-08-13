import React from 'react';
import { connect } from 'react-redux';


import loadingSpinnerGif from '../../assets/repo/Loading.gif';

import './loading-spinner.styles.scss';

const LoadingSpinner = ({ loading }) => {
    if(loading) {
        return(
    
            <div className="loading-spinner">
                <div className="loading-spinner__cart">
                
                    <img src={loadingSpinnerGif} alt="loading icon" className='loading-spinner__image'/>
            
                    <div className="loading-spinner__cart-text">
                      please wait
                    </div>
                </div>
            </div>
    )
    } else return null;

}    

const mapStateToProps = state => ({
    loading: state.spinner.loading
});

export default connect(mapStateToProps,null)(LoadingSpinner);

