import { useState } from "react"
import { ApplicationViews } from "./views/ApplicationViews"
import { NavBar } from "./components/nav/NavBar"
import { Authorized } from "./views/Authorized"
import { Login } from "./components/auth/Login"
import { Register } from "./components/auth/Register"
import { Routes, Route, Outlet} from "react-router-dom"
import "./App.css"


export const App = () => {
  const [token, setTokenState] = useState(localStorage.getItem('auth_token'))

  const setToken = (newToken) => {
    localStorage.setItem('auth_token', newToken)
    setTokenState(newToken);
  }
  
  return (
    <>
      <NavBar token={token} setToken={setToken} />
    <Routes>
        <Route
          path="/"
          element = {<NavBar token={token} setToken={setToken} />}
          
        <Route path="/login" element={<Login setToken={setToken}/>}/> 
        <Route path="/register" element={<Register setToken={setToken} />}/>

        <Route path="/*" element={
          <Authorized>
            <ApplicationViews token={token} setToken={setToken} />
          </Authorized>
        } />
    </Routes>
    
    
    </>
  )
}
