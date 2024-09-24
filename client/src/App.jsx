import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import Home from './components/Home/Home.jsx'
import About from './components/About/About.jsx'
import Contact from './components/Contact/Contact.jsx'
import User from './components/User/User.jsx'
import './App.css';
import Layout from './layout.jsx';
import Subscription from './components/Subscription/Subscription.jsx';
import Feedback from './components/Feedback/Feedback.jsx';
import Registration from './components/Registration/Registration.jsx';
import LoginPage from './components/Login/Login.jsx';
import MenuInventory from './components/MenuInventory/MenuInventory.jsx';
import UserMenu from './components/MenuInventory/MenuInventory_user.jsx';

function App() {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<Layout />}>
          <Route index element={<Home />} />
          <Route path='about' element={<About />} />
          <Route path='subscription' element={<Subscription />} />
          <Route path='feedback' element={<Feedback />} />
          <Route path='register' element={<Registration />} />
          <Route path='login' element={<LoginPage />} />
          <Route path='menu_inventory' element={<MenuInventory />} />
          <Route path='menu_inventory_user' element={<UserMenu />} />
          <Route path='user/:userid' element={<User />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
