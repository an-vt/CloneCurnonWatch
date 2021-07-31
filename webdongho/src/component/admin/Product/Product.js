import React from 'react'
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link,
    Redirect
} from "react-router-dom";
import Category from '../Category/Category';

export default class Product extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            products: [],
            'search': ''
        }
    }

    componentDidMount() {
        console.log("1111")
        this.loadProduct()
    }

    loadProduct = async () => {
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
            let response = await fetch("http://localhost:8080/api/admin/product/search", requestOptions)
            if (response.ok) {
                let result = await response.json()
                const { data } = result
                console.log(data)
                this.setState({
                    products: data
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
            search: ""
        }, this.loadProduct)
    }

    deleteProduct = async (id) => {
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
                let response = await fetch("http://localhost:8080/api/admin/product/"+id, requestOptions)
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
        let value = e.target.value.trim()
        this.setState({ products: [] ,search: value }, this.loadProduct)
    }

    render() {
        return (
            <>  
                <div className="page-title">
                    <div className="title_left">
                        <h3>DANH SÁCH SẢN PHẨM</h3>
                    </div>

                    <SearchProduct search={this.search} />
                </div>

                <div className="clearfix"></div>

                <div className="row" >
                    <div className="col-md-12 col-sm-12 ">
                        <div className="x_panel">
                            <div className="x_title">
                                <Link to="/admin/product/add"><button type="button">Thêm sản phẩm</button></Link>
                                <div className="clearfix"></div>
                            </div>
                            <div className="x_content">
                                <div className="row">
                                    <div className="col-sm-12">
                                        <div className="card-box table-responsive">
                                            <TableCategory data={this.state.products} selectedId={this.selectedId} deleteId={this.deleteProduct}/>
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
                    <td>Tên sản phẩm</td>
                    <td>Số lượng</td>
                    <td>Giá</td>
                    <td>Mô tả</td>
                    <td>Ảnh sản phẩm</td>
                    <td>Danh mục</td>
                    <td>Lựa chọn</td>
                </tr>
            </thead>
            <tbody>
            {
                this.props.data.map(item => {
                    return <tr key={item.id}>
                        <td>{item.id}</td>
                        <td>{item.name}</td>
                        <td>{item.quantity}</td>
                        <td>{item.price}</td>
                        <td>{item.description}</td>
                        <td><img width="80px" src={"http://localhost:8080/api/download/"+item.image} /></td>
                        <td>{item.categoryDTO.name}</td>
                        <td>
                            <button type="button" ><Link to={"/admin/product/edit/"+item.id}>Sửa</Link></button>
                            <button onClick={() => this.props.deleteId(item.id)}>Xóa</button>
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
                        {/* <span className="input-group-btn">
                            <button className="btn btn-secondary" type="submit">Tìm kiếm</button>
                        </span> */}
                    </form>
                </div>
            </div>
        </>
    }
} 