import "./App.css";
import { Navigate, Route, Routes } from "react-router-dom";
import Home from "./pages/Home/Home";
import Registration from "./pages/Registration/Registration";
import Dashboard from "./pages/dashboard/Dashboard";
import NewLoanRequest from "./pages/myLoan/NewLoanRequest";
import LoanRequests from "./pages/loanRequests/LoanRequests";
import Profile from "./pages/profile/Profile";
import LoanRequestsD from "./pages/loanRequests/LoanRequestD";
import { useEffect } from "react";
import axios from "axios";
import { authState } from "./context/authContext";
import LoanDetail from "./pages/loanRequestDetail/LoanDetail";
import LoanDailD from "./pages/loanRequestDetail/LoanDailD";
import DisputeChatbot from "./pages/chatBot/DisputeChatBot";
import MyLoanDashboard from "./pages/myLoan/MyLoanDashboard";
import MyLoanD from "./pages/myLoan/myLoanD";
import NewLoanD from "./pages/myLoan/NewLoanD";
// import NewLoanRequest from "./pages/myLoan/NewLoanRequest";
// import ChatBot from "./pages/chatBot/ChatBot";
// import Setting from "./pages/setting/Setting";
// import VerticalTabs from "./pages/profile/Profile";
// import MyLoanDashboard from "./pages/myLoan/MyLoanDashboard";
// import LoanRequests from "./pages/loanRequests/LoanRequests";
// import SendMoney from "./pages/sendMoney/SendMoney";
// import PaymentHistory from "./pages/paymentHistory/PaymentHistory";
function App() {
  const { setUser, user } = authState();
  useEffect(() => {
    (async () => {
      try {
        const { data } = await axios.get("/api/v1/me", {
          withCredentials: true,
          credentials: "include",
        });
        setUser(data?.user);
      } catch (error) {
        console.log(error);
      }
    })();
  }, []);
  return (
    <>
      <Routes>
        <Route
          path="/"
          element={user ? <Navigate to="/dashboard" /> : <Home />}
        />
        <Route
          path="/register"
          element={user ? <Navigate to="/dashboard" /> : <Registration />}
        />
        <Route path="/dashboard" element={<Dashboard />} />
        {/* <Route path="/loan" element={<NewLoanRequest />} /> */}
        <Route path="/loanRequest" element={<LoanRequestsD />} />
        <Route path="/createLoanReq" element={<LoanRequestsD />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/loanDetail" element={<LoanDailD />} />
        <Route path="/loan" element={<DisputeChatbot />} />
        <Route path="/myLoan" element={<MyLoanD />} />
        <Route path="/newLoan" element={<NewLoanD />} />
      </Routes>
      <div
        style={{
          margin: "20px",
          position: "absolute",
          bottom: "0",
          right: "0",
          zIndex: "999",
          background: "white",
        }}
      >
        <DisputeChatbot />
      </div>
    </>
  );
}

export default App;
