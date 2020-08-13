import React from 'react';

import { connect } from 'react-redux';

import FormInput from '../form-input/form-input.component';
import { appConfig } from '../../api/api-endpoints';
import { toggleSpinner } from '../../redux/loading-spinner/loading-spinner.actions';

import './otp.styles.scss';


 class OTP extends React.Component {
     constructor(props) {
         super(props);

         this.state = {
            SMSCode: '',
            second: 60
         };
     }

    handleChange = e => {
        const {name, value} = e.target;

        this.setState({[name]:value},()=> console.log(this.state));

        console.log(this.props)
    }

    tick = () => {

        if(this.state.second > 0) {
            this.setState({second: this.state.second -1})
        } else {
            clearInterval(this.timer);
            //window.location.reload();
        }
            

    }

    componentDidMount() {
        this.timer = setInterval(this.tick, 1000)
    }

    submitHandler = (e) => {
        e.preventDefault();

        this.props.toggleSpinner(true);

        // POST request using fetch with error handling
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ params: this.state.SMSCode })
    };
    fetch(`${appConfig.apiEndpoint}/Account/OTPCheck`, requestOptions)
        .then(async response => {
            const data = await response.json();

            // check for error response
            if (!response.ok) {
                // if response.status was 401 then toggle error component and render it
                // after could of seconds then toggle again so it disapear.

                // get error message from body or default to response status
                const error = (data && data.message) || response.status;
                console.log(error);
                return Promise.reject(error);
                this.props.toggleSpinner(false);
            }

            this.props.toggleSpinner(false);
                        
        })

        
        .catch(error => {
            console.error('There was an error!', error);
        });

    }


     render() {

        if(this.props.user_id) {
            return (

                <div className="otp">   
                        <form className='sms-input' onSubmit={this.submitHandler}>
                            <FormInput
                            type='number'
                            name='SMSCode'
                            value={this.state.SMSCode}
                            required
                            placeholder="Type SMS code here..."
                            handleChange={this.handleChange}
                            />
    
                            <div className='timer-container'>
                                <span>The code was sent to you by SMS</span>
                                <span>{this.state.second}</span>
                            </div>
                            <button type='submit' className='test-button'>test button</button>
                        </form>
                    <div/>
                </div>
             )
        } else { return null; }
    }
 }


const mapStateToProps = state => ({
    user_id: state.user.user_id
});

const mapDispatchToProps = dispatch => ({
    toggleSpinner: loading => dispatch(toggleSpinner(loading))
})


 export default connect(mapStateToProps, mapDispatchToProps)(OTP);