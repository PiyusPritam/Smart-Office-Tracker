import React, { useState, useEffect } from 'react';
import './LeaveTrackerTab.css';

export default function LeaveTrackerTab({ user, attendanceService }) {
  const [leaves, setLeaves] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showLeaveForm, setShowLeaveForm] = useState(false);
  const [leaveForm, setLeaveForm] = useState({
    leave_type: 'earned',
    start_date: '',
    end_date: '',
    reason: ''
  });
  const [leavesRemaining, setLeavesRemaining] = useState({
    earned: 5,
    sick: 12,
    maternity: 90,
    wedding: 7,
    emergency: 3
  });

  useEffect(() => {
    if (user) {
      loadUserLeaves();
    }
  }, [user]);

  const loadUserLeaves = async () => {
    try {
      setLoading(true);
      if (!user) return;
      
      const userId = typeof user.sys_id === 'object' ? user.sys_id.value : user.sys_id;
      const userLeaves = await attendanceService.getUserLeaves(userId);
      setLeaves(userLeaves);
      
      // Calculate remaining leaves (simplified calculation)
      calculateRemainingLeaves(userLeaves);
    } catch (error) {
      console.error('Error loading leaves:', error);
    } finally {
      setLoading(false);
    }
  };

  const calculateRemainingLeaves = (userLeaves) => {
    const currentYear = new Date().getFullYear();
    const currentQuarter = Math.floor((new Date().getMonth() + 3) / 3);
    
    // Filter approved leaves for current year
    const approvedLeaves = userLeaves.filter(leave => {
      const startDate = new Date(typeof leave.start_date === 'object' ? leave.start_date.value : leave.start_date);
      const status = typeof leave.status === 'object' ? leave.status.value : leave.status;
      return startDate.getFullYear() === currentYear && status === 'approved';
    });

    // Calculate used leaves by type
    const usedLeaves = {
      earned: 0,
      sick: 0,
      maternity: 0,
      wedding: 0,
      emergency: 0
    };

    approvedLeaves.forEach(leave => {
      const leaveType = typeof leave.leave_type === 'object' ? leave.leave_type.value : leave.leave_type;
      const totalDays = parseInt(leave.total_days) || 0;
      if (usedLeaves[leaveType] !== undefined) {
        usedLeaves[leaveType] += totalDays;
      }
    });

    // Set remaining leaves
    setLeavesRemaining({
      earned: Math.max(0, (currentQuarter * 5) - usedLeaves.earned),
      sick: Math.max(0, 12 - usedLeaves.sick),
      maternity: Math.max(0, 90 - usedLeaves.maternity),
      wedding: Math.max(0, 7 - usedLeaves.wedding),
      emergency: Math.max(0, 3 - usedLeaves.emergency)
    });
  };

  const handleFormChange = (field, value) => {
    setLeaveForm(prev => ({ ...prev, [field]: value }));
  };

  const calculateTotalDays = () => {
    if (!leaveForm.start_date || !leaveForm.end_date) return 0;
    
    const start = new Date(leaveForm.start_date);
    const end = new Date(leaveForm.end_date);
    const diffTime = Math.abs(end - start);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)) + 1;
    
    return diffDays;
  };

  const handleSubmitLeave = async (e) => {
    e.preventDefault();
    
    if (!user) return;
    
    try {
      const userId = typeof user.sys_id === 'object' ? user.sys_id.value : user.sys_id;
      const totalDays = calculateTotalDays();
      
      const leaveData = {
        user: userId,
        leave_type: leaveForm.leave_type,
        start_date: leaveForm.start_date,
        end_date: leaveForm.end_date,
        total_days: totalDays.toString(),
        reason: leaveForm.reason,
        status: 'pending'
      };

      await attendanceService.applyLeave(leaveData);
      
      // Reset form and reload leaves
      setLeaveForm({
        leave_type: 'earned',
        start_date: '',
        end_date: '',
        reason: ''
      });
      setShowLeaveForm(false);
      
      await loadUserLeaves();
      
      alert('Leave request submitted successfully!');
    } catch (error) {
      console.error('Error submitting leave:', error);
      alert('Error submitting leave request. Please try again.');
    }
  };

  const formatDate = (dateString) => {
    if (!dateString) return 'N/A';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric' 
    });
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'approved': return '#2ecc71';
      case 'pending': return '#f39c12';
      case 'rejected': return '#e74c3c';
      case 'cancelled': return '#95a5a6';
      default: return '#95a5a6';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'approved': return '✅';
      case 'pending': return '⏳';
      case 'rejected': return '❌';
      case 'cancelled': return '🚫';
      default: return '⚪';
    }
  };

  const getLeaveTypeIcon = (type) => {
    switch (type) {
      case 'earned': return '🏖️';
      case 'sick': return '🤒';
      case 'maternity': return '👶';
      case 'wedding': return '💒';
      case 'emergency': return '🚨';
      default: return '📋';
    }
  };

  const leaveTypes = [
    { value: 'earned', label: 'Earned Leave' },
    { value: 'sick', label: 'Sick Leave' },
    { value: 'maternity', label: 'Maternity Leave' },
    { value: 'wedding', label: 'Wedding Leave' },
    { value: 'emergency', label: 'Emergency Leave' }
  ];

  return (
    <div className="leave-tracker-tab">
      <div className="leave-header">
        <h2>📋 Leave Tracker</h2>
        <p>Manage your leave requests and track remaining leave balance</p>
      </div>

      <div className="leave-container">
        {/* Leave Balance Cards */}
        <div className="leave-balance-section">
          <h3>📊 Leave Balance</h3>
          <div className="balance-cards">
            {leaveTypes.map(type => (
              <div key={type.value} className="balance-card card">
                <div className="balance-header">
                  <span className="leave-icon">{getLeaveTypeIcon(type.value)}</span>
                  <span className="leave-type">{type.label}</span>
                </div>
                <div className="balance-count">
                  <span className="remaining">{leavesRemaining[type.value]}</span>
                  <span className="label">Days Remaining</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Action Section */}
        <div className="leave-actions">
          <button 
            className="btn btn-success"
            onClick={() => setShowLeaveForm(!showLeaveForm)}
          >
            {showLeaveForm ? 'Cancel Request' : '+ Apply for Leave'}
          </button>
        </div>

        {/* Leave Application Form */}
        {showLeaveForm && (
          <div className="leave-form-section card">
            <div className="card-title">📝 Apply for Leave</div>
            <form onSubmit={handleSubmitLeave} className="leave-form">
              <div className="form-grid">
                <div className="form-group">
                  <label>Leave Type *</label>
                  <select
                    value={leaveForm.leave_type}
                    onChange={(e) => handleFormChange('leave_type', e.target.value)}
                    required
                    className="form-input"
                  >
                    {leaveTypes.map(type => (
                      <option key={type.value} value={type.value}>
                        {type.label}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="form-group">
                  <label>Start Date *</label>
                  <input
                    type="date"
                    value={leaveForm.start_date}
                    onChange={(e) => handleFormChange('start_date', e.target.value)}
                    required
                    min={new Date().toISOString().split('T')[0]}
                    className="form-input"
                  />
                </div>

                <div className="form-group">
                  <label>End Date *</label>
                  <input
                    type="date"
                    value={leaveForm.end_date}
                    onChange={(e) => handleFormChange('end_date', e.target.value)}
                    required
                    min={leaveForm.start_date || new Date().toISOString().split('T')[0]}
                    className="form-input"
                  />
                </div>

                <div className="form-group total-days">
                  <label>Total Days</label>
                  <div className="total-days-display">
                    {calculateTotalDays()} days
                  </div>
                </div>
              </div>

              <div className="form-group full-width">
                <label>Reason *</label>
                <textarea
                  value={leaveForm.reason}
                  onChange={(e) => handleFormChange('reason', e.target.value)}
                  required
                  placeholder="Please provide reason for leave..."
                  rows="3"
                  className="form-input"
                />
              </div>

              <div className="form-actions">
                <button type="submit" className="btn btn-primary">
                  Submit Leave Request
                </button>
                <button 
                  type="button" 
                  className="btn btn-secondary"
                  onClick={() => setShowLeaveForm(false)}
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        )}

        {/* Leave History */}
        <div className="leave-history-section card">
          <div className="card-title">📚 Leave History</div>
          
          {loading ? (
            <div className="loading-container">
              <div className="loading-spinner"></div>
              <p>Loading leave history...</p>
            </div>
          ) : (
            <div className="leave-history">
              {leaves.length > 0 ? (
                <div className="leave-list">
                  {leaves.map((leave, index) => {
                    const leaveType = typeof leave.leave_type === 'object' ? leave.leave_type.display_value : leave.leave_type;
                    const status = typeof leave.status === 'object' ? leave.status.display_value : leave.status;
                    const startDate = typeof leave.start_date === 'object' ? leave.start_date.value : leave.start_date;
                    const endDate = typeof leave.end_date === 'object' ? leave.end_date.value : leave.end_date;
                    const appliedDate = typeof leave.applied_date === 'object' ? leave.applied_date.display_value : leave.applied_date;

                    return (
                      <div key={index} className="leave-item">
                        <div className="leave-item-header">
                          <div className="leave-type-info">
                            <span className="leave-icon">{getLeaveTypeIcon(typeof leave.leave_type === 'object' ? leave.leave_type.value : leave.leave_type)}</span>
                            <span className="leave-type-name">{leaveType}</span>
                          </div>
                          <div 
                            className="status-badge"
                            style={{ backgroundColor: getStatusColor(typeof leave.status === 'object' ? leave.status.value : leave.status) }}
                          >
                            {getStatusIcon(typeof leave.status === 'object' ? leave.status.value : leave.status)} {status?.toUpperCase()}
                          </div>
                        </div>
                        
                        <div className="leave-item-details">
                          <div className="detail-row">
                            <span className="detail-label">Duration:</span>
                            <span className="detail-value">
                              {formatDate(startDate)} - {formatDate(endDate)} ({leave.total_days} days)
                            </span>
                          </div>
                          
                          <div className="detail-row">
                            <span className="detail-label">Applied:</span>
                            <span className="detail-value">{formatDate(appliedDate)}</span>
                          </div>
                          
                          {leave.reason && (
                            <div className="detail-row">
                              <span className="detail-label">Reason:</span>
                              <span className="detail-value">{leave.reason}</span>
                            </div>
                          )}
                          
                          {leave.comments && (
                            <div className="detail-row">
                              <span className="detail-label">Comments:</span>
                              <span className="detail-value">{leave.comments}</span>
                            </div>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              ) : (
                <div className="no-leaves">
                  <p>No leave requests found. Apply for your first leave above!</p>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}