import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import MarksCalculation from './pages/MarksCalculation';
import ViewResults from './pages/ViewResults';
import ProctorSection from './pages/ProctorSection';
import CameraFeed from './pages/CameraFeed';
import MarksSubmissionView from './pages/MarksSubmissionView';
import ProtectedRoute from './components/ProtectedRoute';
import DevelopmentNotice from './components/DevelopmentNotice';

function App() {
  return (
    <Router>
      <DevelopmentNotice />
      <Toaster
        position="top-right"
        toastOptions={{
          duration: 3000,
          style: {
            background: '#363636',
            color: '#fff',
          },
          success: {
            duration: 3000,
            iconTheme: {
              primary: '#10B981',
              secondary: '#FFFFFF',
            },
          },
          error: {
            duration: 3000,
            iconTheme: {
              primary: '#EF4444',
              secondary: '#FFFFFF',
            },
          },
        }}
      />
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/dashboard" element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        } />
        <Route path="/marks-calculation" element={
          <ProtectedRoute>
            <MarksCalculation />
          </ProtectedRoute>
        } />
        <Route path="/view-results" element={
          <ProtectedRoute>
            <ViewResults />
          </ProtectedRoute>
        } />
        <Route path="/marks-submission/:classroomId" element={
          <ProtectedRoute>
            <MarksSubmissionView />
          </ProtectedRoute>
        } />
        <Route path="/proctor-section" element={
          <ProtectedRoute>
            <ProctorSection />
          </ProtectedRoute>
        } />
        <Route path="/camera-feed/:classroomId" element={
          <ProtectedRoute>
            <CameraFeed />
          </ProtectedRoute>
        } />
      </Routes>
    </Router>
  );
}

export default App;