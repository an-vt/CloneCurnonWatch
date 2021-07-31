import React from 'react'
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link,
    Redirect
} from "react-router-dom";

export default class Bill extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            bills : [],
            search: "",
            status: false
        }
    }

    componentDidMount() {
        this.loadBill()
        console.log("1111")
    }

    loadBill = async () => {
        var myHeaders = new Headers();
        myHeaders.append("Authorization", "Bearer "+localStorage.getItem("accessToken"));
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
            let response = await fetch("http://localhost:4000/api/admin/bill/search", requestOptions)
            if (response.ok) {
                let result = await response.json()
                console.log(result)
                let listbills = this.state.bills.concat(result)
                this.setState({
                    bills: listbills
                })
            }
        } catch (error) {
            console.log('error', error)
        }
    }

    selectedId = (id) => {
        this.setState({
            selectedId: id
        })
    }

    reset = () => {
        this.setState({
            bills: [],
            search: ""
        }, this.loadBill)
    }

    deleleBill = async (id) => {
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
                let response = await fetch("http://localhost:4000/api/admin/bill/"+id, requestOptions)
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

    changeStatus = async (e) => {
        const id = e.target.parentElement.children[0].id
        const value = e.target.parentElement.children[0].value
        var myHeaders = new Headers();
        myHeaders.append("Authorization", "Bearer "+localStorage.getItem("accessToken"));
        myHeaders.append("Content-Type", "application/json");

        var raw = JSON.stringify({
            "status": value
        });

        var requestOptions = {
            method: 'PUT',
            headers: myHeaders,
            body: raw,
            redirect: 'follow'
        };

        try {
            let response = await fetch("http://localhost:4000/api/member/bill/"+id, requestOptions)
            if(response.ok) {
                console.log(response)
                this.reset()
            }
        } catch (error) {
            console.log('error',error)
        }
        
    }

    render() {
        return (
            <>  
                <div className="page-title">
                    <div className="title_left">
                        <h3>DANH SÁCH HÓA ĐƠN</h3>
                    </div>

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
                                            <TableBill data={this.state.bills} changeStatus={this.changeStatus} selectedId={this.selectedId} deleteId={this.deleleBill}/>
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

class TableBill extends React.Component {
    render() {
        return <table className="table table-striped table-bordered">
            <thead>
                <tr>
                    <td>Id</td>
                    <td>Người mua</td>
                    <td>Ngày mua</td>
                    <td>Tổng giá</td>
                    <td>Mã giảm giá</td>
                    <td>Phần trăm</td>
                    <td>Trạng thái</td>
                    <td>Thanh toán</td>
                    <td>Lựa chọn</td>
                    <td>Trạng thái</td>
                </tr>
            </thead>
            <tbody>
            {
                this.props.data.map(item => {
                    return <tr key={item._id}>
                        <td>{item._id}</td>
                        <td>{item.user.name}</td>
                        <td>{item.buyDate}</td>
                        <td>{item.priceTotal}</td>
                        <td>{item.coupon}</td>
                        <td>{item.couponPresent}</td>
                        <td>{item.status}</td>
                        <td>{item.pay}</td>
                        <td>
                            <button onClick={() => this.props.deleteId(item._id)}>Xóa</button>
                            <button><Link to={"/admin/bill/detail/"+item._id}>Chi tiết</Link></button>
                        </td>
                        <td>
                            <select id={item._id} value={item.status} onChange={this.props.changeStatus}>
                                <option value='Chưa xử lí'>Chưa xử lí</option>
                                <option value='Đã xử lí'>Đã xử lí</option>
                            </select>
                        </td>
                    </tr>
                })
            }
            </tbody>
        </table>
    }
}


class SearchBill extends React.Component {
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