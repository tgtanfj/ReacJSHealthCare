import React, { Component } from 'react';
import { connect } from 'react-redux';
import { push } from "connected-react-router";


// import * as actions from "../store/actions";
import * as actions from "../../store/actions";


import './Login.scss';
import { FormattedMessage } from 'react-intl';
import { handldLoginApi } from '../../services/userService'

class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            password: '',
            isShowPassowrd: false,
            errMessage: '',
        }
    }

    handleOnChangeUsername = (event) => {
        this.setState({
            username: event.target.value
        })
    }

    handleOnChangePassword = (event) => {
        this.setState({
            password: event.target.value
        })
    }

    handldLogin = async () => {
        this.setState({
            errMessage: ''
        })
        try {
            let data = await handldLoginApi(this.state.username, this.state.password)
            if(data && data.errCode !==0) {
                this.setState({
                    errMessage: data.message
                })
            }
            if(data && data.errCode === 0) {
                this.props.userLoginSuccess(data.user)
            }
        } catch (error) {
            if (error.response) {
                if (error.response.data) {
                    this.setState({
                        errMessage: error.response.data.message
                    })
                }
            }

        }
    }

    handleKeyDown = (e) => {
        if(e.key === 'Enter' || e.keyCode === 13) {
            this.handldLogin()
        }
    }

    // handleShowHidePassword = () => {
    //     this.setState ({
    //         isShowPassowrd: !this.isShowPassowrd
    //     })
    // }

    render() {
        // JSX
        return (
            <div className='login-background'>
                <div className='login-container'>
                    <div className='login-content'>
                        <div className='col-12 text-login'>Login</div>
                        <div className='col-12 form-group login-input'>
                            <lable>Username:</lable>
                            <input
                                placeholder='Enter your username...' type='text' className='form-control'
                                value={this.state.username}
                                onChange={(event) => this.handleOnChangeUsername(event)}
                            />
                        </div>
                        <div className='col-12 form-group login-input'>
                            <lable>Password:</lable>
                            <div className='custom-input-password'>
                                <input
                                    className='form-control'
                                    placeholder='Enter your password...' type={this.state.isShowPassowrd ? 'text' : 'password'}
                                    value={this.state.password}
                                    onChange={(event) => this.handleOnChangePassword(event)}
                                    onKeyDown={(e) => this.handleKeyDown(e)}
                                />
                                {/* <span
                                    onClick={() => {this.handleShowHidePassword()}}
                                ><i className={this.state.isShowPassowrd ? 'far fa-eye' : 'far fa-eye-slash'}></i></span> */}
                            </div>

                        </div>
                        <div className='col-12' style={{ color: "red" }}>
                            {this.state.errMessage}
                        </div>
                        <div className='col-12'>
                            <button onClick={() => { this.handldLogin() }} className='btn-login'>Login</button>
                        </div>
                        <div className='col-12'>
                            <span className='forgot-password'>Forgot your password?</span>
                        </div>
                        <div className='col-12 text-center mt-3'>
                            <span>Or Login with:</span>
                        </div>
                        <div className='col-12 social-login'>
                            <i className="fa-brands fa-google google">Google</i>
                            <i className="fa-brands fa-facebook facebook">Facebook</i>
                        </div>
                    </div>

                </div>
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        language: state.app.language
    };
};

const mapDispatchToProps = dispatch => {
    return {
        navigate: (path) => dispatch(push(path)),
        // userLoginFail: () => dispatch(actions.userLoginFail()),
        userLoginSuccess: (userInfo) => dispatch(actions.userLoginSuccess(userInfo))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
