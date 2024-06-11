import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import { useCookies } from 'react-cookie';
import './App.css';
import { NewsProvider } from './Context/NewsContext';
import Login from './Components/Login';
import OTPPage from './Components/Otp';
import Sidebar from './Components/Sidebar';
import RegistrationForm from './Components/Registor';
import Home from './Components/Home';
import Members from './Components/Members';
import District from './Components/Utility/District';
import Taluka from './Components/Utility/Taluka';
import Village from './Components/Utility/Village';
import Education from './Components/Utility/Education';
import Relation from './Components/Utility/Relation';
import BloodGroup from './Components/Utility/BloodGroup';
import Occupation from './Components/Utility/Occupation';
import Commitee from './Components/Utility/Commitee';
import CommiteeMembers from './Components/CommiteeMembers';
import Navbar from './Components/Navbar';
import News from './Components/News';
import Business from './Components/Business';
import Report from './Components/Report';
import Logout from './Components/Logout';
import NewsMessage from './User Components/NewsMessage';
import BusinessDetails from './User Components/BusinessDetails';
import UserSidebar from './User Components/UserSidebar';
import UserNavbar from './User Components/UserNavbar';
import UserHome from './User Components/UserHome';
import ProtectedRoute from './Components/ProtectedRouter';
import { TokenProvider } from './Context/TokenProvider';
import { UserRoleProvider } from './Context/UserRoleContext';
import ShowAllBusiness from './User Components/ShowAllBusiness';

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
  const [cookies, setCookie, removeCookie] = useCookies(['role', 'token']);
  const [userRole, setUserRole] = useState(cookies.role || null);

  useEffect(() => {
    if (cookies.role) {
      setUserRole(cookies.role);
    }
  }, [cookies.role]);

  const handleOTPVerification = (role, token) => {
    setUserRole(role);
    setCookie('role', role, { path: '/', maxAge: 3600 });
    setCookie('token', token, { path: '/', maxAge: 3600 });
  };

  return (
    <TokenProvider>
      <UserRoleProvider>
        <NewsProvider>
          <Router>
            <Routes>
              <Route exact path="/" element={<Login />} />
              <Route exact path="/register" element={<RegistrationForm />} />
              <Route exact path="/otp" element={<OTPPage onVerify={handleOTPVerification} />} />
              <Route path="/home" element={
                <ProtectedRoute userRole={userRole} requiredRole="admin">
                  <AppLayout><Home /></AppLayout>
                </ProtectedRoute>
              } />
              <Route path="/members" element={
                <ProtectedRoute userRole={userRole} requiredRole="admin">
                  <AppLayout><Members /></AppLayout>
                </ProtectedRoute>
              } />
              <Route path="/district" element={
                <ProtectedRoute userRole={userRole} requiredRole="admin">
                  <AppLayout><District /></AppLayout>
                </ProtectedRoute>
              } />
              <Route path="/taluka" element={
                <ProtectedRoute userRole={userRole} requiredRole="admin">
                  <AppLayout><Taluka /></AppLayout>
                </ProtectedRoute>
              } />
              <Route path="/village" element={
                <ProtectedRoute userRole={userRole} requiredRole="admin">
                  <AppLayout><Village /></AppLayout>
                </ProtectedRoute>
              } />
              <Route path="/education" element={
                <ProtectedRoute userRole={userRole} requiredRole="admin">
                  <AppLayout><Education /></AppLayout>
                </ProtectedRoute>
              } />
              <Route path="/relation" element={
                <ProtectedRoute userRole={userRole} requiredRole="admin">
                  <AppLayout><Relation /></AppLayout>
                </ProtectedRoute>
              } />
              <Route path="/bloodGroup" element={
                <ProtectedRoute userRole={userRole} requiredRole="admin">
                  <AppLayout><BloodGroup /></AppLayout>
                </ProtectedRoute>
              } />
              <Route path="/occupation" element={
                <ProtectedRoute userRole={userRole} requiredRole="admin">
                  <AppLayout><Occupation /></AppLayout>
                </ProtectedRoute>
              } />
              <Route path="/commitee" element={
                <ProtectedRoute userRole={userRole} requiredRole="admin">
                  <AppLayout><Commitee /></AppLayout>
                </ProtectedRoute>
              } />
              <Route path="/commitee-members" element={
                <ProtectedRoute userRole={userRole} requiredRole="admin">
                  <AppLayout><CommiteeMembers /></AppLayout>
                </ProtectedRoute>
              } />
              <Route path="/business" element={
                <ProtectedRoute userRole={userRole} requiredRole="admin">
                  <AppLayout><Business /></AppLayout>
                </ProtectedRoute>
              } />
              <Route path="/reports" element={
                <ProtectedRoute userRole={userRole} requiredRole="admin">
                  <AppLayout><Report /></AppLayout>
                </ProtectedRoute>
              } />
              <Route path="/logout" element={
                <ProtectedRoute userRole={userRole} requiredRole="admin">
                  <AppLayout><Logout /></AppLayout>
                </ProtectedRoute>
              } />

              <Route path="/userProfile" element={
                <ProtectedRoute userRole={userRole} requiredRole="member">
                  <UserLayout><UserHome /></UserLayout>
                </ProtectedRoute>
              } />
              <Route path="/businessDetails" element={
                <ProtectedRoute userRole={userRole} requiredRole="member">
                  <UserLayout><BusinessDetails /></UserLayout>
                </ProtectedRoute>
              } />
              <Route path="/businessOverview" element={
                <ProtectedRoute userRole={userRole} requiredRole="member">
                  <UserLayout><ShowAllBusiness /></UserLayout>
                </ProtectedRoute>
              } />
              <Route path="/news" element={
                <ProtectedRoute userRole={userRole} requiredRole="admin">
                  <AppLayout><News /></AppLayout>
                </ProtectedRoute>
              } />
              <Route path="/newsMessage" element={
                <ProtectedRoute userRole={userRole} requiredRole="member">
                  <UserLayout><NewsMessage /></UserLayout>
                </ProtectedRoute>
              } />
              <Route path="*" element={<Navigate to={userRole === "admin" ? "/home" : userRole === "member" ? "/userProfile" : "/"} />} />
            </Routes>
          </Router>
        </NewsProvider>
      </UserRoleProvider>
    </TokenProvider>
  );
}

export default App;
