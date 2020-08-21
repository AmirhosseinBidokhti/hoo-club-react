import React from "react";

import { Redirect } from "react-router";

import { connect } from "react-redux";

import FormInput from "../form-input/form-input.component";
import { appConfig } from "../../api/api-endpoints";

import { toggleSpinner } from "../../redux/loading-spinner/loading-spinner.actions";
import { setCurrentUserOTP } from "../../redux/user/user.actions";

import LoadingSpinner from "../loading-spinner/loading-spinner.component";
import Alert from "../alert/alert.component";

import "./otp.styles.scss";

class OTP extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      SMSCode: "",
      second: 120,
      resend: false,
      redirect: false,
      dearUser: "/dear-user",
      resendResult: "",
    };
  }

  handleChange = (e) => {
    const { name, value } = e.target;

    this.setState({ [name]: value }, () => console.log(this.state));
    console.log(this.props);
  };

  tick = () => {
    this.setState({ resend: false });
    if (this.state.second > 0) {
      this.setState(
        (prevState) => ({
          second: prevState.second - 1,
        }),
        () => console.log(this.state)
      );
    } else {
      this.setState({ resend: true }, () => console.log(this.state));
    }

    //clearInterval(this.timer);
    //window.location.reload();
  };

  // getting sms from otp as soon as componentmounts
  componentDidMount() {
    const requestOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        authorization: "Bearer  " + this.props.token,
      },
      body: JSON.stringify({
        procname: "PostLoginProcess",
        params: `{ "UserID": ${this.props.user_id.toString()} }`,
      }),
    };

    console.log("here the token");
    console.log(this.props.token);
    console.log(
      JSON.stringify({
        procname: "PostLoginProcess",
        params: { UserID: this.props.user_id.toString() },
      })
    );
    fetch(`${appConfig.apiEndpoint}/BackendEngine`, requestOptions)
      .then(async (response) => {
        const data = await response.json();

        console.log(data);

        // check for error response
        if (!response.ok) {
          // get error message from body or default to response status
          const error = (data && data.message) || response.status;
          console.log(error);
          return Promise.reject(error);
        }
      })

      .catch((error) => {
        console.error("There was an error!", error);
        this.props.toggleSpinner(false);
      });

    this.timer = setInterval(this.tick, 1000);
  }

  componentWillUnmount() {
    clearInterval(this.timer);
  }

  submitHandler = (e) => {
    e.preventDefault();

    this.props.toggleSpinner(true);

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

        // if otp code was not giving us a error then change redirect to true so we can redirect
        if (data[0].result !== "Error") {
          this.setState({ redirect: true });
        }

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

  // Resend the SMS From OTP Service
  SMSResend = () => {
    this.setState({ second: 120 });
    this.props.toggleSpinner(true);
    const requestOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        authorization: "Bearer  " + this.props.token,
      },
      body: `{"Params":'{"UserID":"${this.props.user_id.toString()}"}'}`,
    };

    fetch(`${appConfig.apiEndpoint}/Account/SendOTPSms`, requestOptions)
      .then(async (response) => {
        this.setState({ resendResult: "" });
        const data = await response.json();
        this.setState({ resendResult: data[0].result });
        console.log(data);
        console.log(this.state);
        this.props.toggleSpinner(false);

        // check for error response
        if (!response.ok) {
          // get error message from body or default to response status
          const error = (data && data.message) || response.status;
          console.log(error);
          return Promise.reject(error);
        }
      })

      .catch((error) => {
        console.error("There was an error!", error);
        this.props.toggleSpinner(false);
      });
  };

  render() {
    return (
      <div className="otp">
        <div className="form-container">
          <form
            className="sms-input"
            onSubmit={this.submitHandler}
            id="otp-form"
          >
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
          <div className="timer">
            {this.state.resend ? (
              <span
                onClick={this.SMSResend}
                style={{ cursor: "pointer", fontSize: "1.5rem" }}
              >
                Resend?
              </span>
            ) : (
              <span>{this.state.second}</span>
            )}

            <button type="submit" className="next-button" form="otp-form">
              next
            </button>
          </div>
        </div>
        <LoadingSpinner />

        {this.state.redirect === true ? (
          <Redirect to={this.state.dearUser} />
        ) : null}
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  user_id: state.user.user_id,
  token: state.user.access_token,
});

const mapDispatchToProps = (dispatch) => ({
  toggleSpinner: (loading) => dispatch(toggleSpinner(loading)),
  setCurrentUserOTP: (user) => dispatch(setCurrentUserOTP(user)),
});

export default connect(mapStateToProps, mapDispatchToProps)(OTP);

/*{
            this.state.resendResult === "Ok" ? 
            <Alert success errorMessage={'Resent the SMS code'}/> 
            :
            <Alert danger errorMessage={'Code was not sent,Please contact support team'} />
          }*/
