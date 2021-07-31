import React, { useEffect, useState } from 'react'
import { useHistory } from 'react-router'

export default function TopNav() {
    let history = useHistory()
    let [isCheck ,setIsCheck] = useState(false)
    let [user ,setUser] = useState({})
    let accessToken = localStorage.getItem('accessToken')

    let click = (e) => {
        const menuElemnt = e.target.closest('li')
        if(menuElemnt) {
            setIsCheck(!isCheck)
        }
    }

    useEffect(() => {
        loadUser()
    } ,accessToken)

    let logOut = (e) => {
        e.preventDefault()
        const linkElement = e.target.closest('a')
        if(linkElement) {
            localStorage.removeItem('accessToken')
            history.push('/admin')
        }
    }

    let loadUser = async () => {
        var myHeaders = new Headers();
        myHeaders.append("Authorization", "Bearer "+localStorage.getItem('accessToken'));

        var requestOptions = {
            method: 'GET',
            headers: myHeaders,
            redirect: 'follow'
        };

        try {
            let response = await fetch("http://localhost:8080/api/member/me", requestOptions)
            if(response.ok) {
                let result = await response.json()
                console.log(result)
                setUser(result)
            }
        } catch (error) {
            
        }
            
    }

    return (
        <>
            <div className="top_nav">
                <div className="nav_menu">
                    <div className="nav toggle">
                        <a id="menu_toggle"><i className="fa fa-bars"></i></a>
                    </div>
                    <nav className="nav navbar-nav">
                        <ul className=" navbar-right">
                            <li id="menu" onClick={click} className={isCheck ? "nav-item dropdown open show" : "nav-item dropdown open"} style={{ paddingLeft: "15px" }}>
                                <a href="javascript:;" className="user-profile dropdown-toggle" aria-haspopup="true" id="navbarDropdown" data-toggle="dropdown" aria-expanded={isCheck ? "true" : "false"}>
                                    <img src={"http://localhost:8080/api/download/"+user.avatar} alt="" />{user.username}
                                </a>
                                <div className={isCheck ? "dropdown-menu dropdown-usermenu pull-right show" : "dropdown-menu dropdown-usermenu pull-right"} aria-labelledby="navbarDropdown">
                                    {/* <a className="dropdown-item" href="javascript:;"> Profile</a>
                                    <a className="dropdown-item" href="javascript:;">
                                        <span className="badge bg-red pull-right">50%</span>
                                        <span>Settings</span>
                                    </a>
                                    <a className="dropdown-item" href="javascript:;">Help</a> */}
                                    <a onClick={logOut} className="dropdown-item" href="#"><i className="fa fa-sign-out pull-right"></i> Đăng xuất</a>
                                </div>
                            </li>
                        </ul>
                    </nav>
                </div>
            </div>
        </>
    )
}