import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import "./App.css";
import Login from "./Components/Login";
import OTPPage from "./Components/Otp";
import Sidebar from "./Components/Sidebar";
import RegistrationForm from "./Components/Registor";
import Home from "./Components/Home";
import Members from "./Components/Members";
import District from "./Components/Utility/District";
import Taluka from "./Components/Utility/Taluka";
import Village from "./Components/Utility/Village";
import Education from "./Components/Utility/Education";
import Relation from "./Components/Utility/Relation";
import BloodGroup from "./Components/Utility/BloodGroup";
import Occupation from "./Components/Utility/Occupation";
import Commitee from "./Components/Utility/Commitee";
import CommiteeMembers from "./Components/CommiteeMembers";
import Navbar from "./Components/Navbar";
import News from "./Components/News";
import Business from "./Components/Business";
import Report from "./Components/Report";
import Logout from "./Components/Logout";
import { UserRoleProvider } from "./Context/UserRoleContext";
import { TokenProvider } from "./Context/TokenProvider"; // Import TokenProvider
import NewsMessage from './User Components/NewsMessage';
import BusinessDetails from './User Components/BusinessDetails';
import UserSidebar from "./User Components/UserSidebar";
import UserNavbar from "./User Components/UserNavbar";
import UserHome from "./User Components/UserHome";

const AppLayout = ({ children }) => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  return (
    <div className={`app-container ${sidebarOpen ? "" : "sidebar-closed"}`}>
      <Sidebar open={sidebarOpen} />
      <div className="content-container">
        <Navbar open={sidebarOpen} setOpen={setSidebarOpen} />
        <div className="content">{children}</div>
      </div>
    </div>
  );
};

const UserLayout = ({ children }) => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  return (
    <div className={`app-container ${sidebarOpen ? "" : "sidebar-closed"}`}>
      <UserSidebar open={sidebarOpen} />
      <div className="content-container">
        <UserNavbar open={sidebarOpen} setOpen={setSidebarOpen} />
        <div className="content">
          <div className={`user-home-container ${sidebarOpen ? "" : "sidebar-closed"}`}>
            {children}
          </div>
        </div>
      </div>
    </div>
  );
};

function App() {
  const [userRole, setUserRole] = useState(null);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("member"));
    if (user && user.role) {
      setUserRole(user.role);
    }
  }, []);

  const handleOTPVerification = (role, token) => {
    setUserRole(role);
    localStorage.setItem("member", JSON.stringify({ role, token }));
  };

  return (
    <TokenProvider>
      <Router>
        <Routes>
          <Route exact path="/" element={<Login />} />
          <Route exact path="/register" element={<RegistrationForm />} />
          <Route exact path="/otp" element={<OTPPage onVerify={handleOTPVerification} />} />

          {userRole === "admin" && (
            <>
              <Route exact path="/home" element={<AppLayout><Home /></AppLayout>} />
              <Route exact path="/members" element={<AppLayout><Members /></AppLayout>} />
              <Route exact path="/district" element={<AppLayout><District /></AppLayout>} />
              <Route exact path="/taluka" element={<AppLayout><Taluka /></AppLayout>} />
              <Route exact path="/village" element={<AppLayout><Village /></AppLayout>} />
              <Route exact path="/education" element={<AppLayout><Education /></AppLayout>} />
              <Route exact path="/relation" element={<AppLayout><Relation /></AppLayout>} />
              <Route exact path="/bloodGroup" element={<AppLayout><BloodGroup /></AppLayout>} />
              <Route exact path="/occupation" element={<AppLayout><Occupation /></AppLayout>} />
              <Route exact path="/commitee" element={<AppLayout><Commitee /></AppLayout>} />
              <Route exact path="/commitee-members" element={<AppLayout><CommiteeMembers /></AppLayout>} />
              <Route exact path="/news" element={<AppLayout><News /></AppLayout>} />
              <Route exact path="/business" element={<AppLayout><Business /></AppLayout>} />
              <Route exact path="/reports" element={<AppLayout><Report /></AppLayout>} />
              <Route exact path="/logout" element={<AppLayout><Logout /></AppLayout>} />
            </>
          )}

          {userRole === "member" && (
            <>
              <Route path="/userProfile" element={<UserLayout><UserHome /></UserLayout>} />
              <Route path="/businessDetails" element={<UserLayout><BusinessDetails /></UserLayout>} />
              <Route path="/newsMessage" element={<UserLayout><NewsMessage /></UserLayout>} />
            </>
          )}

          <Route path="*" element={<Navigate to={userRole === "admin" ? "/home" : userRole === "member" ? "/userProfile" : "/"} />} />
        </Routes>
      </Router>
    </TokenProvider>
  );
}

export default App;
