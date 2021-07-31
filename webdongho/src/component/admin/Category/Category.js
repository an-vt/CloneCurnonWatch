import React from 'react'
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link,
    Redirect
} from "react-router-dom";

export default class Category extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            categorys: [],
            search: ''
        }
    }

    componentDidMount() {
        console.log("1111")
        this.loadCategory()
    }

    // componentDidUpdate() {
    //     console.log("1111")
    //     this.loadCategory()
    // }

    loadCategory = async () => {
        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");

        var raw = JSON.stringify({
            "search": this.state.search,
            "page": "0",
            "limit": "100"
        });

        var requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: raw,
            redirect: 'follow'
        };

        try {
            let response = await fetch("http://localhost:8080/api/category/search", requestOptions)
            if (response.ok) {
                let result = await response.json()

                this.setState({
                    categorys: result.data
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
        this.setState(this.loadCategory)
    }

    deleteCategory = async (id) => {
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
                let response = await fetch("http://localhost:8080/api/admin/category/"+id, requestOptions)
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
        this.setState({ search: value }, this.loadCategory)
    }

    render() {
        return (
            <>
                <div className="page-title">
                    <div className="title_left">
                        <h3>DANH SÁCH DANH MỤC SẢN PHẨM</h3>
                    </div>

                    <SearchCategory search={this.search} />
                </div>

                <div className="clearfix"></div>

                <div className="row" >
                    <div className="col-md-12 col-sm-12 ">
                        <div className="x_panel">
                            <div className="x_title">
                                <Link to="/admin/category/add"><button type="button">Thêm loại sản phẩm</button></Link>
                                <div className="clearfix"></div>
                            </div>
                            <div className="x_content">
                                <div className="row">
                                    <div className="col-sm-12">
                                        <div className="card-box table-responsive">
                                            <TableCategory data={this.state.categorys} selectedId={this.selectedId} deleteId={this.deleteCategory} />
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
                    <td>Tên loại sản phẩm</td>
                    <td>Lựa chọn</td>
                </tr>
            </thead>
            <tbody>
                {
                    this.props.data.map(item => {
                        return <tr key={item.id}>
                            <td>{item.id}</td>
                            <td>{item.name}</td>
                            <td>
                                <button type="button" ><Link to={"/admin/category/edit/" + item.id}>Sửa</Link></button>
                                <button onClick={() => this.props.deleteId(item.id)}>Xóa</button>
                            </td>
                        </tr>
                    })
                }
            </tbody>
        </table>
    }
}


class SearchCategory extends React.Component {
    render() {
        return <>
            <div className="title_right">
                <div className="col-md-5 col-sm-5 col-xs-12 form-group pull-right top_search">
                    <form className="input-group">
                        <input type="text" name="search" className="form-control" placeholder="Tìm kiếm" onChange={this.props.search} />
                        {/* <span className="input-group-btn">
                            <button className="btn btn-secondary" type="submit">Tìm kiếm</button>
                        </span> */}
                    </form>
                </div>
            </div>
        </>
    }
}

// if (window.confirm('Bạn có chắc chắn muốn xóa không ?')) {
// } else {
//     console.log('không xóa.');
// }