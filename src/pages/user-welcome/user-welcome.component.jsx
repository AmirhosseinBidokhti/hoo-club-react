import React from 'react';

import './user-welcome.styles.scss';

import { connect } from 'react-redux';


const UserWelcome = (props) => (
    <div className="user-welcome">
        
        <div className="user-welcome-text">

            <pre> 
            {`
            Dear Mr./Ms. ${props}
            Welcome to member's "Needs Priority
            Assessment". Please spend 8 minutes and 
            prioritize your needs on each service.`
            }
            </pre>

        </div>


    </div>
);

const mapStateToProps = (state) => ({
    lastName: state.user.lastName
  });
  
 
    
export default connect(mapStateToProps,null)(UserWelcome);