import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css'; 
import { Route, RouterProvider, createBrowserRouter, createRoutesFromElements } from 'react-router-dom';
import Layout from './Layout.jsx'; 


import HomePage from './pages/HomePage.jsx';
import LoginPage from './pages/LoginPage.jsx';
import RegisterPage from './pages/RegisterPage.jsx';
import RentBuyToolsPage from './pages/RentBuyToolsPage.jsx';
import SellToolsPage from './pages/SellToolsPage.jsx';
import PostLabourJobsPage from './pages/PostLabourJobsPage.jsx';
import FindWorkPage from './pages/FindWorkPage.jsx';
import DashboardPage from './pages/DashboardPage.jsx';


const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' element={<Layout />}>
      <Route index element={<HomePage />} /> 
      <Route path='rent-buy-tools' element={<RentBuyToolsPage />} />
      <Route path='sell-tools' element={<SellToolsPage />} />
      <Route path='post-labour-jobs' element={<PostLabourJobsPage />} />
      <Route path='find-work' element={<FindWorkPage />} />
      <Route path='dashboard' element={<DashboardPage />} />
      <Route path='login' element={<LoginPage />} />
      <Route path='register' element={<RegisterPage />} />
    </Route>
  )
);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
);
