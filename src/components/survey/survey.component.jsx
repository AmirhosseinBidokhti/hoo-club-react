import React from 'react';

import './survey.styles.scss';
import Card from '../survey/survey-card/survey-card.component';

import { withRouter } from 'react-router-dom';

import { appConfig } from '../../api/api-endpoints';

class Survey extends React.Component {
    constructor(props) {
        super(props);
        
        this.state = {

            categoryId: this.props.match.params.id,
            categoryImages: [],
            

        }
    }


    // getCategories = (categoryID) => {


    //     const requestOptions = {
    //         method: 'POST',
    //         headers: { 'Content-Type': 'application/json',
    //         authorization: "Bearer  " + this.props.token,
    //     },
    //         body: `{"Params":'{"PageNumber":"1","PageSize":"1000","CategoryID":"${this.type}","UserID":"${this.id}"}'}`
            
    //     fetch(`${appConfig.apiEndpoint}/Survey/Get`, requestOptions)
    //         .then(async response => {
    //             const data = await response.json();
    //             console.log(data);
                
    //             if (!response.ok) {
    //                 const error = (data && data.message) || response.status;
    //                 console.log(error);
    //                 return Promise.reject(error);
    //             }
    //         })
    //         .catch(error => {
    //             console.error('There was an error!', error);
    
    //         });

    // }














    render() {
        return (
            
        <div className="survey">
            <div className="survey-banner-container">
               
                <div className="survey-banner">
        <div className="back-button"><button>back</button></div>
                    <h1 className="survey-banner-title">exercise</h1> 
                </div>
            </div>
            <div className="survey-card-list">
                <Card /><Card /><Card /><Card /><Card /><Card /><Card />
            </div>
        </div>

        )
    }
    
}

export default withRouter(Survey);

// {this.props.match.params.id}