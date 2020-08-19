import React from 'react';

import './survey.styles.scss';
import Card from '../survey/survey-card/survey-card.component';

import { withRouter } from 'react-router-dom';

import { connect } from "react-redux";

import { appConfig } from '../../api/api-endpoints';

class Survey extends React.Component {
    constructor(props) {
        super(props);
        
        this.state = {

            categoryId: this.props.match.params.id,
            categoryImages: [],
            

        }
    }
    
    componentDidMount() {
        console.log('user and token:');
        console.log(this.props.user_id);
        console.log(this.props.token);

        // calling the api

        
        const requestOptions = {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            authorization: "Bearer  " + this.props.token,
            body: `{"Params":'{"PageNumber":"1","PageSize":"1000","CategoryID":"${1}","UserID":"${
              this.props.user_id}"}'}`,
          };
          
          
          console.log(requestOptions.body);

          fetch(`${appConfig.apiEndpoint}/Survey/Get`, requestOptions)
            .then(async (response) => {
              const data = await response.json();
              console.log(data);

      
              if (!response.ok) {
                const error = (data && data.message) || response.status;
                console.log(error);
                return Promise.reject(error);
              }
            })
            .catch((error) => {
              console.error("There was an error!", error);
            });
    }

    





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

const mapStateToProps = (state) => ({
    user_id: state.user.user_id,
    token: state.user.access_token
  });
  


export default connect(mapStateToProps, null)(Survey);


//withRouter
// {this.props.match.params.id}