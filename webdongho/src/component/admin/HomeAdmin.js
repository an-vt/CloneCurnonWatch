import React, { useEffect } from 'react'
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link,
    Redirect
} from "react-router-dom";

import '../../assets/admin/vendors/bootstrap/dist/css/bootstrap.min.css'
import '../../assets/admin/vendors/font-awesome/css/font-awesome.min.css'
import '../../assets/admin/vendors/nprogress/nprogress.css'
import '../../assets/admin/vendors/iCheck/skins/flat/green.css'
import '../../assets/admin/vendors/bootstrap-progressbar/css/bootstrap-progressbar-3.3.4.min.css'
import '../../assets/admin/vendors/jqvmap/dist/jqvmap.min.css'
import '../../assets/admin/vendors/bootstrap-daterangepicker/daterangepicker.css'
import '../../assets/admin/build/css/custom.min.css'
import '../../assets/admin/build/css/style.css'

import TopNav from './Nav/TopNav'
import SideBarFooter from './SideBar/SideBarFooter'
import Footer from './Footer/Footer'
import SideBarHeader from './SideBar/SideBarHeader'
import Category from './Category/Category';
import AddCategory from './Category/AddCategory';
import EditCategory from './Category/EditCategory';
import Product from './Product/Product';
import AddProduct from './Product/AddProduct';
import EditProduct from './Product/EditProduct';
import Bill from './Bill/Bill';
import BillDetail from './Bill/BillDetail';
import User from './User/User';
import Admin from './Admin/Admin';
import AddAdmin from './Admin/AddAdmin';
import EditAdmin from './Admin/EditAdmin';
import Coupon from './Coupon/Coupon';
import AddCoupon from './Coupon/AddCoupon';
import EditCoupon from './Coupon/EditCoupon';


export default class HomeAdmin extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            accessToken : localStorage.getItem('accessToken')
        }
    }

    componentDidMount() {
        console.log('111')
    }

    render() {
        return (
        <>
            <body className="nav-md">
                <div className="container body">
                    <div className="main_container">
                        <div className="col-md-3 left_col">
                            <div className="left_col scroll-view">
                                <SideBarHeader />
                                <br />
                                <div id="sidebar-menu" className="main_menu_side hidden-print main_menu">
                                    <div className="menu_section">
                                        <h3>Chung</h3>
                                        <ul className="nav side-menu">
                                            <li>
                                                <Link to="/admin/category">
                                                    <i className="fa fa-home"></i> Quản lí danh mục sản phẩm
                                                </Link>
                                            </li>
                                            <li>
                                                <Link to="/admin/product">
                                                    <a><i className="fa fa-edit"></i> Quản lí sản phẩm</a>
                                                </Link>
                                            </li>
                                            <li>
                                                <Link to="/admin/bill">
                                                    <a><i className="fa fa-edit"></i> Quản lí hóa đơn</a>
                                                </Link>
                                            </li>
                                            <li>
                                                <Link to="/admin/user">
                                                    <a><i className="fa fa-table"></i> Quản lí tài khoản người dùng</a>
                                                </Link>
                                            </li>
                                            <li>
                                                <Link to="/admin/account">
                                                    <a><i className="fa fa-table"></i> Quản lí tài khoản quản trị</a>
                                                </Link>
                                            </li>
                                            <li>
                                                <Link to="/admin/coupon">
                                                    <a><i className="fa fa-table"></i> Quản lí mã khuyến mãi</a>
                                                </Link>
                                            </li>
                                        </ul>
                                    </div>

                                </div>
                                {/* /sidebar menu */}

                                <SideBarFooter />
                            </div>
                        </div>
                        <TopNav />
                        <div className="right_col" role="main">
                            <div className="row">
                                <div className="col-md-12 col-sm-12">
                                    <div className="x_panel">
                                        <div className="x_content">
                                            <Switch>
                                                <Route path="/admin/category/add">
                                                    <AddCategory />
                                                </Route>
                                                <Route path="/admin/category/edit/:id">
                                                    <EditCategory />
                                                </Route>
                                                <Route path="/admin/category">
                                                    <Category />
                                                </Route>

                                                <Route path="/admin/product/add">
                                                    <AddProduct />
                                                </Route>
                                                <Route path="/admin/product/edit/:id">
                                                    <EditProduct />
                                                </Route>
                                                <Route path="/admin/product">
                                                    <Product />
                                                </Route>
                                                
                                                <Route path="/admin/bill/detail/:id">
                                                    <BillDetail />
                                                </Route>
                                                <Route path="/admin/bill">
                                                    <Bill />
                                                </Route>

                                                <Route path="/admin/user">
                                                    <User />
                                                </Route>

                                                <Route path="/admin/account/add">
                                                    <AddAdmin />
                                                </Route>
                                                <Route path="/admin/account/edit/:id">
                                                    <EditAdmin />
                                                </Route>
                                                <Route path="/admin/account">
                                                    <Admin />
                                                </Route>

                                                <Route path="/admin/coupon/add">
                                                    <AddCoupon />
                                                </Route>
                                                <Route path="/admin/coupon/edit/:id">
                                                    <EditCoupon />
                                                </Route>
                                                <Route path="/admin/coupon">
                                                    <Coupon />
                                                </Route>
                                            </Switch>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <Footer />
                        </div>
                    </div>
                </div>
            </body>
        </>
        )
    }
}