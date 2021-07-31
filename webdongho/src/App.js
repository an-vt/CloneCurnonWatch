import { useEffect, useState } from "react";
import {
  BrowserRouter,
  Route, Switch, useHistory
} from "react-router-dom";
import './App.css';
import HomeAdmin from './component/admin/HomeAdmin';
import LoginAdmin from './component/admin/LoginAdmin';
import Checkout from "./component/client/Checkout/Checkout";
import Confirmation from "./component/client/Confirmation/Confirmation";
import Footer from "./component/client/FooterMain/Footer";
import SubFooter from "./component/client/FooterSub/SubFooter";
import Header from './component/client/Header/Header';
import IndexClient from "./component/client/IndexClient/IndexClient";
import Login from "./component/client/Login/Login";
import ProductDetail from './component/client/ProductDetail/ProductDetail';
import Register from './component/client/Register/Register';
import './assets/client/css/base.css';
import './assets/client/css/grid.css';
import './assets/client/css/style.css';
import './assets/client/fonts/themify-icons/themify-icons.css';

function App() {
  let [productList, setProductList] = useState([])
  let [cartList, setCartList] = useState([])
  let [quantityCart, setQuantityCart] = useState(0)
  let [isLogin ,setIsLogin] = useState(false)

  //check login
  useEffect(() => {
    function  checkLogin() {
      let login = localStorage.getItem('accessTokenClient') ? true : false
      setIsLogin(login)
    }

    checkLogin()
  } ,[ isLogin ])

  //get cart
  useEffect(() => {
    function getCart() {
      console.log('@@@@')
      let cartInLocalStorage = JSON.parse(localStorage.getItem('cart')) ? JSON.parse(localStorage.getItem('cart')) : [];
      setCartList(cartInLocalStorage)
    }

    getCart()
  }, [quantityCart])


  //add to cart
  async function handleAddToCartClick(product) {
    console.log("product" ,product)
    //create item add to cart
    const item = {
      _id: product._id,
      name: product.name,
      description: product.description,
      quantity: 1,
      price: product.price,
      image: product.image,
      category: product.category
    }
    let newArr = []
    if (cartList.length < 1) {
      newArr.push(item)

      //set quantity cart to call useEffect get new cart
      setQuantityCart(item.quantity)
      localStorage.setItem("cart", JSON.stringify(newArr));
    } else {
      let quantityCartCurrent = 0;
      cartList.map(cartItem => {
        if (item._id === cartItem._id) {
          item.quantity = item.quantity + cartItem.quantity
        } else {
          quantityCartCurrent += cartItem.quantity
          newArr.push(cartItem);
        }
      });
      quantityCartCurrent += item.quantity
      newArr.push(item);
      await localStorage.setItem('cart', JSON.stringify(newArr));

      //set quantity cart to call useEffect get new cart
      setQuantityCart(quantityCartCurrent)
    }
  }


  //delete item in cart
  let handleDeleteCartClick = (event) => {
    //use to call useEffect get new cart
    let quantityCartCurrent = 0;
    
    let idProduct = event.target.getAttribute('idProduct')
    cartList.forEach((cartItem, index) => {
      if (idProduct == cartItem._id) {
        console.log('da xoa')
        cartList.splice(index, 1);
      }
      quantityCartCurrent += cartItem.quantity
    })
    if (cartList.length < 1) {
      quantityCartCurrent = 0;
    }
    setQuantityCart(quantityCartCurrent)
    localStorage.setItem('cart', JSON.stringify(cartList));
  }


  let handleCheckLogin = () => {
    setIsLogin(true)
  }

  let handleLogout = () => {
    setIsLogin(false)
  }

  let handleOrder = () => {
    setQuantityCart(0)
  }

  return (
    <BrowserRouter>
    <Switch>
      <Route path="/admin" render={() => {
        return localStorage.getItem("accessToken") ? <HomeAdmin /> : <LoginAdmin />
      }}>
      </Route>

      <div className="app">
        <Header carts={cartList} isLogin={isLogin} onDeleteCartClick={handleDeleteCartClick} onLogout={handleLogout}/>

        <div className="app_container">
          <Switch>
            <Route exact path="/" component={IndexClient} />
            <Route path="/product/:id" render={() => <ProductDetail onAddToCart={handleAddToCartClick} />} />
            <Route path="/login" render={() => <Login isLogin={isLogin} onLogin={handleCheckLogin} />} />
            <Route path="/register" component={Register } />
            <Route path="/checkout" render={() => <Checkout onOrder={handleOrder} isLogin={isLogin} />} />
            <Route path="/confirmation"  component={Confirmation } />
          </Switch>
        </div>
        
        <Switch>
          <Route exact path='/' component={Footer} />
          <Route path={["/product/:id", "/login", "/register"]} component={Footer} />
          <Route path={["/checkout" ,"/confirmation"]} component={SubFooter} />
        </Switch>
      </div>
    </Switch>
  </BrowserRouter>
  );
}

export default App;
