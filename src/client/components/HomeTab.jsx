import React, { useState, useEffect } from 'react';
import './HomeTab.css';

export default function HomeTab({ user, status, onStatusChange, attendanceService }) {
  const [dailySummary, setDailySummary] = useState(null);
  const [sessions, setSessions] = useState([]);
  const [progressTime, setProgressTime] = useState(0);
  const [manager, setManager] = useState(null);
  const [teamStatus, setTeamStatus] = useState([]);
  const [badges, setBadges] = useState([]);

  useEffect(() => {
    if (user) {
      loadDailySummary();
      loadSessions();
      loadManagerInfo();
      loadTeamStatus();
      loadBadges();
    }
  }, [user]);

  useEffect(() => {
    const interval = setInterval(() => {
      if (status === 'online' && dailySummary?.first_login) {
        const firstLogin = new Date(dailySummary.first_login);
        const now = new Date();
        const diffMs = now - firstLogin;
        const hours = Math.floor(diffMs / (1000 * 60 * 60));
        const minutes = Math.floor((diffMs % (1000 * 60 * 60)) / (1000 * 60));
        setProgressTime(hours + minutes / 60);
      }
    }, 60000); // Update every minute

    return () => clearInterval(interval);
  }, [status, dailySummary]);

  const loadDailySummary = async () => {
    try {
      if (!user) return;
      const userId = typeof user.sys_id === 'object' ? user.sys_id.value : user.sys_id;
      const summary = await attendanceService.getUserDailySummary(userId);
      setDailySummary(summary);
    } catch (error) {
      console.error('Error loading daily summary:', error);
    }
  };

  const loadSessions = async () => {
    try {
      if (!user) return;
      const userId = typeof user.sys_id === 'object' ? user.sys_id.value : user.sys_id;
      const userSessions = await attendanceService.getUserSessions(userId);
      setSessions(userSessions);
    } catch (error) {
      console.error('Error loading sessions:', error);
    }
  };

  const loadManagerInfo = async () => {
    try {
      if (user?.manager) {
        const managerId = typeof user.manager === 'object' ? user.manager.value : user.manager;
        if (managerId) {
          // Manager data is already available from user object when sysparm_display_value=all
          const managerName = typeof user.manager === 'object' ? user.manager.display_value : 'Manager';
          setManager({ name: managerName });
        }
      }
    } catch (error) {
      console.error('Error loading manager info:', error);
    }
  };

  const loadTeamStatus = async () => {
    try {
      const teamData = await attendanceService.getTeamAttendance();
      setTeamStatus(teamData.slice(0, 5)); // Show top 5 team members
    } catch (error) {
      console.error('Error loading team status:', error);
    }
  };

  const loadBadges = () => {
    // Mock badge system based on attendance
    const mockBadges = [
      { name: 'Perfect Attendance', month: 'November', icon: '🏆' },
      { name: 'Early Bird', month: 'October', icon: '🌅' },
      { name: 'Team Player', month: 'September', icon: '🤝' }
    ];
    setBadges(mockBadges);
  };

  const getStatusAction = () => {
    switch (status) {
      case 'logout':
        return { action: 'Login', color: 'success', newStatus: 'online' };
      case 'online':
        return { action: 'Take Break', color: 'warning', newStatus: 'on_break' };
      case 'on_break':
        return { action: 'End Break', color: 'primary', newStatus: 'online' };
      default:
        return { action: 'Logout', color: 'danger', newStatus: 'logout' };
    }
  };

  const handleStatusAction = async () => {
    const { newStatus } = getStatusAction();
    
    if (newStatus === 'logout') {
      const isLastLogout = window.confirm('Is this your last logout for the day?');
      if (!isLastLogout && status !== 'logout') {
        // If not last logout, just take a break
        await onStatusChange('on_break');
        return;
      }
    }
    
    await onStatusChange(newStatus);
    await loadDailySummary();
    await loadSessions();
  };

  const formatTime = (timeString) => {
    if (!timeString) return 'N/A';
    const date = new Date(timeString);
    return date.toLocaleTimeString('en-US', { 
      hour: '2-digit', 
      minute: '2-digit',
      hour12: true 
    });
  };

  const formatDuration = (hours) => {
    const h = Math.floor(hours);
    const m = Math.round((hours - h) * 60);
    return `${h}h ${m}m`;
  };

  if (!user) {
    return <div className="home-tab">Loading user data...</div>;
  }

  const { action, color } = getStatusAction();
  const userName = typeof user.name === 'object' ? user.name.display_value : user.name;
  const workLocation = typeof user.x_994053_smart_off_work_location === 'object' 
    ? user.x_994053_smart_off_work_location.display_value 
    : user.x_994053_smart_off_work_location || 'Not Set';
  const shift = typeof user.x_994053_smart_off_shift === 'object' 
    ? user.x_994053_smart_off_shift.display_value 
    : 'Not Assigned';

  return (
    <div className="home-tab">
      <div className="home-grid">
        {/* Left Column */}
        <div className="left-column">
          {/* Personal Info Card */}
          <div className="card personal-info-card">
            <div className="card-title">👤 Personal Dashboard</div>
            <div className="card-content">
              <div className="info-row">
                <span className="info-label">Name:</span>
                <span className="info-value">{userName}</span>
              </div>
              <div className="info-row">
                <span className="info-label">Work Location:</span>
                <span className="info-value">{workLocation}</span>
              </div>
              <div className="info-row">
                <span className="info-label">Status:</span>
                <span className={`status-badge status-${status}`}>
                  {status.replace('_', ' ').toUpperCase()}
                </span>
              </div>
              <div className="info-row">
                <span className="info-label">Total Hours:</span>
                <span className="info-value">
                  {dailySummary?.total_hours ? formatDuration(parseFloat(dailySummary.total_hours)) : '0h 0m'}
                </span>
              </div>
              <div className="info-row">
                <span className="info-label">Shift:</span>
                <span className="info-value">{shift}</span>
              </div>
              <div className="action-buttons">
                <button 
                  className={`btn btn-${color}`}
                  onClick={handleStatusAction}
                >
                  {action}
                </button>
                {status !== 'logout' && (
                  <button 
                    className="btn btn-danger"
                    onClick={() => onStatusChange('logout')}
                  >
                    Logout
                  </button>
                )}
              </div>
            </div>
          </div>

          {/* Manager Card */}
          <div className="card manager-card">
            <div className="card-title">👨‍💼 Reporting Manager</div>
            <div className="card-content">
              {manager ? (
                <div className="manager-info">
                  <p><strong>{manager.name}</strong></p>
                  <p>Available for queries and support</p>
                </div>
              ) : (
                <div className="error-message">
                  ⚠️ No reporting manager assigned. Please contact HR.
                </div>
              )}
            </div>
          </div>

          {/* Team Status Card */}
          <div className="card team-status-card">
            <div className="card-title">👥 Team Login Status</div>
            <div className="card-content">
              {teamStatus.length > 0 ? (
                <div className="team-list">
                  {teamStatus.map((member, index) => {
                    const memberName = typeof member.user === 'object' ? member.user.display_value : 'Unknown';
                    const memberStatus = typeof member.current_status === 'object' ? member.current_status.value : member.current_status;
                    
                    return (
                      <div key={index} className="team-member">
                        <span className="member-name">{memberName}</span>
                        <span className={`member-status status-${memberStatus}`}>
                          {memberStatus?.replace('_', ' ').toUpperCase() || 'OFFLINE'}
                        </span>
                      </div>
                    );
                  })}
                </div>
              ) : (
                <p>No team members found for today.</p>
              )}
            </div>
          </div>
        </div>

        {/* Right Column */}
        <div className="right-column">
          {/* Progress Tracker Card */}
          <div className="card progress-card">
            <div className="card-title">⏱️ Progress Tracker</div>
            <div className="card-content">
              <div className="progress-info">
                <div className="time-display">
                  <div className="current-time">
                    {formatDuration(progressTime)}
                  </div>
                  <div className="time-label">Time Worked Today</div>
                </div>
                
                <div className="progress-details">
                  <div className="detail-item">
                    <span className="detail-label">First Login:</span>
                    <span className="detail-value">
                      {dailySummary?.first_login ? formatTime(dailySummary.first_login) : 'Not logged in'}
                    </span>
                  </div>
                  <div className="detail-item">
                    <span className="detail-label">Last Activity:</span>
                    <span className="detail-value">
                      {dailySummary?.last_logout ? formatTime(dailySummary.last_logout) : 'Active'}
                    </span>
                  </div>
                  <div className="detail-item">
                    <span className="detail-label">Breaks Taken:</span>
                    <span className="detail-value">
                      {dailySummary?.no_of_breaks || 0}
                    </span>
                  </div>
                </div>

                {status === 'online' && (
                  <div className="progress-bar">
                    <div 
                      className="progress-fill"
                      style={{ width: `${Math.min((progressTime / 8) * 100, 100)}%` }}
                    ></div>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Badges Card */}
          <div className="card badges-card">
            <div className="card-title">🏅 My Badges</div>
            <div className="card-content">
              {badges.length > 0 ? (
                <div className="badges-grid">
                  {badges.map((badge, index) => (
                    <div key={index} className="badge-item">
                      <div className="badge-icon">{badge.icon}</div>
                      <div className="badge-info">
                        <div className="badge-name">{badge.name}</div>
                        <div className="badge-month">{badge.month}</div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <p>No badges earned yet. Keep up the good work!</p>
              )}
              <div className="badges-footer">
                <small>Showing last 3 months. Scroll for more...</small>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}