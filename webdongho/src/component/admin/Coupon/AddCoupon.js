import React from 'react';
import { withRouter } from 'react-router-dom';

class AddCoupon extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            "code": "",
            "present": "",
        }
    }

    setParams = (event) => {
        this.setState({ [event.target.name]: event.target.value })
    }

    addCoupon = async () => {
        console.log("add name"+this.state.name)
        var myHeaders = new Headers();
        myHeaders.append("Authorization", "Bearer " + localStorage.getItem("accessToken"));
        myHeaders.append("Content-Type", "application/json");

        var raw = JSON.stringify({
            "code": this.state.code,
            "present": this.state.present
        });

        var requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: raw,
            redirect: 'follow'
        };

        try {
            let response = await fetch("http://localhost:4000/api/admin/coupon", requestOptions)
            if(response.ok) {
                let result = await response.json()
                console.log(result)
                console.log('Them thanh cong')
                let { history } = this.props;
                history.replace('/admin/coupon')
            }
        } catch (error) {
            console.log("err ",error)
            alert('Mã giảm giá đã tồn tại')
        }

    }

    render() {
        return (
            <>
                <span className="section">Thông tin Coupon</span>
                <div className="field item form-group">
                    <label className="col-form-label col-md-3 col-sm-3  label-align">Mã code<span className="required">*</span></label>
                    <div className="col-md-6 col-sm-6">
                        <input className="form-control" name="code" onChange={this.setParams} placeholder="Nhập mã code"/>
                        {/* <p></p> */}
                    </div>
                </div>
                <div className="field item form-group">
                    <label className="col-form-label col-md-3 col-sm-3  label-align">Phần trăm<span className="required">*</span></label>
                    <div className="col-md-6 col-sm-6">
                        <input className="form-control" name="present" onChange={this.setParams} placeholder="Nhập phần trăm"/>
                        {/* <p></p> */}
                    </div>
                </div>
                <div className="ln_solid">
                    <div className="form-group">
                        <div className="col-md-6 offset-md-3">
                            <button type="button" className="btn btn-primary" onClick={this.addCoupon}>Thêm</button>
                        </div>
                    </div>
                </div>
            </>
        )
    }
}

export default withRouter(AddCoupon)