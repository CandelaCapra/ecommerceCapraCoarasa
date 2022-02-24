import './App.css';
import {Navbarcustom} from './components/Navbar/Navbar.js';
import {ItemListContainer} from'./components/ItemListContainer/ItemListContainer.js';
import {ItemDetailContainer} from './components/ItemDetailContainer/itemDetailContainer.js';
import {Cart} from './components/Cart/Cart.js'
import { BrowserRouter, Route, Routes} from "react-router-dom";


function App() {
  return (
    <div>
      <BrowserRouter>
        <Navbarcustom />  
        <Routes>  
          <Route path='/' element={<ItemListContainer greeting="Bienvenido a la tienda virtual" />} />
          <Route path='/category/:categoryId' element={<ItemListContainer greeting="Bienvenido a la tienda virtual" />} />
          <Route path='/item/:id' element={<ItemDetailContainer />} />
          <Route path='/cart' element={<Cart />}/>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
