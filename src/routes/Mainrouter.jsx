import { Routes, Route, Navigate, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import PropTypes from "prop-types";

// ============================Layouts and Pages ============================
import Layout from "../layouts/Layout/ALLlayout";

//============================ Admin Pages============================
import AdminDashboard from "../pages/dashboard/Dashboard";
import IssueBooks from "../pages/issuebooks/IssueBooks";
import Profile from "../pages/profile/Profile";
import TotalBooks from "../pages/totalbooks/TotalBooks";
import UpdateProfile from "../pages/updateprofile/UpdateProfile";
import BooksManager from "../pages/booksmanage/BooksManager";
import UserManager from "../pages/usermanage/Usermanage";
import AuthorManage from "../pages/authormanage/authmanage";

//============================ User Pages============================
import UserDashboard from "../pages/Userdashboard/userdashboard";
import UserTotalBooks from "../pages/UserTotalBooks/UserTotalbooks";
import UserBorrowBooks from "../pages/UserBorrowBooks/UserBorrowbooks";
import UserProfile from "../pages/UserProfile/Userprofile";

// ============================Authentication ============================
import Login from "../pages/login/Login";
import Register from "../pages/register/Register";

const ProtectedRoute = ({ element, isAuthenticated }) => {
  return isAuthenticated ? element : <Navigate to="/" />;
};

ProtectedRoute.propTypes = {
  element: PropTypes.element.isRequired,
  isAuthenticated: PropTypes.bool.isRequired,
};

function MainRouter() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isAdmin, setIsAdmin] = useState(null);
  const navigate = useNavigate();

  const handleLogin = (role) => {
    setIsAuthenticated(true);
    setIsAdmin(role);
    // localStorage.setItem("Token", "true");
    localStorage.setItem("IsAdmin", role);

    if (role === "admin") {
      navigate("/dashboard");
    } else {
      navigate("/UserDashboard");
    }
  };

  // useEffect(() => {
  //   const token = localStorage.getItem("Token");
  //   const role = localStorage.getItem("IsAdmin");
  //   if (token) {
  //     setIsAuthenticated(true);
  //     setIsAdmin(role);
  //   }
  // }, []);

  useEffect(() => {
    const token = localStorage.getItem("Token");
    const role = localStorage.getItem("IsAdmin");
    if (token) {
      setIsAuthenticated(true);
      setIsAdmin(role);
    } else {
      setIsAuthenticated(false);
      setIsAdmin(null); 
    }
  }, []);

  return (
    <Routes>
      {/* ============================Login  ============================ */}
      <Route path="/" element={<Login onLogin={handleLogin} />} />
      <Route path="/register" element={<Register onLogin={handleLogin} />} />

      {/* ============================Admin ============================*/}
      {isAdmin === "admin" && (
        <>
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute
                element={
                  <Layout>
                    <AdminDashboard />
                  </Layout>
                }
                isAuthenticated={isAuthenticated}
              />
            }
          />
          <Route
            path="/BooksManager"
            element={
              <ProtectedRoute
                element={
                  <Layout>
                    <BooksManager />
                  </Layout>
                }
                isAuthenticated={isAuthenticated}
              />
            }
          />
          <Route
            path="/AuthorManage"
            element={
              <ProtectedRoute
                element={
                  <Layout>
                    <AuthorManage />
                  </Layout>
                }
                isAuthenticated={isAuthenticated}
              />
            }
          />
          <Route
            path="/UserManager"
            element={
              <ProtectedRoute
                element={
                  <Layout>
                    <UserManager />
                  </Layout>
                }
                isAuthenticated={isAuthenticated}
              />
            }
          />
          <Route
            path="/issuebooks"
            element={
              <ProtectedRoute
                element={
                  <Layout>
                    <IssueBooks />
                  </Layout>
                }
                isAuthenticated={isAuthenticated}
              />
            }
          />
          <Route
            path="/profile"
            element={
              <ProtectedRoute
                element={
                  <Layout>
                    <Profile />
                  </Layout>
                }
                isAuthenticated={isAuthenticated}
              />
            }
          />
          <Route
            path="/totalbooks"
            element={
              <ProtectedRoute
                element={
                  <Layout>
                    <TotalBooks />
                  </Layout>
                }
                isAuthenticated={isAuthenticated}
              />
            }
          />
          <Route
            path="/updateprofile"
            element={
              <ProtectedRoute
                element={
                  <Layout>
                    <UpdateProfile />
                  </Layout>
                }
                isAuthenticated={isAuthenticated}
              />
            }
          />
        </>
      )}

      {/*============================ User ============================*/}
      {isAdmin === "user" && (
        <>
          <Route
            path="/UserDashboard"
            element={
              <ProtectedRoute
                element={<UserDashboard />}
                isAuthenticated={isAuthenticated}
              />
            }
          />
          <Route
            path="/UserTotalBooks"
            element={
              <ProtectedRoute
                element={<UserTotalBooks />}
                isAuthenticated={isAuthenticated}
              />
            }
          />
          <Route
            path="/UserBorrowBooks"
            element={
              <ProtectedRoute
                element={<UserBorrowBooks />}
                isAuthenticated={isAuthenticated}
              />
            }
          />
          <Route
            path="/UserProfile"
            element={
              <ProtectedRoute
                element={<UserProfile />}
                isAuthenticated={isAuthenticated}
              />
            }
          />
        </>
      )}
    </Routes>
  );
}

export default MainRouter;
