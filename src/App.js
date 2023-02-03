import logo from './logo.svg';
import React from 'react';
import './App.css';
import {Routes,Route,Link,NavLink,useLocation} from 'react-router-dom'
import Home from './home';
import RemainingHome from './remaininghome'
import SelectedCategory from './selectedcategory'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/js/src/collapse.js';
import Connection from './connection';
import Grocery from './category';
import Items from './items';
import Register from './Register';
import Billing from './billing';
import Login from './Login';
import Orders from './orders';
import Logout from './logout';

function App() {
  return (
    <div className="App">
    
<Routes >  
          <Route path="/"   element={<Home />} />
            <Route path="/items"   element={<Items />} />
            <Route path="/billing" element={<Billing />} />
            <Route path="/login"  element={<Login />} />
                    <Route path="/logout"  element={<Logout />} />
            <Route path="/register" element={<Register />} />
            
            <Route path="/orders" element={<Orders />} />
            
    </Routes>
   



    </div>
  );
}

export default App;
