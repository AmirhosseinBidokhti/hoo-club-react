import React from 'react';

import { connect } from 'react-redux';

import { appConfig } from '../../api/api-endpoints';

import FormInput from '../form-input/form-input.component';
import LoadingSpinner from '../loading-spinner/loading-spinner.component';

import hooMainLogo from '../../assets/sign-in/main-logo.png';

import './sign-in.styles.scss';
import { setCurrentUser } from '../../redux/user/user.actions';
import { toggleSpinner } from '../../redux/loading-spinner/loading-spinner.actions';
import  OTP  from '../otp/otp.component';
import {ReactComponent as SignInButton} from '../../assets/LivIconsEvo/svg/loader-8.svg';
import audioSound from '../../assets/mp3/Apparat-circles.mp3'
import waterDippingSound from '../../assets/mp3/Water_dripping.mp3'

class SignIn extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            
            username:'',
            password:'',
            errorMessage:'',
            audioSoundSource: waterDippingSound,
            play: false
        }
    }

    audioPlay = () => {
        
        this.setState((prevState, prevProp) => {
            prevState.play = true
        }, console.log(this.state.play))
    
        
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
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username: this.state.username,password:this.state.password })
    };
    fetch(`${appConfig.apiEndpoint}/account/login`, requestOptions)
        .then(async response => {
            const data = await response.json();

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
          
            
        })
        .catch(error => {
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
                </form>
               
                {
                    this.state.play === true ? <audio src={this.state.audioSoundSource} autoPlay></audio>
                    : null
                }
                  
                
                
                
                <SignInButton className="button"/>
                <LoadingSpinner />
                <OTP />
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