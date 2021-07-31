// import React, { useEffect, useState } from 'react';
// import {
//   BrowserRouter as Router, 
//   Route, 
//   Switch, 
//   useHistory
// } from "react-router-dom";
// import '../../assets/client/css/base.css';
// import '../../assets/client/css/grid.css';
// import '../../assets/client/css/style.css';
// import '../../assets/client/fonts/themify-icons/themify-icons.css';
// import Banner from './Banner/Banner';
// import Caipaign from './Caipaign/Caipaign';
// import CategoryCard from './CategoryCard/CategoryCard';
// import Checkout from './Checkout/Checkout';
// import Confirmation from './Confirmation/Confirmation';
// import Footer from './FooterMain/Footer';
// import Header from './Header/Header';
// import Login from './Login/Login';
// import OurProduct from './OurProduct/OurProduct';
// import ProductBestSeller from './ProductBestSeller/ProductBestSeller';
// import ProductDetail from './ProductDetail/ProductDetail';
// import Register from './Register/Register';
// import Story from './Story/Story';

// export default function HomeClient() {
//   let history = useHistory()
//   let [productList, setProductList] = useState([])
//   let [cartList, setCartList] = useState([])
//   let [quantityCart, setQuantityCart] = useState(0)
//   let [accessToken, setAccessToken] = useState(null)

//   useEffect(() => {
//     function getCart() {
//       console.log('@@@@')
//       let cartInLocalStorage = JSON.parse(localStorage.getItem('cart')) ? JSON.parse(localStorage.getItem('cart')) : [];
//       console.log('cart current ', cartInLocalStorage)
//       setCartList(cartInLocalStorage)
//     }

//     getCart()
//   }, [quantityCart])

//   // useEffect(() => {
//   //   function getToken() {
//   //     setAccessToken(localStorage.getItem('accessToken') ? JSON.parse(localStorage.getItem('accessToken')) : null)
//   //   }

//   //   getToken()
//   // } ,[accessToken])

//   useEffect(() => {
//     console.log('9999')
//     async function getListProduct() {
//       var myHeaders = new Headers();
//       myHeaders.append("Content-Type", "application/json");

//       var raw = JSON.stringify({
//         "search": "",
//         "page": "1",
//         "limit": "4"
//       });

//       var requestOptions = {
//         method: 'POST',
//         headers: myHeaders,
//         body: raw,
//         redirect: 'follow'
//       };

//       try {
//         let response = await fetch("http://localhost:4000/api/product/search", requestOptions)
//         if (response.ok) {
//           let results = await response.json()
//           const { data } = results
//           console.log(data)
//           setProductList(data)
//         }
//       } catch (error) {
//         console.log('Fetch products error ', error)
//       }
//     }

//     getListProduct();
//   }, []);

//   async function handleAddToCartClick(product) {
//     // console.log('cart current ',cart)
//     // console.log('before quantity cart ',quantityCart)
//     const item = {
//       _id: product._id,
//       name: product.name,
//       description: product.description,
//       quantity: 1,
//       price: product.price,
//       image: product.image,
//     }
//     let newArr = []
//     if (cartList.length < 1) {
//       setQuantityCart(1)
//       newArr.push(item)
//       setQuantityCart(item.quantity)
//       localStorage.setItem("cart", JSON.stringify(newArr));
//     } else {
//       let quantityCartCurrent = 0;
//       cartList.map(cartItem => {
//         if (item._id == cartItem._id) {
//           console.log('cap nhat so luong san pham')
//           item.quantity = item.quantity + cartItem.quantity
//         } else {
//           console.log('them san pham cu vao')
//           quantityCartCurrent += cartItem.quantity
//           newArr.push(cartItem);
//         }
//       });
//       quantityCartCurrent += item.quantity
//       newArr.push(item);
//       await localStorage.setItem('cart', JSON.stringify(newArr));
//       setQuantityCart(quantityCartCurrent)
//     }
//   }

//   let handleDeleteCartClick = (event) => {
//     let quantityCartCurrent = 0;
//     let idProduct = event.target.getAttribute('idProduct')
//     cartList.forEach((cartItem, index) => {
//       if (idProduct === cartItem._id) {
//         console.log('da xoa')
//         cartList.splice(index, 1);
//       }
//       quantityCartCurrent += cartItem.quantity
//     })
//     if (cartList.length < 1) {
//       quantityCartCurrent = 0;
//     }
//     console.log('quantity cart current ', quantityCartCurrent)
//     setQuantityCart(quantityCartCurrent)
//     localStorage.setItem('cart', JSON.stringify(cartList));
//   }

//   let handleLogin = async (data) => {
//     //Call API
//     var myHeaders = new Headers();
//     myHeaders.append("Content-Type", "application/json");

//     var raw = JSON.stringify(data);

//     var requestOptions = {
//       method: 'POST',
//       headers: myHeaders,
//       body: raw,
//       redirect: 'follow'
//     };

//     try {
//       let response = await fetch("http://localhost:4000/api/login", requestOptions)
//       if (response.ok) {
//         let result = await response.json()
//         console.log(result)
//         localStorage.setItem('accessTokenClient', result.accessToken)
//         history.push('/')
//         setAccessToken(result.accessToken)
//         window.location.reload()
//       }
//       // if (response.status == 400) {
//       //     alert('Tài khoản của bạn bị vô hiệu hóa')
//       // }
//       // if (response.status == 401) {
//       //     alert('Tài khoản hoặc mật khẩu không chính xác')
//       // }
//     } catch (error) {
//       console.log('login error ', error)
//     }
//   }



//   return (
//       <Router>
//         <div className="app">
//           <Header carts={cartList} onDeleteCartClick={handleDeleteCartClick} />
//           <div className="app_container">
//               <Switch>
//                 <Route path="/product/:id">
//                   <ProductDetail addToCart={handleAddToCartClick} />
//                 </Route>

//                 <Route path="/checkout">
//                   <Checkout carts={cartList} />
//                 </Route>

//                 <Route path="/confirmation">
//                   <Confirmation />
//                 </Route>

//                 <Route path="/login">
//                   <Login onLoginClick={handleLogin} />
//                 </Route>

//                 <Route path="/register">
//                   <Register />
//                 </Route>

//                 <Route exact path="/index">
//                   <Banner />
//                   <CategoryCard />
//                   <ProductBestSeller products={productList} />
//                   <Caipaign />
//                   <OurProduct />
//                   <Story />
//                 </Route>
//               </Switch>
//           </div>
//           <Footer />
//         </div>
//       </Router>
//   )

// }