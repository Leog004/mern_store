import {Home, ProductList, Product, Login, Register, Cart} from './Pages'
import ScrollToTop from './Components/ScrollToTop';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate
} from 'react-router-dom'
import Success from './Pages/Success';
import { useSelector } from 'react-redux';

const App = () => {

  const user = useSelector((state) => state.user.currentUser);

  return (
    <Router>
      <ScrollToTop>
        <Routes>
          <Route exact path='/' element={<Home/>} />
          <Route path='/products/' element={<ProductList/>} />
          <Route path='/products/:category' element={<ProductList/>} />
          <Route path='/product/:id' element={<Product/>} />
          <Route path='/cart' element={<Cart/>} />
      
          
          <Route path="/login" element={ user ? <Navigate to="/" /> : <Login/>} />
          <Route path='/register' element={ user ? <Navigate to="/" /> : <Register/> }/>


          <Route path='/success' element={<Success/>} />

        </Routes>
      </ScrollToTop>
    </Router>
  )
};

export default App;