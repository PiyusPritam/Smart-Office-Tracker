import '@servicenow/sdk/global'
import { Record } from '@servicenow/sdk/core'

// Default shift records
export const morningShift = Record({
    $id: Now.ID['shift-morning'],
    table: 'x_994053_smart_off_shifts',
    data: {
        name: 'Morning Shift',
        start_time: '09:00:00',
        end_time: '17:00:00',
        duration_hours: 8,
        break_duration: 60,
        active: true,
        description: 'Standard 9 AM to 5 PM shift with 1 hour break'
    }
})

export const afternoonShift = Record({
    $id: Now.ID['shift-afternoon'],
    table: 'x_994053_smart_off_shifts',
    data: {
        name: 'Afternoon Shift',
        start_time: '13:00:00',
        end_time: '21:00:00',
        duration_hours: 8,
        break_duration: 60,
        active: true,
        description: 'Afternoon shift from 1 PM to 9 PM with 1 hour break'
    }
})

export const nightShift = Record({
    $id: Now.ID['shift-night'],
    table: 'x_994053_smart_off_shifts',
    data: {
        name: 'Night Shift',
        start_time: '21:00:00',
        end_time: '05:00:00',
        duration_hours: 8,
        break_duration: 60,
        active: true,
        description: 'Night shift from 9 PM to 5 AM with 1 hour break'
    }
})

export const flexibleShift = Record({
    $id: Now.ID['shift-flexible'],
    table: 'x_994053_smart_off_shifts',
    data: {
        name: 'Flexible Shift',
        start_time: '00:00:00',
        end_time: '23:59:59',
        duration_hours: 8,
        break_duration: 60,
        active: true,
        description: 'Flexible timing - user can work any 8 hours in a day'
    }
})