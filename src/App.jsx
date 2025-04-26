import { useState } from 'react'
import Navbar from './components/Navbar'
import SignUp from './components/SignUp'
import Login from './components/Login';
import { Route, Routes } from 'react-router-dom';
import './App.css'
import Maincontainer from './components/Maincontainer';
import Home from './components/Home';
import Otp from './components/Otp';
import UserContainer from './components/UserContainer';
import Admin from './components/Admin';
import Profile from './components/Profile';
import Post from './components/Post';
import Form1 from './components/Forms/Form1'
import Form2 from './components/Forms/Form2'
import Form3 from './components/Forms/Form3'
import Form4 from './components/Forms/Form4'
import Form5 from './components/Forms/Form5'
import PostFeed from './components/PostFeed';
import { NotificationManager } from './components/NotificationManager';
import ChatArea from './components/ChatArea';
import FeatureShowcase from './components/Modals/Feat';
function App() {
  console.log("app component re-renders")

  return (
    <div className='App'>
           <Navbar/>
           <NotificationManager />
           <Routes>
               <Route path='/features' element={<FeatureShowcase/>}/>
               <Route path='/' element={<Maincontainer/>}>
                 <Route index element={<Home/>}/>
                 <Route path='login' element={<Login/>}/>
                 <Route path='signup' element={<SignUp/>}/>
                 <Route path='otp' element={<Otp/>}/>
                 <Route path='welcome' element={<UserContainer/>}>
                  <Route path='chat/:id' element={<ChatArea/>}/>
                 </Route>
                 <Route path='feed' element={<PostFeed/>}/>
                 <Route path='profile/:id' element={<Profile/>}>
                    <Route path='details' element={<Form1/>}/>
                    <Route path='education' element={<Form2/>}/>
                    <Route path='projectDetails' element={<Form3/>}/>
                    <Route path='volunteer' element={<Form4/>}/>
                    <Route path='skills' element={<Form5/>}/>
                 </Route>
                 <Route path='post/:id' element={<Post/>}/>
                 
             </Route>
              <Route path ='/admin' element = {<Admin/>}/>
           </Routes>
    </div>
  )
}

export default App
