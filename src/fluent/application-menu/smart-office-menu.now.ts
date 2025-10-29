import '@servicenow/sdk/global'
import { ApplicationMenu, Record } from '@servicenow/sdk/core'

// Create application menu category
export const smartOfficeCategory = Record({
    $id: Now.ID['smart-office-category'], 
    table: 'sys_app_category',
    data: {
        name: 'Smart Office',
        style: `
            border-color: #667eea; 
            background: linear-gradient(135deg, rgba(102, 126, 234, 0.1), rgba(118, 75, 162, 0.1));
            background-color: #f0f2ff;
        `
    }
})

// Create main application menu
export const smartOfficeMenu = ApplicationMenu({
    $id: Now.ID['smart-office-menu'],
    title: 'Smart Office',
    hint: 'Smart Office Attendance Tracker - Manage employee attendance, shifts, and leaves',
    description: 'Comprehensive attendance tracking system for organizations',
    category: smartOfficeCategory,
    roles: ['admin', 'user'],
    active: true,
    order: 50
})

// Main Attendance Tracker UI Page
export const attendanceTrackerModule = Record({
    $id: Now.ID['attendance-tracker-module'],
    table: 'sys_app_module',
    data: {
        title: '📊 Attendance Tracker',
        application: smartOfficeMenu.$id,
        link_type: 'DIRECT',
        query: 'x_994053_smart_off_attendance.do',
        hint: 'Open the Smart Office Attendance Tracker',
        description: 'Modern UI for tracking attendance, shifts, and leaves',
        active: true,
        order: 100
    }
})

// Configuration Separator
export const configurationSeparator = Record({
    $id: Now.ID['config-separator'],
    table: 'sys_app_module',
    data: {
        title: '⚙️ Configuration',
        application: smartOfficeMenu.$id,
        link_type: 'SEPARATOR',
        active: true,
        order: 200
    }
})

// Shifts Management
export const shiftsModule = Record({
    $id: Now.ID['shifts-module'],
    table: 'sys_app_module',
    data: {
        title: 'Shifts',
        application: smartOfficeMenu.$id,
        link_type: 'LIST',
        name: 'x_994053_smart_off_shifts',
        hint: 'Manage work shifts',
        description: 'Configure and manage different work shifts',
        active: true,
        order: 210
    }
})

// Reports Separator
export const reportsSeparator = Record({
    $id: Now.ID['reports-separator'],
    table: 'sys_app_module',
    data: {
        title: '📈 Reports & Data',
        application: smartOfficeMenu.$id,
        link_type: 'SEPARATOR',
        active: true,
        order: 300
    }
})

// Daily Summaries
export const dailySummariesModule = Record({
    $id: Now.ID['daily-summaries-module'],
    table: 'sys_app_module',
    data: {
        title: 'Daily Summaries',
        application: smartOfficeMenu.$id,
        link_type: 'LIST',
        name: 'x_994053_smart_off_daily_summary',
        hint: 'View daily attendance summaries',
        description: 'Daily attendance records and summaries',
        active: true,
        order: 310
    }
})

// User Sessions
export const userSessionsModule = Record({
    $id: Now.ID['user-sessions-module'],
    table: 'sys_app_module',
    data: {
        title: 'User Sessions',
        application: smartOfficeMenu.$id,
        link_type: 'LIST',
        name: 'x_994053_smart_off_user_session',
        hint: 'View user login/logout sessions',
        description: 'Detailed user session records',
        active: true,
        order: 320
    }
})

// Leave Management
export const leavesModule = Record({
    $id: Now.ID['leaves-module'],
    table: 'sys_app_module',
    data: {
        title: 'Leave Requests',
        application: smartOfficeMenu.$id,
        link_type: 'LIST',
        name: 'x_994053_smart_off_leaves',
        hint: 'Manage leave requests',
        description: 'View and manage employee leave requests',
        active: true,
        order: 330
    }
})