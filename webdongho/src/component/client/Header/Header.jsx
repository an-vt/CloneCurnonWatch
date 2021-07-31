import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import handleHover from '../../../assets/client/js/script'

Header.propTypes = {
    carts :PropTypes.array,
    onDeleteCartClick :PropTypes.func,
    isLogin :PropTypes.bool,
    onLogout :PropTypes.func
};

Header.defaultProps = {
    carts: [],
    onDeleteCartClick: null,
    isLogin: false,
    onLogout: null
};

function Header(props) {
    const { carts ,onDeleteCartClick ,isLogin ,onLogout } = props
    let [totalPrice ,setTotalPrice] = useState(0)
    //productList used to search
    let [productList ,setProductList] = useState([])
    let [inputSearch ,setInputSearch] = useState('')

    //load file javascript intend for handle sub nav headeer
    useEffect(() => {
        function loadHandleHoverSubNav() {
            handleHover()
        }

        loadHandleHoverSubNav()
    })

    //get productList when search
    useEffect(() => {
        async function getProducts() {
            var myHeaders = new Headers();
            myHeaders.append("Content-Type", "application/json");

            var raw = JSON.stringify({
                "search": inputSearch,
                "page": "1",
                "limit": "100"
            });
        
            var requestOptions = {
                method: 'POST',
                headers: myHeaders,
                body: raw,
                redirect: 'follow'
            };

            try {
                let response = await fetch("http://localhost:8080/api/product/search", requestOptions)
                if (response.ok) {
                    let result = await response.json()
                    const { data } = result
                    setProductList(data)
                }
            } catch (error) {
                console.log('error', error)
            }
        }

        getProducts()
    } ,[inputSearch])

    function handleDeleteCartClick(event){
        if(onDeleteCartClick) {
            onDeleteCartClick(event)
        }
    }

    let logout = (event) => {
        event.preventDefault()
        localStorage.removeItem('accessTokenClient')
        if(onLogout) {
            onLogout()
        }
    }

    let onSearch = (e) => {
        setInputSearch(e.target.value)
    } 

    //change quantity item in cart
    let handleChangeQuantity = (event) => {
        console.log('click')
        let quantity = event.target.value
        let idProduct = event.target.previousElementSibling.textContent
        carts.forEach((cartItem ,index) => {
            if(idProduct == cartItem.id) {
                cartItem.quantity = parseInt(quantity)
            }
        })

        localStorage.setItem('cart' ,JSON.stringify(carts));

        //get totalPrice
        let total = carts.reduce((initValue ,cartItem ,index) => {
            return initValue + ( parseInt(cartItem.price) * parseInt(cartItem.quantity) )
        } ,0)
        //change totalPrice when quantity item change
        setTotalPrice(total)
    }

    return (
        <div className="header">
            <div className="header-topbar">
                <div className="header-left">
                    <nav className="header-left-nav">
                        <ul className="header-left__list">
                            <li className="header-left__item">ĐỒNG HỒ NAM
                                <div className="header-left-watches">
                                    <div className="header-left-body">
                                        <div className="header-categoryList">
                                            <p className="categoryList-heading">Khám phá</p>
                                            <ul className="categoryList-list">
                                                <li className="categoryList-item hover">Đồng hồ nam</li>
                                                <li className="categoryList-item">On Sale</li>
                                            </ul>
                                        </div>
                                        <div className="header-left-body-content active">
                                            <div className="category-male">
                                                <div className="male-album col-1">
                                                    <p className="male-album-heading">MUA THEO BỘ SƯU TẬP</p>
                                                    <div className="male-album-wrap">
                                                        <div className="album-item col-2">
                                                            <img src="/imgClient/Kashmir_2000px_1x1.png" alt="" className="album-item-img" />
                                                            <p className="album-item-name">KASHMIR</p>
                                                        </div>
                                                        <div className="album-item col-2">
                                                            <img src="/imgClient/Kashmir_2000px_1x1.png" alt="" className="album-item-img" />
                                                            <p className="album-item-name">KASHMIR</p>
                                                        </div>
                                                        <div className="album-item col-2">
                                                            <img src="/imgClient/Kashmir_2000px_1x1.png" alt="" className="album-item-img" />
                                                            <p className="album-item-name">KASHMIR</p>
                                                        </div>
                                                        <div className="album-item col-2">
                                                            <img src="/imgClient/Kashmir_2000px_1x1.png" alt="" className="album-item-img" />
                                                            <p className="album-item-name">KASHMIR</p>
                                                        </div>
                                                        <div className="album-item col-2">
                                                            <img src="/imgClient/Kashmir_2000px_1x1.png" alt="" className="album-item-img" />
                                                            <p className="album-item-name">KASHMIR</p>
                                                        </div>
                                                        <div className="album-item col-2">
                                                            <img src="/imgClient/Kashmir_2000px_1x1.png" alt="" className="album-item-img" />
                                                            <p className="album-item-name">KASHMIR</p>
                                                        </div>
                                                        <div className="album-item col-2">
                                                            <img src="/imgClient/Kashmir_2000px_1x1.png" alt="" className="album-item-img" />
                                                            <p className="album-item-name">KASHMIR</p>
                                                        </div>
                                                    </div>
                                                    <a href className="male-album-see-all">Xem tất cả <i className="ti-arrow-right" /></a>
                                                </div>
                                                <div className="male-newArrival col-1">
                                                    <a href className="male-newArrival-link">
                                                        <img src="/imgClient/FuturaNewArrival.jpg" alt="" className="male-newArrival-img" />
                                                        <div className="male-newArrival-link-wrap">
                                                            <p className="male-newArrival-link-text">New Arrivals
                                                            </p>
                                                            <span><i className="ti-arrow-right male-newArrival-icon" /></span>
                                                        </div>
                                                    </a>
                                                </div>
                                                <div className="male-bestSeller col-1">
                                                    <a href className="male-bestSeller-link">
                                                        <img src="/imgClient/MenBestSeller.jpg" alt="" className="male-img" />
                                                        <div className="male-bestSeller-link-wrap">
                                                            <p className="male-bestSeller-link-text">Men's Best Sellers
                                                            </p>
                                                            <span><i className="ti-arrow-right male-bestSeller-icon" /></span>
                                                        </div>
                                                    </a>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="header-left-body-content">
                                            <div className="onsale">
                                                <div className="onsale-picture">
                                                    <img src="/imgClient/sale_menu_image_b80d63f0c8.jpg" alt="" className="onsale-img" />
                                                </div>
                                                <div className="onsale-sale">
                                                    <p className="onsale-sale-text">
                                                        <span>giảm 20%</span><br />cho đồng hồ và phụ kiện
                                                    </p>
                                                    <div className="onsale-sale-wrap">
                                                        <a href className="onsale-sale-link">MEM SALE</a>
                                                        <a href className="onsale-sale-link">WOMEN SALE</a>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </li>
                            <li className="header-left__item">PHỤ KIỆN</li>
                            <li className="header-left__item">THƯƠNG HIỆU</li>
                        </ul>
                    </nav>
                </div>
                <div className="header-logo">
                    <Link to="/">
                        <a className="header-logo__link">
                            <img src="/imgClient/logo-mWb.svg" alt="" className="header-logo__img" />
                        </a>
                    </Link>
                </div>
                <div className="header-right">
                    <nav className="header-right-nav">
                        <ul className="header-right__list">
                            <li className="header-right__item header-right__account">
                                <span className="header-right__account-text">TÀI KHOẢN</span>
                                <ul className="header-account">
                                    {isLogin ? 
                                    (
                                        <>
                                            <li className="nav-account__item">
                                                <a className="nav-account__link-info" >THÔNG TIN</a>
                                            </li>
                                            <li className="nav-account__item">
                                                <a className="nav-account__link-logout" onClick={ logout }>ĐĂNG XUẤT</a>
                                            </li>
                                        </>
                                    ) :
                                    (
                                        <>
                                            <li className="nav-account__item">
                                                <Link to="/login" className="nav-account__link-login">ĐĂNG NHẬP</Link>
                                            </li>
                                            <li className="nav-account__item" >
                                                <Link to="/register" className="nav-account__link-register">ĐĂNG KÝ</Link>
                                            </li>
                                        </>
                                    )
                                    }
                                </ul>
                            </li>
                            <li className="header-right__item">
                                <label htmlFor="header-checkbox" className="header-right__lable">
                                    <span>GIỎ HÀNG</span>
                                    <i className="header-right__icon-bag ti-bag" />
                                    {carts.length > 0 ? <span class="cart-quantity">{carts.reduce((initValue ,cartItem) => { return initValue+cartItem.quantity } ,0) }</span> : ''}
                                </label>
                                <input type="checkbox" hidden id="header-checkbox" className="header-checkbox" />
                                <label htmlFor="header-checkbox" className="header__overlay" />
                                <div className="cart">
                                    <div className="cart-header">
                                        <h3 className="cart-header__heading">GIỎ HÀNG CỦA BẠN</h3>
                                        <label htmlFor="header-checkbox" className="cart-header__exit">
                                            <i className="cart-header__exit-icon ti-close" />
                                        </label>
                                    </div>
                                    {/* No cart : cart-content-empty */}
                                    <div className="cart-content">
                                        <div className="cart-content-wrap">
                                            <h3 className="cart-content__status">Hiện tại chưa có sản phẩm nào trong giỏ
                                                hàng của bạn</h3>
                                            <button className="cart-content__btn">Tiếp tục mua sắm</button>
                                            <ul className="cart-productList">
                                                {carts.map(cartItem => {
                                                    console.log(cartItem)
                                                    return (
                                                        <li key={cartItem.id} className="cart-productList-item">
                                                            <div className="cart-productList-picture">
                                                                <img className="cart-productList-img" src={"http://localhost:8080/api/download/"+cartItem.image} />
                                                            </div>
                                                            <div className="cart-productList-content">
                                                                <p className="cart-productList-name">{cartItem.name}</p>
                                                                <div className="cart-productList-quantityPrice">
                                                                    <p style={{display :"none"}}>{cartItem.id}</p>
                                                                    <input type="number" value={cartItem.quantity} onChange={handleChangeQuantity} min="1" className="cart-productList-quantity" />
                                                                    <span className="cart-productList__multiplication">x</span>
                                                                    <div className="cart-productList-price">
                                                                        <p className="cart-productList__price-current">{cartItem.price}
                                                                            <span className="cart-productList__price-unit">đ</span>
                                                                        </p>
                                                                        {/* <p className="cart-productList__price-old">3.099.000
                                                                            <span className="cart-productList__price-unit">đ</span>
                                                                        </p> */}
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            <span className="cart-productList-delete__icon">
                                                                <i idProduct={cartItem.id} onClick={handleDeleteCartClick} className="ti-trash icon-delete" />
                                                            </span>
                                                        </li>
                                                    )
                                                })}
                                            </ul>
                                            <div className="cart-productList-pay">
                                                <div className="cart-productList-total">
                                                    <span className="cart-productList-total__text">thành tiền</span>
                                                    <span className="cart-productList-total__total-price">
                                                        {carts.length > 0 ? carts.reduce((initValue ,cartItem) => {
                                                            return initValue + ( parseInt(cartItem.price) * parseInt(cartItem.quantity) )
                                                        } ,0) : 0}
                                                        <span className="cart-productList-total__total-unit">đ</span>
                                                    </span>
                                                </div>
                                                <Link to="/checkout">
                                                    <button type="button" className="cart-productList-pay-btn">thanh toán</button>
                                                </Link>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="cart-footer">
                                        <div className="cart-footer__warranty">
                                            <div className="cart-footer__warranty-img">
                                                <svg xmlns="http://www.w3.org/2000/svg" width={32} height={34} viewBox="0 0 34 40" fill="none">
                                                    <path d="M32.7867 6.47703L17.4742 0.119443C17.0906 -0.0397754 16.6594 -0.0398535 16.2759 0.119443L0.96336 6.47703C0.380157 6.71921 0 7.28859 0 7.92007V15.6486C0 26.2902 6.43196 35.8627 16.2845 39.8842C16.663 40.0386 17.087 40.0386 17.4655 39.8842C27.3179 35.8628 33.75 26.2903 33.75 15.6486V7.92007C33.75 7.28859 33.3699 6.71921 32.7867 6.47703ZM30.625 15.6486C30.625 24.6951 25.3125 33.023 16.875 36.7403C8.66297 33.1223 3.125 24.9402 3.125 15.6486V8.9632L16.875 3.25429L30.625 8.9632V15.6486ZM15.148 20.9153L21.8639 14.1995C22.4741 13.5893 23.4634 13.5892 24.0736 14.1995C24.6838 14.8097 24.6838 15.799 24.0735 16.4091L16.2528 24.2299C15.6425 24.8402 14.6532 24.8399 14.0431 24.2299L9.67641 19.8631C9.06618 19.2529 9.06618 18.2636 9.67641 17.6534C10.2866 17.0433 11.2759 17.0432 11.8861 17.6534L15.148 20.9153Z" fill="black" />
                                                </svg>
                                            </div>
                                            <span className="cart-footer__warranty-des">Bảo hành 10 năm <br />lỗi nhà sản
                                                xuất</span>
                                        </div>
                                        <div className="cart-footer__freeship">
                                            <div className="cart-footer__freeship-img">
                                                <svg xmlns="http://www.w3.org/2000/svg" width={64} height={32} viewBox="0 0 64 40" fill="none">
                                                    <path d="M58.808 16.9574L57.1704 10.4073C57.6181 10.3122 57.9541 9.915 57.9541 9.43913V8.38304C57.9541 6.09004 56.0885 4.22462 53.7957 4.22462H46.3369V2.04623C46.3369 0.917891 45.419 0 44.2907 0H6.27061C5.14226 0 4.22437 0.917891 4.22437 2.04623V20.0002C4.22437 20.5469 4.66763 20.9903 5.21451 20.9903C5.76127 20.9903 6.20465 20.5471 6.20465 20.0002V2.04623C6.20465 2.0098 6.23417 1.98028 6.27061 1.98028H44.2906C44.327 1.98028 44.3565 2.0098 44.3565 2.04623V20.0004C44.3565 20.5472 44.7998 20.9906 45.3467 20.9906C45.8934 20.9906 46.3368 20.5473 46.3368 20.0004V18.878H58.0166C58.0176 18.878 58.0183 18.8783 58.0192 18.8783C58.0202 18.8783 58.021 18.8781 58.0219 18.8781C59.4591 18.8791 60.6795 19.8225 61.0986 21.1224H58.0199C57.4731 21.1224 57.0298 21.5656 57.0298 22.1125V24.2247C57.0298 25.9354 58.4214 27.327 60.1321 27.327H61.2543V31.6834H58.6653C57.8149 29.2278 55.4805 27.4589 52.7393 27.4589C49.9981 27.4589 47.6636 29.2278 46.8133 31.6834H46.3366V24.2246C46.3366 23.6778 45.8933 23.2344 45.3464 23.2344C44.7997 23.2344 44.3563 23.6777 44.3563 24.2246V31.6832H23.8139C22.9634 29.2275 20.6291 27.4587 17.8879 27.4587C15.1467 27.4587 12.8122 29.2275 11.9618 31.6832H6.27061C6.23417 31.6832 6.20465 31.6536 6.20465 31.6172V29.4389H10.4951C11.0419 29.4389 11.4852 28.9957 11.4852 28.4488C11.4852 27.9019 11.042 27.4587 10.4951 27.4587H0.990141C0.443384 27.4587 0 27.9019 0 28.4488C0 28.9957 0.44326 29.4389 0.990141 29.4389H4.2245V31.6172C4.2245 32.7456 5.14239 33.6634 6.27073 33.6634H11.619C11.6188 33.6854 11.6173 33.7073 11.6173 33.7294C11.6173 37.187 14.4303 40 17.8879 40C21.3454 40 24.1585 37.187 24.1585 33.7294C24.1585 33.7072 24.157 33.6854 24.1568 33.6634H46.4704C46.4702 33.6854 46.4687 33.7073 46.4687 33.7294C46.4687 37.187 49.2818 40 52.7393 40C56.1968 40 59.0099 37.187 59.0099 33.7294C59.0099 33.7072 59.0084 33.6854 59.0082 33.6634H62.2444C62.7912 33.6634 63.2345 33.2202 63.2345 32.6733V22.1123C63.2347 19.5048 61.3108 17.3384 58.808 16.9574ZM46.3369 6.20478H53.7957C54.9967 6.20478 55.9739 7.18195 55.9739 8.38304V8.44899H46.3369V6.20478ZM46.3369 16.8979V10.4292H55.1348L56.752 16.8979H46.3369ZM17.8879 38.0201C15.5221 38.0201 13.5974 36.0955 13.5974 33.7296C13.5974 31.3638 15.5221 29.4392 17.8879 29.4392C20.2536 29.4392 22.1783 31.3638 22.1783 33.7296C22.1783 36.0955 20.2536 38.0201 17.8879 38.0201ZM52.7396 38.0201C50.3738 38.0201 48.4491 36.0955 48.4491 33.7296C48.4491 31.3638 50.3738 29.4392 52.7396 29.4392C55.1053 29.4392 57.03 31.3638 57.03 33.7296C57.03 36.0955 55.1053 38.0201 52.7396 38.0201ZM61.2545 25.3467H60.1323C59.5136 25.3467 59.0102 24.8433 59.0102 24.2246V23.1024H61.2544V25.3467H61.2545Z" fill="black" />
                                                    <path d="M17.8879 31.6836C16.7595 31.6836 15.8416 32.6015 15.8416 33.7298C15.8416 34.8582 16.7595 35.7761 17.8879 35.7761C19.0162 35.7761 19.9341 34.8582 19.9341 33.7298C19.9341 32.6015 19.0162 31.6836 17.8879 31.6836Z" fill="black" />
                                                    <path d="M52.7396 31.6836C51.6113 31.6836 50.6934 32.6015 50.6934 33.7298C50.6934 34.8582 51.6113 35.7761 52.7396 35.7761C53.8679 35.7761 54.7858 34.8582 54.7858 33.7298C54.7858 32.6015 53.8679 31.6836 52.7396 31.6836Z" fill="black" />
                                                    <path d="M41.1223 27.4595H26.3368C25.79 27.4595 25.3466 27.9027 25.3466 28.4496C25.3466 28.9965 25.7899 29.4398 26.3368 29.4398H41.1223C41.6691 29.4398 42.1124 28.9965 42.1124 28.4496C42.1124 27.9027 41.6692 27.4595 41.1223 27.4595Z" fill="black" />
                                                    <path d="M15.7757 23.2344H3.10229C2.55554 23.2344 2.11215 23.6776 2.11215 24.2245C2.11215 24.7714 2.55541 25.2147 3.10229 25.2147H15.7757C16.3224 25.2147 16.7658 24.7714 16.7658 24.2245C16.7658 23.6776 16.3224 23.2344 15.7757 23.2344Z" fill="black" />
                                                    <path d="M34.4297 9.79528C34.0431 9.40871 33.4161 9.40871 33.0295 9.79541L24.2246 18.6002L19.6441 14.0198C19.2574 13.6331 18.6305 13.6331 18.2439 14.0198C17.8572 14.4065 17.8572 15.0333 18.2439 15.42L23.5245 20.7005C23.7178 20.8939 23.9713 20.9905 24.2246 20.9905C24.4779 20.9905 24.7314 20.8939 24.9246 20.7005L34.4296 11.1956C34.8163 10.8088 34.8163 10.182 34.4297 9.79528Z" fill="black" />
                                                </svg>
                                            </div>
                                            <span className="cart-footer__freeship-des">Freeship <br />với đơn hàng &gt;
                                                700K</span>
                                        </div>
                                    </div>
                                </div>
                            </li>
                            <li className="header-right__item">
                                <label htmlFor="header-checkbox-search" className="header-right__lable">
                                    <i className="header-right__icon-search ti-search" />
                                </label>
                                <input type="checkbox" hidden id="header-checkbox-search" className="header-checkbox-search" />
                                <label htmlFor="header-checkbox-search" className="header__overlay" />
                                <div className="search">
                                    <div className="search-header">
                                        <label htmlFor="header-checkbox-search" className="cart-header__exit">
                                            <i className="cart-header__exit-icon ti-close" />
                                        </label>
                                    </div>
                                    {/* search-body--empty :empty */}
                                    <div className="search-body">
                                        <div className="search-body-header">
                                            <div className="search-body__icon">
                                                <i className="ti-search" />
                                            </div>
                                            <input type="text" placeholder="Tìm kiếm ..." className="search-body__input" onChange={onSearch} />
                                        </div>
                                        <div className="search-body-notify">
                                            <p className="search-body-notify-text">{productList.length} mục</p>
                                        </div>
                                        <ul className="search-body-productList">
                                            {productList.map(product => {
                                                return (
                                                    <li key={product.id} className="search-body-item">
                                                        <div className="search-body-item__pictureName">
                                                            <img src={"http://localhost:8080/api/download/"+product.image} alt="" className="search-body-item__img" />
                                                            <span className="search-body-item__name">{product.name}</span>
                                                        </div>
                                                        <div className="search-body-item__price">
                                                            <p className="search-body-item__price-current">{product.price}
                                                                <span className="search-body-item__unit">đ</span>
                                                            </p>
                                                        </div>
                                                    </li>
                                                )
                                            })}
                                        </ul>
                                    </div>
                                </div>
                            </li>
                        </ul>
                    </nav>
                </div>
            </div>
        </div>
    );
}

export default Header;