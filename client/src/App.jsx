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
// import ViewCart from './components/MenuInventory/ViewCart.js';

function App() {
  return (
    <Router>
        <AuthProvider> {/* Wrap the entire app with AuthProvider to provide authentication context */}
        <Routes>

          {/*Routes for the user*/}
          <Route path='/' element={<Layout />}>
            <Route index element={<Home />} />
            <Route path='/status' element={<Status />} />
            <Route path='/menu_inventory' element={ <MenuInventoryUser />} />
            {/* <Route path='/viewCart' element={ <ViewCart />} /> */}

            <Route path='/subscription' element={
              <ProtectedRoute> {/* Protect subscription route */}
                <Subscription />
              </ProtectedRoute>
            } />
            <Route path='/feedback' element={<Feedback />} />
            <Route path='/register' element={<Registration />} />
            <Route path='/login' element={<LoginPage />} />
            <Route path='/mess' element={<AdminDashboard />} />
            <Route path='/RegisterMess' element={<RegisterMess/>} />
           
            
            <Route path='/user/:userid' element={
              <ProtectedRoute> {/* Protect individual user routes */}
                <User />
              </ProtectedRoute>
            } />



          </Route>


             {/* Routes for managers */}
             <Route path='/manager' element={<LayoutManager />}>
            <Route path='/manager/status' element={<ManagerStatus />} />
            <Route path='/manager/menu_inventory' element={<MenuInventory />} />
          </Route>


        </Routes>
    </AuthProvider>
      </Router>
  );
}

export default App;
