import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import Home from './components/Home/Home.jsx'
import About from './components/About/About.jsx'
import Contact from './components/Contact/Contact.jsx'
import User from './components/User/User.jsx'
import './App.css';
import Layout from './layout.jsx';
import Subscription from './components/Subscription/Subscription.jsx';
import Feedback from './components/Feedback/Feedback.jsx';

function App() {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<Layout />}>
          <Route index element={<Home />} />
          <Route path='about' element={<About />} />
          <Route path='subscription' element={<Subscription />} />
          <Route path='feedback' element={<Feedback />} />
          <Route path='user/:userid' element={<User />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
