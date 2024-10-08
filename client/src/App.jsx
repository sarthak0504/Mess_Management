import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext.jsx'; // Import AuthProvider
import ProtectedRoute from './components/ProtectedRoute.jsx'; // Import the ProtectedRoute component

import Home from './components/Home/Home.jsx';
import Status from './components/Status/Status.jsx';
import Subscription from './components/Subscription/Subscription.jsx';
import Feedback from './components/Feedback/Feedback.jsx';
import Registration from './components/Registration/Registration.jsx';
import LoginPage from './components/Login/Login.jsx';
import MenuInventory from './components/MenuInventory/MenuInventory.jsx';


import User from './components/User/User.jsx';
import Layout from './Layout.jsx';
import LayoutManager from './LayoutManager.jsx';
import './App.css';
import ManagerStatus from './components/Status/ManagerStatus.jsx';
import MenuInventoryUser from './components/MenuInventory/MenuInventory_user.jsx';
import AdminDashboard from './components/Mess/Dashboard.jsx';
import RegisterMess from './components/Mess/RegisterMess.jsx';
import AdminLayout from './LayoutAdmin.jsx';
import AboutUs from './components/Mess/AboutUs.jsx';
import HomePage from './components/Mess/HomePage.jsx';
import ManagerLogin from './components/Login/ManagerLogin.jsx';
// import ViewCart from './components/MenuInventory/ViewCart.js';

function App() {
  return (
    <Router>
        <AuthProvider> {/* Wrap the entire app with AuthProvider to provide authentication context */}
        <Routes>

          
          {/*Routes for the user*/}
          <Route path='/user' element={<Layout />}>
            <Route path='/user' index element={<Home />} />
            <Route path='/user/status' element={<Status />} />
            <Route path='/user/menu_inventory' element={ <MenuInventoryUser />} />
            {/* <Route path='/viewCart' element={ <ViewCart />} /> */}

            <Route path='/user/subscription' element={
              <ProtectedRoute> {/* Protect subscription route */}
                <Subscription />
              </ProtectedRoute>
            } />
            <Route path='/user/feedback' element={<Feedback />} />
            <Route path='/user/register' element={<Registration />} />
            <Route path='/user/login' element={<LoginPage />} />
            
            
           
            
   


          </Route>


          <Route path='/manager' element={<LayoutManager />}>
            <Route path='/manager/login' element={<ManagerLogin />} />
            <Route path='/manager/status/:managerId' element={
             
                <ManagerStatus />
            
            } />
            <Route path='/manager/menu_inventory' element={
              <ProtectedRoute> {/* Protect menu inventory route */}
                <MenuInventory />
              </ProtectedRoute>
            } />
          </Route>

             {/*Routes for the admin*/}
           <Route path='/admin' element={<AdminLayout />}>
           <Route path='/admin/mess' element={<AdminDashboard />} />
           <Route path='/admin/RegisterMess' element={<RegisterMess/>} />
           <Route path='/admin/AboutUs' element={<AboutUs />} />
           <Route path='/admin' element={<HomePage />} />
           
           </Route>


        </Routes>
    </AuthProvider>
      </Router>
  );
}

export default App;
