import React, { useEffect, useState } from 'react'
import { useHistory, useLocation, useRouteMatch } from 'react-router'

export default function EditCategory() {
    let history = useHistory()
    let match = useRouteMatch()
    let id = match.params.id

    console.log("id ",id)

    let [code ,setCode] = useState("")
    let [present ,setPresent] = useState("")

    let token = localStorage.getItem("accessToken");

    useEffect(() => {
        console.log("2222")
        loadCoupon()
    } ,[token])

    let setParams = (e) => {
        if (e.target.name === 'code') {
            setCode(e.target.value)
        }
        if (e.target.name === 'present') {
            setPresent(e.target.value)
        }
    }

    let loadCoupon = async () => {
        var myHeaders = new Headers();
        myHeaders.append("Authorization", "Bearer "+localStorage.getItem("accessToken"));

        var requestOptions = {
            method: 'GET',
            headers: myHeaders,
            redirect: 'follow'
        };

        try {
            let response = await fetch("http://localhost:4000/api/admin/coupon/"+id, requestOptions)
            if(response.ok) {
                let result = await response.json();
                console.log(result)
                setCode(result.code)
                setPresent(result.present)
            }
        } catch (error) {
            console.log("error load "+error)
        }
    }

    let EditCoupon = async () => {
        console.log(code ,present)
        var myHeaders = new Headers();
        myHeaders.append("Authorization", "Bearer "+localStorage.getItem("accessToken"));
        myHeaders.append("Content-Type", "application/json");

        var raw = JSON.stringify({
            "code": code,
            "present": present,
        });

        var requestOptions = {
            method: 'PUT',
            headers: myHeaders,
            body: raw,
            redirect: 'follow'
        };

        await fetch("http://localhost:4000/api/admin/coupon/"+id, requestOptions)
        .then(async response => {
            if(response.ok) {
                let result = await response.json()
                console.log(result)
                console.log("update successful")
                history.replace('/admin/coupon')
            }
        })
        .catch(error => {
            console.log('error update', error)
            alert('Mã giảm giá đã tồn tại')
        });
    }

    return (
        <>
            <div className="row">
                <div className="col-md-12 col-sm-12">
                    <div className="x_panel">
                        <div className="x_content">
                            <span className="section">Thông tin loại sản phẩm</span>
                            <div className="field item form-group">
                                <label className="col-form-label col-md-3 col-sm-3  label-align">mã code<span className="required">*</span></label>
                                <div className="col-md-6 col-sm-6">
                                    <input className="form-control" name="code" value={code} onChange={setParams}/>
                                </div>
                            </div>
                            <div className="field item form-group">
                                <label className="col-form-label col-md-3 col-sm-3  label-align">Phần trăm<span className="required">*</span></label>
                                <div className="col-md-6 col-sm-6">
                                    <input className="form-control" name="present" value={present} onChange={setParams}/>
                                </div>
                            </div>
                            <div className="ln_solid">
                                <div className="form-group">
                                    <div className="col-md-6 offset-md-3">
                                        <button type='button' className="btn btn-primary" onClick={EditCoupon}>Sửa</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}