import React from "react";

import "./survey.styles.scss";
import Card from "../survey/survey-card/survey-card.component";

import { withRouter } from "react-router-dom";

import { connect } from "react-redux";

import { appConfig } from "../../api/api-endpoints";
import Cookie from "js-cookie";
import axios from "axios";

class Survey extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      categoryId: "", //this.props.match.params.id
      categoryImages: [],
      userid: "",
      token: "",
    };
  }

  componentDidMount() {
    const user = Cookie.get("currentUser");
    const userObj = JSON.parse(user);

    this.setState(
      { userid: userObj.UserID, token: userObj.access_token },
      () => {}
    );

    const config = {
      headers: { authorization: "Bearer  " + userObj.access_token },
    };

    const bodyParameters = {
      procname: "GetSurveyImages",
      params: `{"PageNumber":"1","PageSize":"3","CategoryID":"${1}","UserID":"${
        userObj.UserID
      }"}`,
    };

    console.log(bodyParameters);

    axios
      .post(`${appConfig.apiEndpoint}/BackendEngine`, bodyParameters, config, {
        timeout: 30000,
      })
      .then((response) => {
        console.log(response.data);
      })
      .catch(console.log);

    /////////////
    // const requestOptions = {
    //   method: "POST",
    //   headers: { "Content-Type": "application/json" },
    //   authorization: "Bearer  " + userObj.access_token,
    //   body: JSON.stringify({
    //     procname: "GetSurveyImages",
    //     params: `{"PageNumber":"1","PageSize":"1000","CategoryID":"${1}","UserID":"${
    //       userObj.UserID
    //     }"}`,
    //   }),
    // };

    // console.log(requestOptions.body);

    // fetch(`${appConfig.apiEndpoint}/BackendEngine`, requestOptions)
    //   .then(async (response) => {
    //     const data = await response.json();
    //     console.log(data);

    //     if (!response.ok) {
    //       const error = (data && data.message) || response.status;
    //       console.log(error);
    //       return Promise.reject(error);
    //     }
    //   })
    //   .catch((error) => {
    //     console.error("There was an error!", error);
    //   });
  }

  render() {
    return (
      <div className="survey">
        <div className="survey-banner-container">
          <div className="survey-banner">
            <div className="back-button">
              <button>back</button>
            </div>
            <h1 className="survey-banner-title">exercise</h1>
          </div>
        </div>
        <div className="survey-card-list">
          <Card />
          <Card />
          <Card />
          <Card />
          <Card />
          <Card />
          <Card />
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  // user_id: state.user.user_id,
  // token: state.user.access_token
});

export default connect(mapStateToProps, null)(Survey);

//withRouter
// {this.props.match.params.id}
