import React, { useEffect, useState } from 'react'

export default function SideBarHeader() {
    let [user ,setUser] = useState({})
    let accessToken = localStorage.getItem('accessToken')

    useEffect(() => {
        console.log('111')
        loadUser()
    } ,accessToken)

    let loadUser = async () => {
        var myHeaders = new Headers();
        myHeaders.append("Authorization", "Bearer "+(localStorage.getItem('accessToken')))

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
            {/* sidebar menu */}
            <div className="navbar nav_title" style={{ border: "0" }}>
                <a href="index.html" className="site_title"><i className="fa fa-paw"></i> <span>TimeZone !</span></a>
            </div>

            <div className="clearfix"></div>

            {/* menu profile quick info */}
            <div className="profile clearfix">
                <div className="profile_pic">
                    <img src={"http://localhost:8080/api/download/"+user.avatar} alt="..." className="img-circle profile_img" />
                </div>
                <div className="profile_info">
                    <span>Chào mừng,</span>
                    <h2>{user.username}</h2>
                </div>
            </div>
            {/* /menu profile quick info */}
        </>
    )
}