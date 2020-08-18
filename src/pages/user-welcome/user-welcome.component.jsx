import React from 'react';

import './user-welcome.styles.scss';

import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';



class UserWelcome extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            redirect: false,
            redirectTo: '/welcome-1'
        }
        
    }

    render() {
        return(
            <div className="user-welcome">
                <div className="user-welcome-text">

                    Dear Mr. /Ms. <span className='user-welcome-name'>({this.props.lastName})</span><br/>
                    Welcome to member's "Needs Priority Assessment". <br/>
                    Please spend 8 minutes and prioritize your needs on each service.

                </div>
                <button className="next-button btn" 
                onClick={() => this.setState({ redirect:true }) }
                >
                next
                </button>

                {
                    this.state.redirect ? <Redirect to={`${this.state.redirectTo}`} /> : null
                }

            </div>
        )
    }
    
} 
    

    
    


const mapStateToProps = (state) => ({
    lastName: state.user.lastName
  });
  
 //
    
export default connect(mapStateToProps,null)(UserWelcome);