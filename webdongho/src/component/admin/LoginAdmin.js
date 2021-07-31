import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
// import '../../assets/admin/vendors/bootstrap/dist/css/bootstrap.min.css'
// import '../../assets/admin/vendors/font-awesome/css/font-awesome.min.css'
// import '../../assets/admin/vendors/nprogress/nprogress.css'
// import '../../assets/admin/vendors/animate.css/animate.min.css'
// import '../../assets/admin/build/css/custom.min.css'

import '../../assets/admin/vendors/bootstrap/dist/css/bootstrap.min.css'
import '../../assets/admin/vendors/font-awesome/css/font-awesome.min.css'
import '../../assets/admin/vendors/nprogress/nprogress.css'
import '../../assets/admin/vendors/iCheck/skins/flat/green.css'
import '../../assets/admin/vendors/bootstrap-progressbar/css/bootstrap-progressbar-3.3.4.min.css'
import '../../assets/admin/vendors/jqvmap/dist/jqvmap.min.css'
import '../../assets/admin/vendors/bootstrap-daterangepicker/daterangepicker.css'
import '../../assets/admin/build/css/custom.min.css'
import '../../assets/admin/build/css/style.css'

export default function LoginAdmin() {
    console.log('quay lai')
    let history = useHistory()
    let [username, setUsername] = useState("")
    let [password, setPassword] = useState("")

    let setParams = (event) => {
        if (event.target.name === 'username') {
            setUsername(event.target.value)
        }
        if (event.target.name === 'password') {
            setPassword(event.target.value)
        }
    }

    let login = async (e) => {
        e.preventDefault()
        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");

        var raw = JSON.stringify({
            "username": username,
            "password": password
        });

        var requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: raw,
            redirect: 'follow'
        };
        try {
            let response = await fetch("http://localhost:8080/api/login", requestOptions)
            if(response.ok) {
                let result = await response.json()
                console.log(result)
                localStorage.setItem("accessToken" ,result.accessToken)
                history.replace("/admin")
            }
            if(response.status == 400){
                alert('Tài khoản hoặc mật khẩu sai')
            }
            if(response.status == 401){
                alert('Tài khoản của bạn không có quyền truy cập')
            }
            if(response.status == 402){
                alert('Tài khoản và mật khẩu phải ít nhất 6 kí tự')
            }
        } catch (error) {
            console.log('error', error)
        }
    }

    return (
        <>
            <div className="login-admin">
                <div>
                    <a className="hiddenanchor" id="signup"></a>
                    <a className="hiddenanchor" id="signin"></a>

                    <div className="login_wrapper">
                        <div className="animate form login_form">
                            <section className="login_content">
                                <form>
                                    <h1>Đăng nhập</h1>
                                    <div>
                                        <input type="text" name="username" className="form-control" placeholder="Tài khoản" required="" onChange={setParams} />
                                    </div>
                                    <div>
                                        <input type="password" name="password" className="form-control" placeholder="Mật khẩu" required="" onChange={setParams} />
                                    </div>
                                    <div>
                                        <a className="btn btn-default submit" onClick={login}>Đăng nhập</a>
                                        {/* <a className="reset_pass" href="#">Lost your password?</a> */}
                                    </div>

                                    <div className="clearfix"></div>

                                    <div className="separator">

                                        <div className="clearfix"></div>
                                        <br />

                                        <div>
                                            <h1><i className="fa fa-paw"></i> TimeZone!</h1>
                                            <p>Copyright Anfeed</p>
                                        </div>
                                    </div>
                                </form>
                            </section>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}