import './App.css';
import {Navbarcustom} from './components/Navbar/Navbar.js';
import {ItemListContainer} from'./components/ItemListContainer/ItemListContainer.js';

function App() {
  return (
    <div>
      <Navbarcustom />    
      <ItemListContainer greeting="Bienvenido a la tienda virtual de The BookShop"/>
    </div>
  );
}

export default App;
