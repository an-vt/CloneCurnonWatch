import React from 'react'
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link,
    Redirect
} from "react-router-dom";

export default class User extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            users: [],
            search: ''
        }
    }

    componentDidMount() {
        console.log("1111")
        this.loadUsers()
    }

    loadUsers = async () => {
        var myHeaders = new Headers();
        myHeaders.append("Authorization", "Bearer " + localStorage.getItem("accessToken"));
        myHeaders.append("Content-Type", "application/json");

        var raw = JSON.stringify({
            "search": this.state.search,
            "start": "0",
            "length": "100"
        });

        var requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: raw,
            redirect: 'follow'
        };

        try {
            let response = await fetch("http://localhost:8080/api/admin/user/search", requestOptions)
            if (response.ok) {
                let result = await response.json()
                let { data } = result
                console.log(data)
                let users = this.state.users.concat(data)
                this.setState({
                    users
                })
            }
        } catch (error) {
            console.log('error', error)
        }
    }

    reset = () => {
        this.setState({ users: [] }, this.loadUsers)
    }

    deleteUser = async (id) => {
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
                let response = await fetch("http://localhost:8080/api/admin/user/"+id, requestOptions)
                if(response.ok) {
                    console.log("delete successful")
                    this.reset()
                }
            } catch (error) {
                console.log("error "+error)
            }
        } else {
            console.log('không xóa.');
        }
        
    }

    search = (e) => {
        let value = e.target.value
        this.setState({  users: [],search: value }, this.loadUsers)
    }

    enabled = async (e) => {
        console.log('1')
        const id = e.target.id
        const value = e.target.value === 'Có' ? true : false;

        var myHeaders = new Headers();
        myHeaders.append("Authorization", "Bearer "+localStorage.getItem('accessToken'));

        var requestOptions = {
            method: 'GET',
            headers: myHeaders,
            redirect: 'follow'
        };

        try {
            let response = await fetch("http://localhost:8080/api/admin/user/update/"+id+"/"+value, requestOptions)
            if(response.ok) {
                console.log('update successful')
                this.reset()
            }
        } catch (error) {
            console.log('error', error)
        }
    }

    render() {
        return (
            <>  
                <div className="page-title">
                    <div className="title_left">
                        <h3>DANH SÁCH TÀI KHOẢN NGƯỜI DÙNG</h3>
                    </div>

                    <SearchProduct search={this.search} />
                </div>

                <div className="clearfix"></div>

                <div className="row" >
                    <div className="col-md-12 col-sm-12 ">
                        <div className="x_panel">
                            <div className="x_title">
                                <div className="clearfix"></div>
                            </div>
                            <div className="x_content">
                                <div className="row">
                                    <div className="col-sm-12">
                                        <div className="card-box table-responsive">
                                            <TableCategory data={this.state.users} deleteId={this.deleteUser} enabled={this.enabled}/>
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

class TableCategory extends React.Component {
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
                    <td>Kích hoạt</td>
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
                        <td>{item.enabled ? 'Có' : 'Không'}</td>
                        <td>{item.username}</td>
                        <td>{item.password}</td>
                        <td>{item.address}</td>
                        <td>{item.gender}</td>
                        <td>{item.phone}</td>
                        <td>{item.email}</td>
                        <td><img width="100px" src={'http://localhost:8080/api/download/'+item.avatar} /></td>
                        <td>
                            <button onClick={() => this.props.deleteId(item.id)}>Delete</button>
                        </td>
                        <td>
                            <select id={item.id} value={item.enabled ? 'Có' : 'Không'} onChange={this.props.enabled}>
                                <option value='Có'>Có</option>
                                <option value='Không'>Không</option>
                            </select>
                        </td>
                    </tr>
                })
            }
            </tbody>
        </table>
    }
}


class SearchProduct extends React.Component {
    render() {
        return <>
            <div className="title_right">
                <div className="col-md-5 col-sm-5 col-xs-12 form-group pull-right top_search">
                    <form className="input-group">
                        <input type="text" name="search" className="form-control" placeholder="Tìm kiếm" onChange={this.props.search}/>
                    </form>
                </div>
            </div>
        </>
    }
} 