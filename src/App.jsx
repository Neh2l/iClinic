import { BrowserRouter, Route, Routes } from 'react-router';
import Register from './pages/Auth/Register';
import Layout from './components/layout/Layout';
import Login from './pages/Auth/Login';
import Chat from './pages/Chat';
import Dashboard from './pages/Dashboard';
import Home from './pages/Home';
import Doctor from './pages/Doctor';
import Payment from './pages/Payment';
import Error from './pages/Error';
import { ToastContainer } from 'react-toastify';
import Aos from 'aos';
import 'aos/dist/aos.css'
import { useEffect } from 'react';

function App() {
  useEffect(()=>{
    Aos.init({duration:1000});
  },[])
  return (
 
<BrowserRouter>
<ToastContainer position="top-center" autoClose={3000} />
<div style={{backgroundColor:"#F5F5F5"}}>
  <Routes>
    <Route path='/' element={<Layout/>}>
    <Route index element={<Home/>}/>
    <Route path='/home' element={<Home/>}/>
     <Route path='/login' element={<Login/>}/>
     <Route path='/register' element={<Register/>}/>
     <Route path='/chat' element={<Chat/>}/>
     <Route path='/dashboard' element={<Dashboard/>}/>
     <Route path='/doctor' element={<Doctor/>}/>
     <Route path='/payment' element={<Payment/>}/>
     <Route path='*' element={<Error/>}/>
    
    </Route>     
  </Routes>
  </div>
   
</BrowserRouter>
  )
  
}

export default App;
