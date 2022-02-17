import './App.css';
import {Navbarcustom} from './components/Navbar/Navbar.js';
import {ItemListContainer} from'./components/ItemListContainer/ItemListContainer.js';
import {ItemDetailContainer} from './components/ItemDetailContainer/itemDetailContainer.js';

function App() {
  return (
    <div>
      <Navbarcustom />    
      <ItemListContainer greeting="Bienvenido a la tienda virtual de The BookShop"/>
      <ItemDetailContainer></ItemDetailContainer>
    </div>
  );
}

export default App;
