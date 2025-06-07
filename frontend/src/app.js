//App build
//Import statements
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';

import Navbar from './components/Navbar';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import JobBoardPage from './pages/JobBoardPage';
import PosterDashboard from './pages/PosterDashboard';
import JobDetailPage from './pages/JobDetailPage';
import ProtectedRoute from './components/ProtectedRoute';
import InterestedJobsPage from './pages/InterestedJobsPage';


//Visual elements
const App = () => {
  return (
    <AuthProvider>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<JobBoardPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route
            path="/poster"
            element={
              <ProtectedRoute role="poster">
                <PosterDashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/jobs/:id"
            element={
              <ProtectedRoute>
                <JobDetailPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/interested"
            element={
              <ProtectedRoute role="viewer">
              <InterestedJobsPage />
              </ProtectedRoute>
            }
          />

        </Routes>
      </Router>
    </AuthProvider>
  );
};

export default App;
