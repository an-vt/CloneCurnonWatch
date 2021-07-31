import React from 'react'
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link,
    Redirect,
    withRouter
} from "react-router-dom";

class BillDetail extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            billDetails : [],
            search: ""
        }
    }

    componentDidMount() {
        this.LoadBill()
        console.log("1111")
    }

    LoadBill = async () => {
        let { match } = this.props;
        let id = match.params.id
        console.log(id)
        var myHeaders = new Headers();
        myHeaders.append("Authorization", "Bearer "+localStorage.getItem("accessToken"));

        var requestOptions = {
            headers: myHeaders,
            method: 'GET',
            redirect: 'follow'
        };

        try {
            let response = await fetch("http://localhost:4000/api/admin/bill/detail/"+id, requestOptions)
            if (response.ok) {
                let result = await response.json()
                console.log('billdetail', result)
                let listbills = this.state.billDetails.concat(result) 
                this.setState({
                    billDetails: listbills
                })
            }
        } catch (error) {
            console.log('error', error)
        }
    }

    reset = () => {
        this.setState({
            billDetails: []
        }, this.LoadBill)
    }

    render() {
        return (
            <>  
                <div className="page-title">
                    <div className="title_left">
                        <h3>CHI TIẾT HÓA ĐƠN</h3>
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
                                            <TableBill data={this.state.billDetails}/>
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
                    <td>Tổng giá</td>
                    <td>Số lượng</td>
                    <td>Id hóa đơn</td>
                    <td>Sản phẩm</td>
                </tr>
            </thead>
            <tbody>
            {
                this.props.data.map(item => {
                    return <tr key={item._id}>
                        <td>{item._id}</td>
                        <td>{item.unitPrice}</td>
                        <td>{item.quantity}</td>
                        <td>{item.idBill}</td>
                        <td>{item.product.name}</td>
                    </tr>
                })
            }
            </tbody>
        </table>
    }
}

export default withRouter(BillDetail)