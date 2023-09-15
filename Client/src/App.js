import './assets/css/App.css';
import {
    BrowserRouter as Router,
    Routes,
    Route
} from "react-router-dom";

import Home from "./pages/Home";

import Login from "./pages/Auth/Login";
import Logout from "./pages/Auth/Logout";
import Signup from "./pages/Auth/Signup";
import Orders from './pages/Orders';
import SingleOrder from './pages/SingleOrder';
import NewOrder from './pages/NewOrder';

function App() {
    return (
        <Router>
            <Routes>
               <Route path='/' element={<Home />} />

               <Route path='/auth/login'  element={<Login />} />
               <Route path='/auth/signup' element={<Signup />} />
               <Route path='/auth/logout' element={<Logout />} />

                <Route path='/orders' element={<Orders />} />
                <Route path='/orders/:id' element={<SingleOrder />} />
                <Route path='/orders/new' element={<NewOrder />} />
            </Routes>
        </Router>
    );
}

export default App;
