export class AttendanceService {
  constructor() {
    this.userTable = 'sys_user';
    this.sessionTable = 'x_994053_smart_off_user_session';
    this.dailySummaryTable = 'x_994053_smart_off_daily_summary';
    this.shiftsTable = 'x_994053_smart_off_shifts';
    this.leavesTable = 'x_994053_smart_off_leaves';
  }

  async apiCall(url, options = {}) {
    try {
      const response = await fetch(url, {
        ...options,
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'X-UserToken': window.g_ck,
          ...options.headers
        }
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.error?.message || `HTTP ${response.status}: ${response.statusText}`);
      }

      const data = await response.json();
      return data;
    } catch (error) {
      console.error('API Call Error:', error);
      throw error;
    }
  }

  async getCurrentUser() {
    try {
      const response = await this.apiCall(`/api/now/table/${this.userTable}?sysparm_query=user_name=javascript:gs.getUserName()&sysparm_display_value=all&sysparm_limit=1`);
      
      if (response.result && response.result.length > 0) {
        return response.result[0];
      }
      return null;
    } catch (error) {
      console.error('Error fetching current user:', error);
      throw error;
    }
  }

  async getUserDailySummary(userId, date = null) {
    try {
      const today = date || new Date().toISOString().split('T')[0];
      const query = `user=${userId}^date=${today}`;
      
      const response = await this.apiCall(`/api/now/table/${this.dailySummaryTable}?sysparm_query=${encodeURIComponent(query)}&sysparm_display_value=all&sysparm_limit=1`);
      
      if (response.result && response.result.length > 0) {
        return response.result[0];
      }
      return null;
    } catch (error) {
      console.error('Error fetching daily summary:', error);
      throw error;
    }
  }

  async updateUserStatus(status) {
    try {
      const user = await this.getCurrentUser();
      if (!user) throw new Error('User not found');

      const userId = typeof user.sys_id === 'object' ? user.sys_id.value : user.sys_id;
      const now = new Date().toISOString().replace('T', ' ').substring(0, 19);
      const today = new Date().toISOString().split('T')[0];

      // Update user login status
      await this.apiCall(`/api/now/table/${this.userTable}/${userId}`, {
        method: 'PATCH',
        body: JSON.stringify({
          'x_994053_smart_off_login_status': status
        })
      });

      // Handle login/logout logic
      if (status === 'online') {
        await this.handleLogin(userId, now, today);
      } else if (status === 'logout') {
        await this.handleLogout(userId, now, today);
      }

      return true;
    } catch (error) {
      console.error('Error updating user status:', error);
      throw error;
    }
  }

  async handleLogin(userId, now, today) {
    try {
      // Create session record
      await this.apiCall(`/api/now/table/${this.sessionTable}`, {
        method: 'POST',
        body: JSON.stringify({
          user: userId,
          login_time: now,
          session_type: 'work',
          active: 'true'
        })
      });

      // Update or create daily summary
      let dailySummary = await this.getUserDailySummary(userId, today);
      
      if (dailySummary) {
        const summaryId = typeof dailySummary.sys_id === 'object' ? dailySummary.sys_id.value : dailySummary.sys_id;
        const firstLogin = dailySummary.first_login;
        
        await this.apiCall(`/api/now/table/${this.dailySummaryTable}/${summaryId}`, {
          method: 'PATCH',
          body: JSON.stringify({
            first_login: firstLogin || now,
            current_status: 'online',
            status: 'present'
          })
        });
      } else {
        await this.apiCall(`/api/now/table/${this.dailySummaryTable}`, {
          method: 'POST',
          body: JSON.stringify({
            user: userId,
            date: today,
            first_login: now,
            current_status: 'online',
            status: 'present'
          })
        });
      }
    } catch (error) {
      console.error('Error handling login:', error);
      throw error;
    }
  }

  async handleLogout(userId, now, today) {
    try {
      // End current session
      const sessionQuery = `user=${userId}^active=true^ORDERBYDESCsys_created_on`;
      const sessionResponse = await this.apiCall(`/api/now/table/${this.sessionTable}?sysparm_query=${encodeURIComponent(sessionQuery)}&sysparm_limit=1`);
      
      if (sessionResponse.result && sessionResponse.result.length > 0) {
        const session = sessionResponse.result[0];
        const sessionId = typeof session.sys_id === 'object' ? session.sys_id.value : session.sys_id;
        
        await this.apiCall(`/api/now/table/${this.sessionTable}/${sessionId}`, {
          method: 'PATCH',
          body: JSON.stringify({
            logout_time: now,
            active: 'false'
          })
        });
      }

      // Update daily summary
      const dailySummary = await this.getUserDailySummary(userId, today);
      if (dailySummary) {
        const summaryId = typeof dailySummary.sys_id === 'object' ? dailySummary.sys_id.value : dailySummary.sys_id;
        
        await this.apiCall(`/api/now/table/${this.dailySummaryTable}/${summaryId}`, {
          method: 'PATCH',
          body: JSON.stringify({
            last_logout: now,
            current_status: 'logout'
          })
        });
      }
    } catch (error) {
      console.error('Error handling logout:', error);
      throw error;
    }
  }

  async getUserSessions(userId, date = null) {
    try {
      const targetDate = date || new Date().toISOString().split('T')[0];
      const query = `user=${userId}^login_timeSTARTSWITH${targetDate}^ORDERBYlogin_time`;
      
      const response = await this.apiCall(`/api/now/table/${this.sessionTable}?sysparm_query=${encodeURIComponent(query)}&sysparm_display_value=all`);
      return response.result || [];
    } catch (error) {
      console.error('Error fetching user sessions:', error);
      throw error;
    }
  }

  async getShifts() {
    try {
      const response = await this.apiCall(`/api/now/table/${this.shiftsTable}?sysparm_query=active=true&sysparm_display_value=all`);
      return response.result || [];
    } catch (error) {
      console.error('Error fetching shifts:', error);
      throw error;
    }
  }

  async getUserLeaves(userId) {
    try {
      const query = `user=${userId}^ORDERBYDESCapplied_date`;
      const response = await this.apiCall(`/api/now/table/${this.leavesTable}?sysparm_query=${encodeURIComponent(query)}&sysparm_display_value=all`);
      return response.result || [];
    } catch (error) {
      console.error('Error fetching user leaves:', error);
      throw error;
    }
  }

  async applyLeave(leaveData) {
    try {
      const response = await this.apiCall(`/api/now/table/${this.leavesTable}`, {
        method: 'POST',
        body: JSON.stringify(leaveData)
      });
      return response.result;
    } catch (error) {
      console.error('Error applying leave:', error);
      throw error;
    }
  }

  async getAllUsers() {
    try {
      const response = await this.apiCall(`/api/now/table/${this.userTable}?sysparm_query=active=true&sysparm_display_value=all&sysparm_fields=sys_id,name,email,user_name,x_994053_smart_off_login_status,x_994053_smart_off_shift,manager`);
      return response.result || [];
    } catch (error) {
      console.error('Error fetching all users:', error);
      throw error;
    }
  }

  async getTeamAttendance(date = null) {
    try {
      const targetDate = date || new Date().toISOString().split('T')[0];
      const query = `date=${targetDate}`;
      
      const response = await this.apiCall(`/api/now/table/${this.dailySummaryTable}?sysparm_query=${encodeURIComponent(query)}&sysparm_display_value=all`);
      return response.result || [];
    } catch (error) {
      console.error('Error fetching team attendance:', error);
      throw error;
    }
  }

  async getUserCalendarData(userId, month, year) {
    try {
      const startDate = `${year}-${String(month).padStart(2, '0')}-01`;
      const endDate = new Date(year, month, 0).toISOString().split('T')[0]; // Last day of month
      
      const query = `user=${userId}^dateBETWEEN${startDate}@${endDate}`;
      const response = await this.apiCall(`/api/now/table/${this.dailySummaryTable}?sysparm_query=${encodeURIComponent(query)}&sysparm_display_value=all`);
      
      return response.result || [];
    } catch (error) {
      console.error('Error fetching calendar data:', error);
      throw error;
    }
  }
}