import React from "react";

import { Redirect } from 'react-router';

import { connect } from "react-redux";

import FormInput from "../form-input/form-input.component";
import { appConfig } from "../../api/api-endpoints";

import { toggleSpinner } from "../../redux/loading-spinner/loading-spinner.actions";
import { setCurrentUserOTP } from '../../redux/user/user.actions';

import LoadingSpinner from '../loading-spinner/loading-spinner.component';

import "./otp.styles.scss";

class OTP extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      SMSCode: "",
      second: 120,
      resend: false,
      redirect: false
    };
  }

  handleChange = (e) => {
    const { name, value } = e.target;

    this.setState({ [name]: value }, () => console.log(this.state));
    console.log(this.props);
  };


  tick = () => {
    this.setState({resend: false});
    if(this.state.second > 0) {
      this.setState(prevState => ({
        second: prevState.second - 1,
      }),()=>console.log(this.state))
    } else {
      this.setState({resend: true}, ()=> console.log(this.state))
    }
     

      //clearInterval(this.timer);
      //window.location.reload();
  }

  componentDidMount() {
    this.timer = setInterval(this.tick, 1000);
  }

  componentWillUnmount() {
    clearInterval(this.timer);
  }


  submitHandler = (e) => {
    e.preventDefault();

    this.props.toggleSpinner(true);

    // console.log(
    //   `{"Params":'{"UserID":"${this.props.user_id.toString()}","OTP":"${
    //     this.state.SMSCode
    //   }"}'}`
    // );
    // console.log("Bearer  " + this.props.token);
    // POST request using fetch with error handling
    const requestOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        authorization: "Bearer  " + this.props.token,
      },
      body: `{"Params":'{"UserID":"${this.props.user_id.toString()}","OTP":"${
        this.state.SMSCode
      }"}'}`,
    };
    // console.log("before call otp check");
    fetch(`${appConfig.apiEndpoint}/Account/OTPCheck`, requestOptions)
      .then(async (response) => {
        const data = await response.json();

        //this.setState({redirect: true});

        this.props.setCurrentUserOTP(data[0]);

        
        console.log(data);


        // check for error response
        if (!response.ok) {
          // if response.status was 401 then toggle error component and render it
          // after could of seconds then toggle again so it disapear.

          // get error message from body or default to response status
          const error = (data && data.message) || response.status;
          console.log(error);
          return Promise.reject(error);
          
        }

        this.props.toggleSpinner(false);
      })

      .catch((error) => {
        console.error("There was an error!", error);
      });
  };

  SMSResend = () => {
      this.setState({second:120})
  }


  render() {
   
      return (  
        <div className="otp">
            <div className='form-container'>
            <form className="sms-input" onSubmit={this.submitHandler} id='otp-form'>
              <FormInput
                type="number"
                name="SMSCode"
                value={this.state.SMSCode}
                required
                placeholder="Type SMS code here..."
                handleChange={this.handleChange}
              />
            </form>
            <div className="timer-container">
                <span>Code sent via SMS</span>
            </div>
            <div className='timer'>
              
                {
                  this.state.resend ? <span onClick={this.SMSResend} style={{cursor:"pointer", fontSize:'1.5rem'}}>Resend?</span> : 
                  <span>{this.state.second}</span>
                }
            
            
              <button type="submit" className="next-button"  form='otp-form'>
                next
              </button>
                
            </div>
        
          </div>
          <LoadingSpinner /> 
         
        </div>  
      );
  }

}


const mapStateToProps = (state) => ({
  user_id: state.user.user_id,
  token: state.user.access_token
});

const mapDispatchToProps = (dispatch) => ({
  toggleSpinner: (loading) => dispatch(toggleSpinner(loading)),
  setCurrentUserOTP: user => dispatch(setCurrentUserOTP(user))
});


export default connect(mapStateToProps, mapDispatchToProps)(OTP);
