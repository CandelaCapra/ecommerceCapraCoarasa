import './App.css'
import {Navbarcustom} from './components/Navbar/Navbar.js'
import {ItemListContainer} from'./components/ItemListContainer/ItemListContainer.js'
import {ItemDetailContainer} from './components/ItemDetailContainer/ItemDetailContainer.js'
import {Cart} from './components/Cart/Cart.js'
import { BrowserRouter, Route, Routes} from "react-router-dom"
import { CartContextProvider} from './context/CartContext.js'
import { CheckOutForm } from './components/CheckoutForm/CheckOutForm.js'

function App() {
  return (
    <div>
      <CartContextProvider>
        <BrowserRouter>
          <Navbarcustom />  
          <Routes>  
            <Route path='/' element={<ItemListContainer greeting="Bienvenido a la tienda virtual" />} />
            <Route path='/category/:categoryId' element={<ItemListContainer greeting="Bienvenido a la tienda virtual" />} />
            <Route path='/item/:id' element={<ItemDetailContainer />} />
            <Route path='/cart' element={<Cart />}/>
            <Route path='/checkout' element={<CheckOutForm />} />
          </Routes>
        </BrowserRouter>
      </CartContextProvider>
    </div>
  );
}

export default App
