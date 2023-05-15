import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import 'antd/dist/reset.css';
import Home from "./pages/Home";
import Register from "./pages/Register";
import Login from "./pages/Login";
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<ProtectedRoutes> <Home /> </ProtectedRoutes>}></Route>
        <Route path="/Register" element={<Register />}></Route>
        <Route path="/Login" element={<Login />}></Route>
      </Routes>
    </BrowserRouter>
  );
}
export function ProtectedRoutes(props) {
  if(localStorage.getItem("user")){
    return props.children;
  }else {
    return <Navigate to="/login" />;
  }
}

export default App;
