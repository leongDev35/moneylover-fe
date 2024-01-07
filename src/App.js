import { Button, Space, DatePicker, version } from 'antd';
import { Navigate, Route, Routes, } from "react-router-dom";
import Login from './page/Login';




import Navbar from './component/navbar/Navbar';
import HomePage from './page/HomePage';
import FillPage from './page/FillPage';
import Register from './page/Register';
import ChartComponent from './page/ChartComponent';
export const SITE = "http://localhost:3001"

function App() {
  return (
    <Routes>
      <Route path="*" element={<HomePage />} />
      <Route path="/home" element={<HomePage />} />
      <Route path="/search" element={<FillPage />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/chart" element={<ChartComponent />} />

    </Routes>
  );
}

export default App;
