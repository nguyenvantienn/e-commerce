
import { Routes , Route } from 'react-router-dom';

import {CartPage , CategoryProductPage , HomePage , ProductSimplePage , SearchPage} from './Pages'
import {Header , Sidebar , Footer} from './Components'
import './App.scss';

function App() {
  return (
    <div className="App">
      <Header/>
      <Sidebar/>

      <Routes>
        {/* Homepage Route */}
        <Route path='/' element ={<HomePage/>}/>
        {/* Product Page Route */}
        <Route path='/product/:id' element={<ProductSimplePage/>}/>
        {/* Categories Page Route */}
        <Route path='/category/:category' element={<CategoryProductPage/>}/>
        {/* Cart Page  */}
        <Route path='/cart' element={<CartPage/>}/>
        {/* SearchPage Route */}
        <Route path='/search/:searchTerm' element={<SearchPage/>}/>

        {/* URL random */}
        <Route path='*' element={<HomePage/>}/>
      </Routes>

      <Footer/>
    </div>
  );
}

export default App;