

import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Login from 'pages/Login'
import NotFound from 'pages/NotFound';
import { ListCards } from 'componnets/dashboard/ListCards';
import AddCard from 'componnets/dashboard/AddCard';
import { ToastContainer } from 'react-toastify';
import Dashboard from 'pages/dashboard/Dashboard';
import { useSelector } from 'react-redux';
import { useEffect } from 'react';




function App() {
  const token = useSelector((state) => state.auth.token);
  const pathname = window.location.pathname


  useEffect(() => {
    if (!token && pathname !== '/') {
      window.location.pathname = '/'
    }
  }, [token, pathname])

  useEffect(() => {
    if (token && pathname === '/') {
      window.location.pathname = '/home/list-cards'
    }
  }, [token, pathname])




  if (!token) {
    return (
      <div className="App">
        <BrowserRouter>
          <ToastContainer />
          <Routes>
            <Route path="/" element={<Login />}></Route>
            {/* <Route path="/login" element={<Login />}></Route> */}
            <Route path="*" element={<NotFound />}></Route>
          </Routes>
        </BrowserRouter>
      </div>
    )
  }

  return (
    <div className="App">
      <ToastContainer />
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Login />}></Route>
          <Route path='/' element={<Dashboard />}>
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
