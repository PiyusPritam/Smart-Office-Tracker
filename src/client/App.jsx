import React, { useState, useEffect, useMemo } from 'react';
import { AttendanceService } from './services/AttendanceService.js';
import HomeTab from './components/HomeTab.jsx';
import CalendarTab from './components/CalendarTab.jsx';
import TeamsTab from './components/TeamsTab.jsx';
import LeaveTrackerTab from './components/LeaveTrackerTab.jsx';
import './App.css';

export default function App() {
  const [activeTab, setActiveTab] = useState('home');
  const [currentUser, setCurrentUser] = useState(null);
  const [userStatus, setUserStatus] = useState('logout');
  const [loading, setLoading] = useState(true);
  
  const attendanceService = useMemo(() => new AttendanceService(), []);

  useEffect(() => {
    loadUserData();
  }, []);

  const loadUserData = async () => {
    try {
      setLoading(true);
      const userData = await attendanceService.getCurrentUser();
      setCurrentUser(userData);
      
      if (userData) {
        const status = typeof userData.x_994053_smart_off_login_status === 'object' 
          ? userData.x_994053_smart_off_login_status.value 
          : userData.x_994053_smart_off_login_status;
        setUserStatus(status || 'logout');
      }
    } catch (error) {
      console.error('Error loading user data:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleStatusChange = async (newStatus) => {
    try {
      await attendanceService.updateUserStatus(newStatus);
      setUserStatus(newStatus);
      await loadUserData(); // Refresh user data
    } catch (error) {
      console.error('Error updating status:', error);
    }
  };

  if (loading) {
    return (
      <div className="loading-container">
        <div className="loading-spinner"></div>
        <p>Loading Smart Office...</p>
      </div>
    );
  }

  const tabs = [
    { id: 'home', label: 'Home', icon: '🏠' },
    { id: 'calendar', label: 'Calendar', icon: '📅' },
    { id: 'teams', label: 'Teams', icon: '👥' },
    { id: 'leave', label: 'Leave Tracker', icon: '📋' }
  ];

  return (
    <div className="smart-office-app">
      <header className="app-header">
        <div className="header-content">
          <div className="app-title">
            <h1>Smart Office</h1>
            <span className="subtitle">Attendance Tracker</span>
          </div>
          {currentUser && (
            <div className="user-info">
              <span className="welcome-text">
                Welcome, {typeof currentUser.name === 'object' ? currentUser.name.display_value : currentUser.name}
              </span>
              <div className={`status-badge status-${userStatus}`}>
                {userStatus.replace('_', ' ').toUpperCase()}
              </div>
            </div>
          )}
        </div>
      </header>

      <nav className="tab-navigation">
        {tabs.map(tab => (
          <button
            key={tab.id}
            className={`tab-btn ${activeTab === tab.id ? 'active' : ''}`}
            onClick={() => setActiveTab(tab.id)}
          >
            <span className="tab-icon">{tab.icon}</span>
            <span className="tab-label">{tab.label}</span>
          </button>
        ))}
      </nav>

      <main className="app-content">
        {activeTab === 'home' && (
          <HomeTab 
            user={currentUser}
            status={userStatus}
            onStatusChange={handleStatusChange}
            attendanceService={attendanceService}
          />
        )}
        {activeTab === 'calendar' && (
          <CalendarTab 
            user={currentUser}
            attendanceService={attendanceService}
          />
        )}
        {activeTab === 'teams' && (
          <TeamsTab 
            user={currentUser}
            attendanceService={attendanceService}
          />
        )}
        {activeTab === 'leave' && (
          <LeaveTrackerTab 
            user={currentUser}
            attendanceService={attendanceService}
          />
        )}
      </main>
    </div>
  );
}