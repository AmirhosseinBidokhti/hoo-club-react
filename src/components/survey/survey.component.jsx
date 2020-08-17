import React from 'react';

import './survey.styles.scss';
import Card from '../survey/survey-card/survey-card.component';

class Survey extends React.Component {
    constructor(props) {
        super(props);
        
        this.state = {

        }
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

export default Survey;