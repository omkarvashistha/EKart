import logo from './logo.svg';
import './App.css';
import Login from './Components/Login';
import { BrowserRouter, Routes , Route } from 'react-router-dom';
import ForgotPassword from './Components/ForgotPassword';
import Signup from './Components/Signup';
import Products from './Components/Products';
import Deals from './Components/Deals';
import ProductDetails from './Components/ProductDetails';
import Cart from './Components/Cart';
function App() {
  return (
    <BrowserRouter>
      <Routes>
          <Route path='/' element={<Login/>}></Route>
          <Route path='/login' element={<Login/>}></Route>
          <Route path='/forgotPassword' element={<ForgotPassword/>}></Route>
          <Route path='/products' element={<Products/>}></Route>
          <Route path='/signup' element={<Signup/>}></Route>
          <Route path='/deals' element={<Deals/>}></Route>
          <Route path='/productDetails' element={<ProductDetails/>}></Route>
          <Route path="/cart" element={<Cart/>}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
