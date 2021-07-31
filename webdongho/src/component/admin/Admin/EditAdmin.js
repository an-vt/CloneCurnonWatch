import React from 'react'
import { withRouter } from 'react-router-dom';

class EditAdmin extends React.Component {
    constructor(props) {
        super(props)

        let { match } = this.props
        let { id } = match.params

        console.log("id ",id)

        this.state = {
            "id": id,
            "name": "",
            "age": "",
            "username": "",
            "password": "",
            "address": "",
            "gender": "",
            "phone": "",
            "email": "",
            "avatar": "",
            file: null,
        }

    }

    componentDidMount() {
        console.log("5555")
        console.log(this.state.id)
        if (this.state.id) {
            this.loadAccountAdmin()
        }

    }

    setParams = (event) => {
        this.setState({ [event.target.name]: event.target.value })
    }

    setFile = (event) => {
        let file = event.target.files[0]
        if (file != null) {
            this.setState({ file })
        }
    }

    loadAccountAdmin = async () => {
        var myHeaders = new Headers();
        myHeaders.append("Authorization", "Bearer " + localStorage.getItem("accessToken"));

        var requestOptions = {
            method: 'GET',
            headers: myHeaders,
            redirect: 'follow'
        };

        try {
            let response = await fetch("http://localhost:8080/api/admin/account/"+this.state.id, requestOptions)
            console.log(response)
            if (response.ok) {
                let result = await response.json()
                console.log("load product ",result)
                this.setState(result)
            }
        } catch (error) {
            console.log('error', error)
        }
    }

    editProduct = async () => {
        console.log(this.state)
        var myHeaders = new Headers();
        myHeaders.append("Authorization", "Bearer " + localStorage.getItem("accessToken"));


        var formdata = new FormData();
        formdata.append("id", this.state.id);
        formdata.append("name", this.state.name);
        formdata.append("age", this.state.age);
        formdata.append("username", this.state.username);
        formdata.append("password", this.state.password);
        formdata.append("address", this.state.address);
        formdata.append("gender", this.state.gender);
        formdata.append("phone", this.state.phone);
        formdata.append("role", "ADMIN");
        formdata.append("email", this.state.email);
        formdata.append("avatar", this.state.avatar);
        if(this.state.file) {
            console.log('co update anh')
            formdata.append("imageFile", this.state.file, this.state.file.name);
        }else {
            console.log('ko update anh')
        }


        var requestOptions = {
            method: 'PUT',
            headers: myHeaders,
            body: formdata,
            redirect: 'follow'
        };

        try {
            let response = await fetch("http://localhost:8080/api/admin/account/"+this.state.id, requestOptions)
            if (response.ok) {
                let result = await response.json()
                console.log(result)
                let { history } = this.props
                history.replace('/admin/account')
            }
        } catch (error) {
            alert("Username đã tồn tại!")
            console.log(error)
        }


    }

    render() {
        return <>
            <span className="section">Thông tin tài khoản quản trị</span>
            <div className="field item form-group">
                <label className="col-form-label col-md-3 col-sm-3  label-align">Họ và tên<span className="required">*</span></label>
                <div className="col-md-6 col-sm-6">
                    <input onChange={this.setParams} value={this.state.name} className="form-control" name="name" required="required" />
                </div>
            </div>
            <div className="field item form-group">
                <label className="col-form-label col-md-3 col-sm-3  label-align">Tuổi<span className="required">*</span></label>
                <div className="col-md-6 col-sm-6">
                    <input onChange={this.setParams} value={this.state.age} className="form-control" name="age" type="text" />
                </div>
            </div>
            <div className="field item form-group">
                <label className="col-form-label col-md-3 col-sm-3  label-align">Tài khoản<span className="required">*</span></label>
                <div className="col-md-6 col-sm-6">
                    <input onChange={this.setParams} value={this.state.username} className="form-control" name="username" required="required" type="text" />
                </div>
            </div>
            <div className="field item form-group">
                <label className="col-form-label col-md-3 col-sm-3  label-align">Địa chỉ<span className="required">*</span></label>
                <div className="col-md-6 col-sm-6">
                    <input onChange={this.setParams} value={this.state.address} className="form-control" type="text" name="address" />
                </div>
            </div>
            <div className="field item form-group">
                <label className="col-form-label col-md-3 col-sm-3  label-align">Giới tính<span className="required">*</span></label>
                <div className="col-md-6 col-sm-6">
                    <select name="gender" value={this.state.gender} onChange={this.setParams}>
                            <option value="">----Select----</option>
                            <option value="Nam">Nam</option>
                            <option value="Nữ">Nữ</option>
                    </select>
                </div>
            </div>
            <div className="field item form-group">
                <label className="col-form-label col-md-3 col-sm-3  label-align">Số điện thoại<span className="required">*</span></label>
                <div className="col-md-6 col-sm-6">
                    <input onChange={this.setParams} value={this.state.phone} className="form-control" type="text" name="phone" />
                </div>
            </div>
            <div className="field item form-group">
                <label className="col-form-label col-md-3 col-sm-3  label-align">Email<span className="required">*</span></label>
                <div className="col-md-6 col-sm-6">
                    <input onChange={this.setParams} value={this.state.email} className="form-control" type="text" name="email" />
                </div>
            </div>
            <div className="field item form-group">
                <label className="col-form-label col-md-3 col-sm-3  label-align">Ảnh đại diện<span className="required">*</span></label>
                <div className="col-md-6 col-sm-6">
                    <img style={{ width: "80px" }} src={"http://localhost:4000/api/download/"+this.state.avatar} />
                    <input onChange={this.setFile} className="form-control" type="file" name="file" accept="image/*" />
                </div>
            </div>
            <div className="ln_solid">
                <div className="form-group">
                    <div className="col-md-6 offset-md-3">
                        <button type="button" onClick={this.editProduct} className="btn btn-primary">Cập nhật tài khoản</button>
                    </div>
                </div>
            </div>
        </>
    }

}

export default withRouter(EditAdmin)
