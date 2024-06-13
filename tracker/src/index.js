import React from 'react';
import ReactDOM from 'react-dom/client';

import App from './App';
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
import IndexPage from './Components/IndexPage';
import Register from './Components/Register';
import Login from './Components/Login';
import Home from './Components/Home';
import DetailedOverView from './Components/DetailedOverView';
import Nopage from './Components/Nopage';
import Trends from './Components/Trends';
import ChangePersonaldetails from './Components/ChangePersonaldetails';
import EmailIntegration from './Components/EmailIntegration';
import ManageCategories from './Components/ManageCategories';
import SpendAlerts from './Components/SpendAlerts';
import AddManuallyData from './Components/AddManuallyData';

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App />}>
      <Route index element={<Register/>} />
      <Route path="register" element={<Register />} />
      <Route path='login' element={<Login/>} />
      <Route path="home" element={<Home/>} />
      <Route path="overView" element={<DetailedOverView/>} />
      <Route path="trends" element={<Trends/>} />
      <Route path="personalDetails" element={<ChangePersonaldetails/>} />
      <Route path="emailIntegration" element={<EmailIntegration/>} />
      <Route path="manageCategory" element={<ManageCategories/>} />
      <Route path="spendAlert" element={<SpendAlerts/>} />
      <Route path="addData" element={<AddManuallyData/>} />
      <Route path="*" element={<Nopage/>} />
      
    </Route>
    
  )
);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);


