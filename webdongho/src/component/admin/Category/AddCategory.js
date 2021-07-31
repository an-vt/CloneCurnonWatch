import React from 'react';
import { withRouter } from 'react-router-dom';

class AddCategory extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            "name": ""
        }
    }

    setParams = (event) => {
        this.setState({ [event.target.name]: event.target.value })
    }

    addCategory = async () => {
        console.log("add name"+this.state.name)
        var myHeaders = new Headers();
        myHeaders.append("Authorization", "Bearer " + localStorage.getItem("accessToken"));
        myHeaders.append("Content-Type", "application/json");

        var raw = JSON.stringify({
            "name": this.state.name
        });

        var requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: raw,
            redirect: 'follow'
        };

        try {
            let response = await fetch("http://localhost:8080/api/admin/category", requestOptions)
            if(response.ok) {
                let result = await response.json()
                console.log(result)
                let { history } = this.props;
                history.replace('/admin/category')
            }
        } catch (error) {
            console.log("err ",error)
            alert('Danh mục sản phẩm đã tồn tại')
        }

    }

    render() {
        return (
            <>
                <span className="section">Thông tin loại sản phẩm</span>
                <div className="field item form-group">
                    <label className="col-form-label col-md-3 col-sm-3  label-align">Tên loại sản phẩm<span className="required">*</span></label>
                    <div className="col-md-6 col-sm-6">
                        <input className="form-control" name="name" onChange={this.setParams} placeholder="Nhập tên danh mục sản phẩm"/>
                        {/* <p></p> */}
                    </div>
                </div>
                <div className="ln_solid">
                    <div className="form-group">
                        <div className="col-md-6 offset-md-3">
                            <button type="button" className="btn btn-primary" onClick={this.addCategory}>Thêm</button>
                        </div>
                    </div>
                </div>
            </>
        )
    }
}

export default withRouter(AddCategory)