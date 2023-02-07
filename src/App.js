
import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Login from './componnets/Login'
import Home from './componnets/Home';
import NotFound from './componnets/NotFound';
import { ListCards } from 'componnets/ListCards';
import AddCard from 'componnets/AddCard';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Login />}></Route>
          <Route path='/home' element={<Home />}>
            <Route path='/home/list-cards' element={<ListCards />}></Route>
            <Route path='/home/add-card' element={<AddCard />}></Route>
          </Route>


          <Route path='*' element={<NotFound />}></Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
