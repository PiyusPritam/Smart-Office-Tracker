import { gs, GlideRecord, GlideDateTime } from '@servicenow/glide'

export function calculateDailySummary(current, previous) {
    try {
        const userId = current.getValue('user');
        const today = new Date().toISOString().split('T')[0];
        
        // Get all sessions for the user today
        const sessionGR = new GlideRecord('x_994053_smart_off_user_session');
        sessionGR.addQuery('user', userId);
        sessionGR.addQuery('login_time', 'STARTSWITH', today);
        sessionGR.orderBy('login_time');
        sessionGR.query();
        
        let firstLogin = null;
        let lastLogout = null;
        let totalBreaks = 0;
        let totalWorkHours = 0;
        let totalBreakHours = 0;
        
        while (sessionGR.next()) {
            const loginTime = sessionGR.getValue('login_time');
            const logoutTime = sessionGR.getValue('logout_time');
            const sessionType = sessionGR.getValue('session_type');
            
            if (!firstLogin) {
                firstLogin = loginTime;
            }
            
            if (logoutTime) {
                lastLogout = logoutTime;
                
                // Calculate session duration
                const loginDate = new Date(loginTime);
                const logoutDate = new Date(logoutTime);
                const durationHours = (logoutDate - loginDate) / (1000 * 60 * 60);
                
                if (sessionType === 'work') {
                    totalWorkHours += durationHours;
                } else if (sessionType === 'break') {
                    totalBreakHours += durationHours;
                    totalBreaks++;
                }
            }
        }
        
        // Update current record with calculated values
        if (firstLogin) current.setValue('first_login', firstLogin);
        if (lastLogout) current.setValue('last_logout', lastLogout);
        
        current.setValue('total_hours', totalWorkHours + totalBreakHours);
        current.setValue('working_hours', totalWorkHours);
        current.setValue('break_hours', totalBreakHours);
        current.setValue('no_of_breaks', totalBreaks);
        
        // Determine status
        if (totalWorkHours > 0) {
            current.setValue('status', 'present');
        } else {
            current.setValue('status', 'absent');
        }
        
        gs.info('Daily summary calculated for user: ' + userId);
        
    } catch (error) {
        gs.error('Error calculating daily summary: ' + error.message);
    }
}