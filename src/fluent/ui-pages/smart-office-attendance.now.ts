import '@servicenow/sdk/global'
import { UiPage } from '@servicenow/sdk/core'
import smartOfficeHTML from '../../client/index.html'

export const smart_office_attendance = UiPage({
    $id: Now.ID['smart-office-attendance'],
    endpoint: 'x_994053_smart_off_attendance.do',
    description: 'Smart Office Attendance Tracker - Modern UI for tracking employee attendance, shifts, and leaves',
    category: 'general',
    html: smartOfficeHTML,
    direct: true
})