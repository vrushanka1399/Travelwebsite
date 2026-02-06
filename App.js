import {BrowserRouter,Routes,Route} from "react-router-dom";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Bookings from "./pages/Bookings";
import Listings from "./pages/Listings";

function App(){
 return(
  <BrowserRouter>
   <Routes>
    <Route path="/" element={<Login/>}/>
    <Route path="/dashboard" element={<Dashboard/>}/>
    <Route path="/bookings" element={<Bookings/>}/>
    <Route path="/listings" element={<Listings/>}/>
   </Routes>
  </BrowserRouter>
 );
}

export default App;
