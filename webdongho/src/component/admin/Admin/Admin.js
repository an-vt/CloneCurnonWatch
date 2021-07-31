import React from 'react'
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link,
    Redirect
} from "react-router-dom";

export default class Admin extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            admins: [],
            search: ''
        }
    }

    componentDidMount() {
        this.loadAdmin()
        console.log("1111")
    }

    loadAdmin = async () => {
        var myHeaders = new Headers();
        myHeaders.append("Authorization", "Bearer " + localStorage.getItem("accessToken"));
        myHeaders.append("Content-Type", "application/json");

        var raw = JSON.stringify({
            "search": this.state.search
        });

        var requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: raw,
            redirect: 'follow'
        };

        try {
            let response = await fetch("http://localhost:8080/api/admin/account/search", requestOptions)
            if (response.ok) {
                let result = await response.json()
                console.log(result)
                let admins = this.state.admins.concat(result.data)
                await this.setState({
                    admins
                })
                console.log(this.state.admins)
            }
        } catch (error) {
            console.log('error', error)
        }
    }

    reset = () => {
        this.setState({ admins: [] }, this.loadAdmin)
    }

    deleteAdmin = async (id) => {
        if (window.confirm('Bạn có chắc chắn muốn xóa không ?')) {
            
            console.log("delete "+id)
            var myHeaders = new Headers();
            myHeaders.append("Authorization", "Bearer "+localStorage.getItem("accessToken"));
    
            var requestOptions = {
                method: 'DELETE',
                headers: myHeaders,
                redirect: 'follow'
            };
    
            try {
                let response = await fetch("http://localhost:8080/api/admin/account/"+id, requestOptions)
                if(response.ok) {
                    console.log("delete successful")
                    this.reset()
                }
            } catch (error) {
                console.log("error "+error)
            }
        } else {
            // Do nothing!
            console.log('không xóa.');
        }
        
    }

    search = (e) => {
        let value = e.target.value
        this.setState({  admins: [],search: value }, this.loadAdmin)
    }

    render() {
        return (
            <>  
                <div className="page-title">
                    <div className="title_left">
                        <h3>DANH SÁCH TÀI KHOẢN QUẢN TRỊ</h3>
                    </div>

                    <SearchAdmin search={this.search} />
                </div>

                <div className="clearfix"></div>

                <div className="row" >
                    <div className="col-md-12 col-sm-12 ">
                        <div className="x_panel">
                            <div className="x_title">
                            <Link to="/admin/account/add"><button type="button">Thêm tài khoản quản trị</button></Link>
                                <div className="clearfix"></div>
                            </div>
                            <div className="x_content">
                                <div className="row">
                                    <div className="col-sm-12">
                                        <div className="card-box table-responsive">
                                            <TableAdmin data={this.state.admins} deleteId={this.deleteAdmin}/>
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
}

class TableAdmin extends React.Component {
    render() {
        return <table className="table table-striped table-bordered">
            <thead>
                <tr>
                    <td>Id</td>
                    <td>Tên</td>
                    <td>Tuổi</td>
                    <td>Vai trò</td>
                    <td>Được kích hoạt</td>
                    <td>Tài khoản</td>
                    <td>Mật khẩu</td>
                    <td>Địa chỉ</td>
                    <td>Giới tính</td>
                    <td>Số điện thoại</td>
                    <td>email</td>
                    <td>Ảnh đại diện</td>
                    <td>Lựa chọn</td>
                </tr>
            </thead>
            <tbody>
            {
                this.props.data.map(item => {
                    return <tr key={item.id}>
                        <td>{item.id}</td>
                        <td>{item.name}</td>
                        <td>{item.age}</td>
                        <td>{item.role}</td>
                        <td>{item.enabled ? "Có" : "Không"}</td>
                        <td>{item.username}</td>
                        <td>{item.password}</td>
                        <td>{item.address}</td>
                        <td>{item.gender}</td>
                        <td>{item.phone}</td>
                        <td>{item.email}</td>
                        <td><img width="100px" src={'http://localhost:8080/api/download/'+item.avatar} /></td>
                        <td>
                            <button type="button" ><Link to={"/admin/account/edit/"+item.id}>Sửa</Link></button>
                            <button onClick={() => this.props.deleteId(item.id)}>Xóa</button>
                        </td>
                    </tr>
                })
            }
            </tbody>
        </table>
    }
}


class SearchAdmin extends React.Component {
    render() {
        return <>
            <div className="title_right">
                <div className="col-md-5 col-sm-5 col-xs-12 form-group pull-right top_search">
                    <form className="input-group">
                        <input type="text" name="search" className="form-control" placeholder="Tìm kiếm" onChange={this.props.search}/>
                        {/* <span className="input-group-btn">
                            <button className="btn btn-secondary" type="submit">Tìm kiếm</button>
                        </span> */}
                    </form>
                </div>
            </div>
        </>
    }
} 