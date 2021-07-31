import React, { useEffect, useState } from 'react'
import { useHistory, useLocation, useRouteMatch } from 'react-router-dom'

export default function EditCategory() {
    let history = useHistory()
    let match = useRouteMatch()
    let id = match.params.id

    console.log("id ", id)

    let [name, setName] = useState("")

    useEffect(() => {
        console.log("2222")
        loadCategory()
    }, [])

    let setParams = (e) => {
        if (e.target.name === 'name') {
            setName(e.target.value)
        }
    }

    let loadCategory = async () => {
        var myHeaders = new Headers();

        var requestOptions = {
            method: 'GET',
            headers: myHeaders,
            redirect: 'follow'
        };

        try {
            let response = await fetch("http://localhost:8080/api/category/" + id, requestOptions)
            if (response.ok) {
                let result = await response.json();
                console.log(result)
                setName(result.name)
            }
        } catch (error) {
            console.log("error load " + error)
        }
    }

    let EditCategory = async () => {
        console.log("edit")
        var myHeaders = new Headers();
        myHeaders.append("Authorization", "Bearer " + localStorage.getItem("accessToken"));
        myHeaders.append("Content-Type", "application/json");

        var raw = JSON.stringify({
            "name": name
        });

        var requestOptions = {
            method: 'PUT',
            headers: myHeaders,
            body: raw,
            redirect: 'follow'
        };

        try {
            let response = await fetch("http://localhost:8080/api/admin/category/" + id, requestOptions)
            if(response.ok) {
                let result = await response.json()
                console.log(result)
                history.replace('/admin/category')
            }
        } catch (error) {
            console.log('error update', error)
            alert('Danh mục sản phẩm đã tồn tại')
        }
    }

return (
    <>
        <div className="row">
            <div className="col-md-12 col-sm-12">
                <div className="x_panel">
                    <div className="x_content">
                        <span className="section">Thông tin loại sản phẩm</span>
                        <div className="field item form-group">
                            <label className="col-form-label col-md-3 col-sm-3  label-align">Tên loại sản phẩm<span className="required">*</span></label>
                            <div className="col-md-6 col-sm-6">
                                <input className="form-control" name="name" value={name} onChange={setParams} />
                            </div>
                        </div>
                        <div className="ln_solid">
                            <div className="form-group">
                                <div className="col-md-6 offset-md-3">
                                    <button type='button' className="btn btn-primary" onClick={EditCategory}>Sửa</button>
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