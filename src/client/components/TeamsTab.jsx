import React, { useState, useEffect } from 'react';
import './TeamsTab.css';

export default function TeamsTab({ user, attendanceService }) {
  const [teamData, setTeamData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [userDetails, setUserDetails] = useState(null);
  const [filters, setFilters] = useState({
    team: '',
    date: new Date().toISOString().split('T')[0],
    user: '',
    status: ''
  });

  useEffect(() => {
    loadTeamData();
  }, [filters.date]);

  useEffect(() => {
    applyFilters();
  }, [teamData, filters]);

  const loadTeamData = async () => {
    try {
      setLoading(true);
      const attendance = await attendanceService.getTeamAttendance(filters.date);
      const users = await attendanceService.getAllUsers();
      
      // Merge attendance data with user data
      const mergedData = users.map(user => {
        const userAttendance = attendance.find(att => {
          const attUserId = typeof att.user === 'object' ? att.user.value : att.user;
          const userId = typeof user.sys_id === 'object' ? user.sys_id.value : user.sys_id;
          return attUserId === userId;
        });
        
        return {
          ...user,
          attendance: userAttendance || null
        };
      });
      
      setTeamData(mergedData);
    } catch (error) {
      console.error('Error loading team data:', error);
    } finally {
      setLoading(false);
    }
  };

  const applyFilters = () => {
    let filtered = [...teamData];

    if (filters.user) {
      filtered = filtered.filter(item => {
        const userName = typeof item.name === 'object' ? item.name.display_value : item.name;
        return userName?.toLowerCase().includes(filters.user.toLowerCase());
      });
    }

    if (filters.status) {
      filtered = filtered.filter(item => {
        if (!item.attendance) return filters.status === 'absent';
        const status = typeof item.attendance.status === 'object' 
          ? item.attendance.status.value 
          : item.attendance.status;
        return status === filters.status;
      });
    }

    if (filters.team) {
      // Filter by manager/team - simplified for demo
      filtered = filtered.filter(item => {
        const manager = typeof item.manager === 'object' ? item.manager.display_value : item.manager;
        return manager?.toLowerCase().includes(filters.team.toLowerCase());
      });
    }

    setFilteredData(filtered);
  };

  const loadUserDetails = async (userData) => {
    try {
      setSelectedUser(userData);
      
      const userId = typeof userData.sys_id === 'object' ? userData.sys_id.value : userData.sys_id;
      const sessions = await attendanceService.getUserSessions(userId, filters.date);
      const summary = await attendanceService.getUserDailySummary(userId, filters.date);
      
      setUserDetails({ sessions, summary });
    } catch (error) {
      console.error('Error loading user details:', error);
    }
  };

  const handleFilterChange = (key, value) => {
    setFilters(prev => ({ ...prev, [key]: value }));
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
    if (!hours) return '0h 0m';
    const h = Math.floor(parseFloat(hours));
    const m = Math.round((parseFloat(hours) - h) * 60);
    return `${h}h ${m}m`;
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'present': return '#2ecc71';
      case 'absent': return '#e74c3c';
      case 'on_leave': return '#f39c12';
      case 'partial': return '#3498db';
      default: return '#95a5a6';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'present': return '✅';
      case 'absent': return '❌';
      case 'on_leave': return '🏖️';
      case 'partial': return '⚠️';
      default: return '⚪';
    }
  };

  return (
    <div className="teams-tab">
      <div className="teams-header">
        <h2>👥 Team Management</h2>
        <p>Monitor and manage team attendance and performance</p>
      </div>

      <div className="teams-container">
        <div className="teams-main">
          {/* Filters Section */}
          <div className="filters-section card">
            <div className="card-title">🔍 Filters</div>
            <div className="filters-grid">
              <div className="filter-group">
                <label>Date</label>
                <input
                  type="date"
                  value={filters.date}
                  onChange={(e) => handleFilterChange('date', e.target.value)}
                  className="filter-input"
                />
              </div>
              
              <div className="filter-group">
                <label>User Name</label>
                <input
                  type="text"
                  placeholder="Search by name..."
                  value={filters.user}
                  onChange={(e) => handleFilterChange('user', e.target.value)}
                  className="filter-input"
                />
              </div>
              
              <div className="filter-group">
                <label>Team/Manager</label>
                <input
                  type="text"
                  placeholder="Search by manager..."
                  value={filters.team}
                  onChange={(e) => handleFilterChange('team', e.target.value)}
                  className="filter-input"
                />
              </div>
              
              <div className="filter-group">
                <label>Status</label>
                <select
                  value={filters.status}
                  onChange={(e) => handleFilterChange('status', e.target.value)}
                  className="filter-input"
                >
                  <option value="">All Status</option>
                  <option value="present">Present</option>
                  <option value="absent">Absent</option>
                  <option value="on_leave">On Leave</option>
                  <option value="partial">Partial</option>
                </select>
              </div>
            </div>
          </div>

          {/* Team List */}
          <div className="team-list-section card">
            <div className="card-title">
              📊 Team Attendance - {new Date(filters.date).toLocaleDateString()}
            </div>
            
            {loading ? (
              <div className="loading-container">
                <div className="loading-spinner"></div>
                <p>Loading team data...</p>
              </div>
            ) : (
              <div className="team-list">
                <div className="team-list-header">
                  <div>Employee</div>
                  <div>Status</div>
                  <div>First Login</div>
                  <div>Last Logout</div>
                  <div>Total Hours</div>
                  <div>Actions</div>
                </div>
                
                <div className="team-list-body">
                  {filteredData.map((employee, index) => {
                    const name = typeof employee.name === 'object' ? employee.name.display_value : employee.name;
                    const email = typeof employee.email === 'object' ? employee.email.display_value : employee.email;
                    const currentStatus = typeof employee.x_994053_smart_off_login_status === 'object' 
                      ? employee.x_994053_smart_off_login_status.display_value 
                      : employee.x_994053_smart_off_login_status;
                    
                    const attendanceStatus = employee.attendance 
                      ? (typeof employee.attendance.status === 'object' 
                          ? employee.attendance.status.value 
                          : employee.attendance.status)
                      : 'absent';

                    return (
                      <div key={index} className="team-list-row">
                        <div className="employee-info">
                          <div className="employee-name">{name}</div>
                          <div className="employee-email">{email}</div>
                          <div className={`current-status status-${currentStatus}`}>
                            {currentStatus?.replace('_', ' ').toUpperCase() || 'OFFLINE'}
                          </div>
                        </div>
                        
                        <div className="status-cell">
                          <span 
                            className="status-badge"
                            style={{ backgroundColor: getStatusColor(attendanceStatus) }}
                          >
                            {getStatusIcon(attendanceStatus)} {attendanceStatus.replace('_', ' ').toUpperCase()}
                          </span>
                        </div>
                        
                        <div className="time-cell">
                          {employee.attendance?.first_login 
                            ? formatTime(employee.attendance.first_login)
                            : 'N/A'}
                        </div>
                        
                        <div className="time-cell">
                          {employee.attendance?.last_logout 
                            ? formatTime(employee.attendance.last_logout)
                            : 'N/A'}
                        </div>
                        
                        <div className="hours-cell">
                          {employee.attendance?.total_hours 
                            ? formatDuration(employee.attendance.total_hours)
                            : '0h 0m'}
                        </div>
                        
                        <div className="actions-cell">
                          <button
                            className="btn btn-primary btn-sm"
                            onClick={() => loadUserDetails(employee)}
                          >
                            View Details
                          </button>
                        </div>
                      </div>
                    );
                  })}
                  
                  {filteredData.length === 0 && !loading && (
                    <div className="no-data">
                      <p>No employees found matching the current filters.</p>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* User Details Sidebar */}
        {selectedUser && (
          <div className="user-details-sidebar">
            <div className="card">
              <div className="card-title">
                👤 {typeof selectedUser.name === 'object' ? selectedUser.name.display_value : selectedUser.name}
              </div>
              
              <div className="card-content">
                <div className="user-info-section">
                  <div className="info-row">
                    <span className="info-label">Email:</span>
                    <span className="info-value">
                      {typeof selectedUser.email === 'object' ? selectedUser.email.display_value : selectedUser.email}
                    </span>
                  </div>
                  
                  <div className="info-row">
                    <span className="info-label">Manager:</span>
                    <span className="info-value">
                      {typeof selectedUser.manager === 'object' 
                        ? selectedUser.manager.display_value 
                        : selectedUser.manager || 'Not Assigned'}
                    </span>
                  </div>
                  
                  <div className="info-row">
                    <span className="info-label">Shift:</span>
                    <span className="info-value">
                      {typeof selectedUser.x_994053_smart_off_shift === 'object' 
                        ? selectedUser.x_994053_smart_off_shift.display_value 
                        : 'Not Assigned'}
                    </span>
                  </div>
                </div>

                {userDetails && userDetails.summary && (
                  <div className="attendance-summary">
                    <h4>📊 Attendance Summary</h4>
                    <div className="summary-grid">
                      <div className="summary-item">
                        <div className="summary-label">Status</div>
                        <div className={`summary-value status-${userDetails.summary.status}`}>
                          {typeof userDetails.summary.status === 'object' 
                            ? userDetails.summary.status.display_value 
                            : userDetails.summary.status}
                        </div>
                      </div>
                      
                      <div className="summary-item">
                        <div className="summary-label">Working Hours</div>
                        <div className="summary-value">
                          {formatDuration(userDetails.summary.working_hours)}
                        </div>
                      </div>
                      
                      <div className="summary-item">
                        <div className="summary-label">Breaks</div>
                        <div className="summary-value">
                          {userDetails.summary.no_of_breaks || 0}
                        </div>
                      </div>
                      
                      <div className="summary-item">
                        <div className="summary-label">Work Location</div>
                        <div className="summary-value">
                          {typeof userDetails.summary.work_location === 'object' 
                            ? userDetails.summary.work_location.display_value 
                            : userDetails.summary.work_location}
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {userDetails && userDetails.sessions.length > 0 && (
                  <div className="sessions-section">
                    <h4>📝 Session Details</h4>
                    <div className="sessions-list">
                      {userDetails.sessions.map((session, index) => {
                        const sessionType = typeof session.session_type === 'object' 
                          ? session.session_type.display_value 
                          : session.session_type;
                        const loginTime = typeof session.login_time === 'object' 
                          ? session.login_time.display_value 
                          : session.login_time;
                        const logoutTime = typeof session.logout_time === 'object' 
                          ? session.logout_time.display_value 
                          : session.logout_time;

                        return (
                          <div key={index} className="session-item">
                            <div className={`session-type session-${sessionType}`}>
                              {sessionType === 'work' ? '💼' : '☕'} {sessionType?.toUpperCase()}
                            </div>
                            <div className="session-times">
                              <span>{formatTime(loginTime)}</span>
                              <span>→</span>
                              <span>{logoutTime ? formatTime(logoutTime) : 'Ongoing'}</span>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                )}

                <div className="details-actions">
                  <button
                    className="btn btn-secondary"
                    onClick={() => {setSelectedUser(null); setUserDetails(null);}}
                  >
                    Close Details
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}