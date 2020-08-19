import React from 'react';

import { connect } from 'react-redux';

import { appConfig } from '../../api/api-endpoints';

import FormInput from '../form-input/form-input.component';
import LoadingSpinner from '../loading-spinner/loading-spinner.component';
import Alert from '../alert/alert.component';

import hooMainLogo from '../../assets/sign-in/main-logo.png';

import './sign-in.styles.scss';
import { setCurrentUser } from '../../redux/user/user.actions';
import { toggleSpinner } from '../../redux/loading-spinner/loading-spinner.actions';
import  OTP  from '../otp/otp.component';
//import {ReactComponent as SignInButton} from '../../assets/LivIconsEvo/svg/loader-8.svg';

import waterDippingSound from '../../assets/mp3/Water_dripping.mp3';

class SignIn extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            
            username:'',
            password:'',
            errorMessage:'',
            userAuthenticated: false
        }
    }

    audioPlay = () => {

        let WaterDrip = new Audio(waterDippingSound);
        WaterDrip.play();
        
    }


    handleChange = e => {
        const {name, value} = e.target;

        this.setState({[name]:value},()=> console.log(this.state));

        console.log(this.props)
    }

    submitHandler = e => {
        
        e.preventDefault();


        this.props.toggleSpinner(true)
        

        // POST request using fetch with error handling
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: JSON.stringify({ username: this.state.username,password:this.state.password })
    };

    console.log('down here the body:');
    console.log(requestOptions.body);
    fetch(`${appConfig.apiEndpoint}/token`, requestOptions)
        .then(async response => {
            const data = await response.json();
            console.log(data);
            // if we dont do this then alert wont apply more than one time. since it wont re-render.
            this.setState({ errorMessage: '' }); 
            // check for error response
            if (!response.ok) {
                this.props.toggleSpinner(false);
                // if response.status was 401 then toggle error component and render it
                // after could of seconds then toggle again so it disapear.

                // get error message from body or default to response status
                const error = (data && data.message) || response.status;
                console.log(error);
                return Promise.reject(error);
            }


            this.props.setCurrentUser(data);
            
            this.props.toggleSpinner(false);

            this.setState({userAuthenticated: true, play:false})

            
          
            
        })
        .catch(error => {
            this.props.toggleSpinner(false);
            this.setState({ errorMessage: error.toString() });
            console.error('There was an error!', error);

        });

    }

    render() {

        return(

            <div className="sign-in">

                <div className="sign-in__logo">
                    <img className='logo' 
                    src={hooMainLogo}
                    alt="main logo of hoo club"
                    />
                </div>

                <form onSubmit={this.submitHandler} className='sign-in__form'>
            
                    <FormInput 
                    type="text"
                    name="username"
                    value={this.state.username}
                    placeholder="username"
                    handleChange={this.handleChange}
                    required
                    />


                    <FormInput
                    type="password"
                    name="password"
                    value={this.state.password}
                    placeholder="password"
                    handleChange={this.handleChange}
                    required
                    />
                    

                    
                <button type='submit' className='test-button' onClick={this.audioPlay}>test button</button>
                {
                   this.state.errorMessage.length > 0 ? <Alert
                   errorMessage={'Incorrect username or password'} danger/> : null
                }
                </form>        
                
                
                <LoadingSpinner />  
                {
                    this.state.userAuthenticated && <OTP/>
                }
                
                <div>    
            </div>

            </div>
               

        )

    }
}


const mapStateToProps = state => ({
    currentUser: state.user.access_token
})

const mapDispatchToProps = dispatch => ({
    setCurrentUser: user => dispatch(setCurrentUser(user)),
    toggleSpinner: loading => dispatch(toggleSpinner(loading))
})


export default connect(mapStateToProps, mapDispatchToProps)(SignIn);