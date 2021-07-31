import React from 'react';
import { useHistory, withRouter } from 'react-router-dom';

class AddAdmin extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            "name": "",
            "age": "",
            "username": "",
            "password": "",
            "address": "",
            "gender": "",
            "phone": "",
            "email": ""
        }
    }

    setParams = (event) => {
        this.setState({ [event.target.name]: event.target.value })
    }

    AddAdmin = async () => {
        console.log('state',this.state)
        var myHeaders = new Headers();
        myHeaders.append("Authorization", "Bearer " + localStorage.getItem("accessToken"));

        var formdata = new FormData();
        formdata.append("name", this.state.name);
        formdata.append("age", this.state.age);
        formdata.append("username", this.state.username);
        formdata.append("password", this.state.password);
        formdata.append("address", this.state.address);
        formdata.append("gender", this.state.gender);
        formdata.append("enabled", true);
        formdata.append("role", "ROLE_ADMIN");
        formdata.append("phone", this.state.phone);
        formdata.append("email", this.state.email);
        if (this.state.file) {
            formdata.append("file", this.state.file, this.state.file.name);
        }

        var requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: formdata,
            redirect: 'follow'
        };

        try {
            let response = await fetch("http://localhost:4000/api/admin/account", requestOptions)
            if(response.ok) {
                let result = response.json()
                console.log('add success')
                let { history } = this.props;
                history.replace('/admin/account')
            }
            if(response.status == 400){
                alert('Tài khoản đã tồn tại')
            }
            if(response.status == 401){
                alert('Tài khoản hoặc mật khẩu phải ít nhất 6 kí tự')
            }
        } catch (error) {
            console.log('error ',error)
        }

        // await fetch("http://localhost:4000/api/admin/account", requestOptions)
        //     .then(response => {
        //         if (response.ok) {
        //             return response.json()
        //         }
        //         throw new Error(response.status)
        //     })
        //     .then(result => {
        //         console.log(result)
        //         console.log("add successful")
        //         let { history } = this.props;
        //         history.replace('/admin/account')
        //     })
        //     .catch(error => {
        //         console.log('error', error)
        //         alert('Tài khoản đã tồn tại')
        //     });
    }

    setFile = (event) => {
        let file = event.target.files[0]
        if (file) {
            this.setState({
                file
            })
        }
    }

    render() {
        return (
            <>
                <span className="section">Thông tin tài khoản quản trị</span>
                <div className="field item form-group">
                    <label className="col-form-label col-md-3 col-sm-3  label-align">Họ và tên<span className="required">*</span></label>
                    <div className="col-md-6 col-sm-6">
                        <input onChange={this.setParams} className="form-control" name="name" placeholder="Nhập họ và tên" required="required" />
                        <span ></span>
                    </div>
                </div>
                <div className="field item form-group">
                    <label className="col-form-label col-md-3 col-sm-3  label-align">Tuổi<span className="required">*</span></label>
                    <div className="col-md-6 col-sm-6">
                        <input onChange={this.setParams} placeholder="Nhập tuổi" className="form-control" name="age" data-validate-length-range="5,15" type="text" /></div>
                </div>
                <div className="field item form-group">
                    <label className="col-form-label col-md-3 col-sm-3  label-align">Email<span className="required">*</span></label>
                    <div className="col-md-6 col-sm-6">
                        <input onChange={this.setParams} placeholder="Nhập email" className="form-control" name="email" required="required" type="email" /></div>
                </div>
                <div className="field item form-group">
                    <label className="col-form-label col-md-3 col-sm-3  label-align">Tài khoản<span className="required">*</span></label>
                    <div className="col-md-6 col-sm-6">
                        <input onChange={this.setParams} placeholder="Nhập tài khoản" className="form-control" type="text" name="username" /></div>
                </div>
                <div className="field item form-group">
                    <label className="col-form-label col-md-3 col-sm-3  label-align">Mật khẩu<span className="required">*</span></label>
                    <div className="col-md-6 col-sm-6">
                        <input onChange={this.setParams} placeholder="Nhập mật khẩu" className="form-control" type="password" name="password" />
                        <span ></span>
                    </div>
                </div>
                <div className="field item form-group">
                    <label className="col-form-label col-md-3 col-sm-3  label-align">Địa chỉ<span className="required">*</span></label>
                    <div className="col-md-6 col-sm-6">
                        <input onChange={this.setParams} placeholder="Nhập địa chỉ" className="form-control" type="text" name="address" /></div>
                </div>
                <div className="field item form-group">
                    <label className="col-form-label col-md-3 col-sm-3  label-align">Giới tính<span className="required">*</span></label>
                    <div className="col-md-6 col-sm-6">
                        <select name="gender" onChange={this.setParams}>
                            <option value="">----Select----</option>
                            <option value="Nam">Nam</option>
                            <option value="Nữ">Nữ</option>
                        </select>
                    </div>
                </div>
                <div className="field item form-group">
                    <label className="col-form-label col-md-3 col-sm-3  label-align">Số điện thoại<span className="required">*</span></label>
                    <div className="col-md-6 col-sm-6">
                        <input onChange={this.setParams} placeholder="Nhập số điện thoại" className="form-control" type="text" name="phone" required='required' /></div>
                </div>
                <div className="field item form-group">
                    <label className="col-form-label col-md-3 col-sm-3  label-align">Ảnh đại diện<span className="required">*</span></label>
                    <div className="col-md-6 col-sm-6">
                        <input className="form-control" onChange={this.setFile} on type="file" name="file" accept="image/*" /></div>
                </div>
                <div className="ln_solid">
                    <div className="form-group">
                        <div className="col-md-6 offset-md-3">
                            <button type="button" onClick={this.AddAdmin} className="btn btn-primary">Thêm tài khoản</button>
                        </div>
                    </div>
                </div>
            </>
        )
    }
}

export default withRouter(AddAdmin)