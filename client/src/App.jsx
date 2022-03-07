import {Home, ProductList, Product, Login, Register, Cart} from './Pages'
import ScrollToTop from './Components/ScrollToTop';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate
} from 'react-router-dom'
import Success from './Pages/Success';

const App = () => {

  const user = true;

  return (
    <Router>
      <ScrollToTop>
        <Routes>
          <Route exact path='/' element={<Home/>} />
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