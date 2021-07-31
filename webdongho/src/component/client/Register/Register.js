import React, { useState } from 'react';
import PropTypes from 'prop-types';

Register.propTypes = {

};

function Register(props) {
    let [name, setName] = useState('')
    let [username, setUsername] = useState('')
    let [password, setPassowrd] = useState('')

    let setParams = (e) => {
        if (e.target.name === 'name') {
            setName(e.target.value)
        }
        if (e.target.name === 'username') {
            setUsername(e.target.value)
        }
        if (e.target.name === 'password') {
            setPassowrd(e.target.value)
        }
    }

    async function handleRegister(e) {
        e.preventDefault()
        var formdata = new FormData();
        formdata.append("name", name);
        formdata.append("username", username);
        formdata.append("password", password);

        var requestOptions = {
            method: 'POST',
            body: formdata,
            redirect: 'follow'
        };

        try {
            let response = await fetch("http://localhost:4000/api/user/register", requestOptions)
            if (response.ok) {
                let result = await response.json()
                console.log(result)
            }
        } catch (error) {
            console.log('register error', error)
            alert("Đăng kí thất bại")
        }
    }

    return (
        <>
            <div className="register">
                <div className="register-content">
                    <form action className="register-form">
                        <h2 className="register-heading">New to Curnon</h2>
                        <p className="register-sub-heading">Create your account now to earn many benefits</p>
                        <div className="register-wrap">
                            <a href="" className="register-note">Already have an account? Sign in</a>
                        </div>
                        <div className="register-group">
                            <input type="text" name="name" placeholder="Name" className="input-group" onChange={setParams} />
                            <input type="text" name="username" placeholder="Username" className="input-group" onChange={setParams} />
                            <input type="text" name="password" placeholder="Password" className="input-group" onChange={setParams} />
                            <button type="button" onClick={handleRegister} className="register-btn">Create Account</button>
                        </div>
                    </form>
                </div>
            </div>
        </>
    );
}

export default Register;