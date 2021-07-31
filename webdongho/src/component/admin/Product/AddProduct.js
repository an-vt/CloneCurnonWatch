import React from 'react';
import { useHistory, withRouter } from 'react-router-dom';

class AddProduct extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            "name": "",
            "quantity": "",
            "price": "",
            "description": "",
            "categoryDTO.id": "",
            "file": null,
            categories: [],
            search: ""
        }
    }

    setParams = (event) => {
        this.setState({ [event.target.name]: event.target.value })
    }

    componentDidMount() {
        this.loadCategory()
    }

    loadCategory = async () => {
        var myHeaders = new Headers();
        myHeaders.append("Authorization", "Bearer "+localStorage.getItem('accessToken'));
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
            let response = await fetch("http://localhost:8080/api/admin/category/search", requestOptions)
            if (response.ok) {
                let result = await response.json()
                let { data } = result 
                this.setState({
                    categories: data
                })
            }
        } catch (error) {
            console.log('error', error)
        }
    }

    AddProduct = async () => {
        var myHeaders = new Headers();
        myHeaders.append("Authorization", "Bearer "+localStorage.getItem("accessToken"));

        var formdata = new FormData();
        formdata.append("name", this.state.name);
        formdata.append("quantity", this.state.quantity);
        formdata.append("price", this.state.price);
        formdata.append("description", this.state.description);
        if(this.state.file) {
            formdata.append("imageFile", this.state.file ,this.state.file.name);
        }
        formdata.append("categoryDTO.id", this.state['categoryDTO.id']);

        var requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: formdata,
            redirect: 'follow'
        };

        console.log('product' ,this.state)

        try {
            let response = await fetch("http://localhost:8080/api/admin/product", requestOptions)
            if(response.ok) {
                let result = response.json()
                console.log(result)
                let { history } = this.props;
                history.replace('/admin/product')
            }
            if(response.status == 400){
                alert('Sản phẩm đã tồn tại')
            }
            if(response.status == 401){
                alert('Bạn phải chọn danh mục sản phẩm')
            }
        } catch (error) {
            console.log('error', error)
        }
    }

    setFile = (event) => {
        let file = event.target.files[0]
        console.log('img P' ,file)
        if (file) {
            this.setState({
                file
            })
        }
    }

    render() {
        return (
            <>
                <span className="section">Thông tin sản phẩm</span>
                <div className="field item form-group">
                    <label className="col-form-label col-md-3 col-sm-3  label-align">Tên sản phẩm<span className="required">*</span></label>
                    <div className="col-md-6 col-sm-6">
                        <input onChange={this.setParams} className="form-control" name="name" required="required" />
                    </div>
                </div>
                <div className="field item form-group">
                    <label className="col-form-label col-md-3 col-sm-3  label-align">Số lượng<span className="required">*</span></label>
                    <div className="col-md-6 col-sm-6">
                        <input onChange={this.setParams} className="form-control" name="quantity" type="text" />
                    </div>
                </div>
                <div className="field item form-group">
                    <label className="col-form-label col-md-3 col-sm-3  label-align">Giá<span className="required">*</span></label>
                    <div className="col-md-6 col-sm-6">
                        <input onChange={this.setParams} className="form-control" name="price" required="required" type="text" />
                    </div>
                </div>
                <div className="field item form-group">
                    <label className="col-form-label col-md-3 col-sm-3  label-align">Mô tả<span className="required">*</span></label>
                    <div className="col-md-6 col-sm-6">
                        <input onChange={this.setParams} className="form-control" type="text" name="description" />
                    </div>
                </div>
                <div className="field item form-group">
                    <label className="col-form-label col-md-3 col-sm-3  label-align">Ảnh sản phẩm<span className="required">*</span></label>
                    <div className="col-md-6 col-sm-6">
                        <input onChange={this.setFile} className="form-control" type="file" name="file" accept="image/*" />
                    </div>
                </div>
                <div className="field item form-group">
                    <label className="col-form-label col-md-3 col-sm-3  label-align">Loại sản phẩm<span className="required">*</span></label>
                    <div className="col-md-6 col-sm-6">
                        <select name="categoryDTO.id" onChange={this.setParams}>
                            <option>---Select--</option>
                            {this.state.categories.map(category => {
                                return <option key={category.id} value={category.id}>{category.name}</option>
                            })}
                        </select>
                    </div>
                </div>
                <div className="ln_solid">
                    <div className="form-group">
                        <div className="col-md-6 offset-md-3">
                            <button type="button" onClick={this.AddProduct} className="btn btn-primary">Thêm sản phẩm</button>
                        </div>
                    </div>
                </div>
            </>
        )
    }
}

export default withRouter(AddProduct)