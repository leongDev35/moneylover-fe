import { Navigate, Route, Routes, } from "react-router-dom";
import Login from './page/Login';
import { useSelector } from "react-redux";




import Navbar from './component/navbar/Navbar';
import HomePage from './page/HomePage';
import FillPage from './page/FillPage';
import Register from './page/Register';
import ChartComponent from './page/ChartComponent';
// export const SITE = "http://localhost:3001"
export const SITE = "https://moneylover-be.onrender.com"

function App() {
  const user = useSelector(({ users }) => {
    return users.currentUser

  })
  const walletDefault = useSelector(({ wallet }) => {
    return wallet.defaultWallet

  })
  console.log(walletDefault);
  const CurrentListWallet = useSelector(({ wallet }) => {
    return wallet.currentListWallet

  })
  console.log(CurrentListWallet);
  return (
    <Routes>
          <Route path="/register" element={<Register />} />

      {user && CurrentListWallet && walletDefault ?
        <>
          <Route path="*" element={<HomePage />} />
          <Route path="/home" element={<HomePage />} />
          <Route path="/search" element={<FillPage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/chart" element={<ChartComponent />} />
        </>

        : <>
          <Route path={"*"} element={<Login />} />
        </>

      }
    </Routes>
  );
}

export default App;
