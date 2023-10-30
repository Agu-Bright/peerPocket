import "./App.css";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home/Home";
import Registration from "./pages/Registration/Registration";
import Dashboard from "./pages/dashboard/Dashboard";
import Setting from "./pages/setting/Setting";
// import VerticalTabs from "./pages/profile/Profile";
// import MyLoanDashboard from "./pages/myLoan/MyLoanDashboard";
// import LoanRequests from "./pages/loanRequests/LoanRequests";
// import SendMoney from "./pages/sendMoney/SendMoney";
// import PaymentHistory from "./pages/paymentHistory/PaymentHistory";
function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/register" element={<Registration />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/loan" element={<Setting />} />
    </Routes>
  );
}

export default App;
