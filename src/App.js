import './App.css';
import  {BrowserRouter,Routes,Route} from "react-router-dom"
import Register from './Register'; 
import Login from "./Login"
import Admin from './Admin';
import User from './User';
import Adminportal from './Adminportal';
import { UserProvider } from './Usercontext';
function App() {

  
  return (
    <>
   
<BrowserRouter>
<UserProvider>
<Routes>
  <Route path="/register" element={<Register/>}></Route>
  <Route path="/" element={<Login/>}></Route>
  <Route path="/adminportal" element={<Adminportal/>}></Route>
  <Route path="/admin" element={<Admin/>}></Route>
  <Route path="/dashboard" element={<User/>}></Route>

  </Routes>
  </UserProvider>
  </BrowserRouter>
  </>
  );
}

export default App;
