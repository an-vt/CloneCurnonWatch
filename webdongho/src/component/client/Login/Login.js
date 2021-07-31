import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Link, useHistory, useLocation } from 'react-router-dom';
import { propTypes } from 'react-bootstrap/esm/Image';

Login.propTypes = {
    onLogin: PropTypes.func
};

Login.defaultProps = {
    onLogin: null
};

function Login(props) {
    const history = useHistory()
    const location = useLocation()

    //get props
    let { onLogin } = props
    let previousUrl ;

    //if state of localtion have ?
    //send from checkout
    if(location.state) {
        previousUrl = location.state.previousUrl
    }
    let [username, setUsername] = useState('')
    let [password, setPassowrd] = useState('')

    let setParams = (e) => {
        if (e.target.name === 'username') {
            setUsername(e.target.value)
        }
        if (e.target.name === 'password') {
            setPassowrd(e.target.value)
        }
    }

    let handleLogin = async (e) => {
        e.preventDefault()
        let data = {
            username: username,
            password: password
        }
        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");

        var raw = JSON.stringify(data);

        var requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: raw,
            redirect: 'follow'
        };

        try {
            let response = await fetch("http://localhost:4000/api/login", requestOptions)
            if (response.status == 400) {
                alert('Tài khoản của bạn bị vô hiệu hóa')
            }
            if (response.status == 401) {
                alert('Tài khoản hoặc mật khẩu không chính xác')
            }
            if (response.ok) {
                let result = await response.json()
                console.log(result)
                await localStorage.setItem('accessTokenClient', result.accessToken)
                if (onLogin) {
                    onLogin()
                }
                if (previousUrl === '/checkout') {
                    history.push(previousUrl)
                } else {
                    history.push('/')
                }
            }
            // if(response.status != 500) {
            //     if (previousUrl === '/checkout') {
            //         history.push(previousUrl)
            //     } else {
            //         history.push('/')
            //     }
            // }else {
            //     alert("Login failed")
            // }
        } catch (error) {
            console.log('login error ', error)
        }
    }

    return (
        <>
            <div className="grid wide">
                <div className="login">
                    <div className="login-left">
                        <form className="login-form">
                            <h2 className="form-heading">WELCOME BACK</h2>
                            <p className="form-subheading">Sign into your existing Curnon account to earn rewards,
                                check existing orders and more.</p>
                            <div className="form-input">
                                <input type="text" placeholder="Username" name="username" className="input-group" onChange={setParams} />
                                <input type="text" placeholder="Password" name="password" className="input-group" onChange={setParams} />
                            </div>
                            <button type="button" onClick={handleLogin} className="login-btn">Sign in</button>
                        </form>
                    </div>
                    <div className="login-right">
                        <div className="new-customer">
                            <h2 className="new-customer-heading">NEW TO CURNON?</h2>
                            <p className="new-customer-sub-heading">Create your account now to earn many benefits.</p>
                            <div className="benefit">
                                <div className="benefit-item">
                                    <span />
                                    <p className="benefit-item__text">GAIN POINTS &amp; REWARD</p>
                                </div>
                                <div className="benefit-item">
                                    <span />
                                    <p className="benefit-item__text">GAIN POINTS &amp; REWARD</p>
                                </div>
                                <div className="benefit-item">
                                    <span />
                                    <p className="benefit-item__text">FASTER CHECKOUT</p>
                                </div>
                            </div>
                            <Link to="/register">
                                <a href="" className="new-customer-link">Create Account</a>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Login;