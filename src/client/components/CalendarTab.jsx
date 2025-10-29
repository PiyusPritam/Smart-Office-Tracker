import React, { useState, useEffect } from 'react';
import './CalendarTab.css';

export default function CalendarTab({ user, attendanceService }) {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [calendarData, setCalendarData] = useState([]);
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedDateDetails, setSelectedDateDetails] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (user) {
      loadCalendarData();
    }
  }, [user, currentDate]);

  const loadCalendarData = async () => {
    try {
      setLoading(true);
      if (!user) return;
      
      const userId = typeof user.sys_id === 'object' ? user.sys_id.value : user.sys_id;
      const month = currentDate.getMonth() + 1;
      const year = currentDate.getFullYear();
      
      const data = await attendanceService.getUserCalendarData(userId, month, year);
      setCalendarData(data);
    } catch (error) {
      console.error('Error loading calendar data:', error);
    } finally {
      setLoading(false);
    }
  };

  const loadDateDetails = async (date) => {
    try {
      if (!user) return;
      
      const userId = typeof user.sys_id === 'object' ? user.sys_id.value : user.sys_id;
      const sessions = await attendanceService.getUserSessions(userId, date);
      const summary = await attendanceService.getUserDailySummary(userId, date);
      
      setSelectedDateDetails({ sessions, summary, date });
    } catch (error) {
      console.error('Error loading date details:', error);
    }
  };

  const getDaysInMonth = (date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();
    const startingDayOfWeek = firstDay.getDay();

    const days = [];
    
    // Add empty cells for days before the first day of the month
    for (let i = 0; i < startingDayOfWeek; i++) {
      days.push(null);
    }
    
    // Add all days of the month
    for (let day = 1; day <= daysInMonth; day++) {
      days.push(day);
    }
    
    return days;
  };

  const getDateData = (day) => {
    if (!day) return null;
    
    const dateStr = `${currentDate.getFullYear()}-${String(currentDate.getMonth() + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
    return calendarData.find(item => {
      const itemDate = typeof item.date === 'object' ? item.date.value : item.date;
      return itemDate === dateStr;
    });
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

  const handleDateClick = (day) => {
    if (!day) return;
    
    const dateStr = `${currentDate.getFullYear()}-${String(currentDate.getMonth() + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
    setSelectedDate(dateStr);
    loadDateDetails(dateStr);
  };

  const navigateMonth = (direction) => {
    const newDate = new Date(currentDate);
    newDate.setMonth(currentDate.getMonth() + direction);
    setCurrentDate(newDate);
    setSelectedDate(null);
    setSelectedDateDetails(null);
  };

  const days = getDaysInMonth(currentDate);
  const monthNames = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];
  const dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  return (
    <div className="calendar-tab">
      <div className="calendar-header">
        <h2>📅 Attendance Calendar</h2>
        <p>View your daily attendance hours and detailed breakdown</p>
      </div>

      <div className="calendar-container">
        <div className="calendar-section">
          <div className="calendar-controls">
            <button className="btn btn-secondary" onClick={() => navigateMonth(-1)}>
              ← Previous
            </button>
            <h3>{monthNames[currentDate.getMonth()]} {currentDate.getFullYear()}</h3>
            <button className="btn btn-secondary" onClick={() => navigateMonth(1)}>
              Next →
            </button>
          </div>

          {loading ? (
            <div className="calendar-loading">
              <div className="loading-spinner"></div>
              <p>Loading calendar data...</p>
            </div>
          ) : (
            <div className="calendar-grid">
              {dayNames.map(dayName => (
                <div key={dayName} className="day-header">
                  {dayName}
                </div>
              ))}
              
              {days.map((day, index) => {
                const dateData = getDateData(day);
                const isToday = day && 
                  new Date().getDate() === day && 
                  new Date().getMonth() === currentDate.getMonth() && 
                  new Date().getFullYear() === currentDate.getFullYear();
                const isSelected = selectedDate && 
                  selectedDate === `${currentDate.getFullYear()}-${String(currentDate.getMonth() + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;

                return (
                  <div 
                    key={index} 
                    className={`calendar-day ${!day ? 'empty' : ''} ${isToday ? 'today' : ''} ${isSelected ? 'selected' : ''} ${dateData ? 'has-data' : ''}`}
                    onClick={() => handleDateClick(day)}
                  >
                    {day && (
                      <>
                        <div className="day-number">{day}</div>
                        {dateData && (
                          <div className="day-info">
                            <div 
                              className="status-dot" 
                              style={{ backgroundColor: getStatusColor(dateData.status) }}
                            ></div>
                            <div className="hours-text">
                              {formatDuration(dateData.total_hours)}
                            </div>
                          </div>
                        )}
                      </>
                    )}
                  </div>
                );
              })}
            </div>
          )}

          <div className="calendar-legend">
            <div className="legend-item">
              <div className="legend-dot" style={{ backgroundColor: '#2ecc71' }}></div>
              <span>Present</span>
            </div>
            <div className="legend-item">
              <div className="legend-dot" style={{ backgroundColor: '#3498db' }}></div>
              <span>Partial</span>
            </div>
            <div className="legend-item">
              <div className="legend-dot" style={{ backgroundColor: '#f39c12' }}></div>
              <span>On Leave</span>
            </div>
            <div className="legend-item">
              <div className="legend-dot" style={{ backgroundColor: '#e74c3c' }}></div>
              <span>Absent</span>
            </div>
          </div>
        </div>

        {selectedDateDetails && (
          <div className="date-details-section">
            <div className="card">
              <div className="card-title">
                📊 Details for {new Date(selectedDate).toLocaleDateString('en-US', { 
                  weekday: 'long', 
                  year: 'numeric', 
                  month: 'long', 
                  day: 'numeric' 
                })}
              </div>
              
              <div className="card-content">
                {selectedDateDetails.summary ? (
                  <div className="summary-details">
                    <div className="summary-grid">
                      <div className="summary-item">
                        <div className="summary-label">Status</div>
                        <div className={`summary-value status-${selectedDateDetails.summary.status}`}>
                          {typeof selectedDateDetails.summary.status === 'object' 
                            ? selectedDateDetails.summary.status.display_value 
                            : selectedDateDetails.summary.status || 'N/A'}
                        </div>
                      </div>
                      
                      <div className="summary-item">
                        <div className="summary-label">First Login</div>
                        <div className="summary-value">
                          {formatTime(selectedDateDetails.summary.first_login)}
                        </div>
                      </div>
                      
                      <div className="summary-item">
                        <div className="summary-label">Last Logout</div>
                        <div className="summary-value">
                          {formatTime(selectedDateDetails.summary.last_logout)}
                        </div>
                      </div>
                      
                      <div className="summary-item">
                        <div className="summary-label">Total Hours</div>
                        <div className="summary-value">
                          {formatDuration(selectedDateDetails.summary.total_hours)}
                        </div>
                      </div>
                      
                      <div className="summary-item">
                        <div className="summary-label">Working Hours</div>
                        <div className="summary-value">
                          {formatDuration(selectedDateDetails.summary.working_hours)}
                        </div>
                      </div>
                      
                      <div className="summary-item">
                        <div className="summary-label">Breaks Taken</div>
                        <div className="summary-value">
                          {selectedDateDetails.summary.no_of_breaks || 0}
                        </div>
                      </div>
                    </div>

                    {selectedDateDetails.sessions.length > 0 && (
                      <div className="sessions-section">
                        <h4>📝 Session Details</h4>
                        <div className="sessions-list">
                          {selectedDateDetails.sessions.map((session, index) => {
                            const loginTime = typeof session.login_time === 'object' 
                              ? session.login_time.display_value 
                              : session.login_time;
                            const logoutTime = typeof session.logout_time === 'object' 
                              ? session.logout_time.display_value 
                              : session.logout_time;
                            const sessionType = typeof session.session_type === 'object' 
                              ? session.session_type.display_value 
                              : session.session_type;

                            return (
                              <div key={index} className="session-item">
                                <div className={`session-type session-${sessionType}`}>
                                  {sessionType === 'work' ? '💼' : '☕'} {sessionType.toUpperCase()}
                                </div>
                                <div className="session-times">
                                  <span>{formatTime(loginTime)}</span>
                                  <span>→</span>
                                  <span>{logoutTime ? formatTime(logoutTime) : 'Ongoing'}</span>
                                </div>
                                {session.session_duration && (
                                  <div className="session-duration">
                                    {formatDuration(session.session_duration / 60)}
                                  </div>
                                )}
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    )}
                  </div>
                ) : (
                  <div className="no-data">
                    <p>No attendance data available for this date.</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}