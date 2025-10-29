import '@servicenow/sdk/global'
import { Table, DateColumn, DateTimeColumn, IntegerColumn, ReferenceColumn, ChoiceColumn, DecimalColumn } from '@servicenow/sdk/core'

export const x_994053_smart_off_daily_summary = Table({
    name: 'x_994053_smart_off_daily_summary',
    label: 'Daily Summary',
    schema: {
        user: ReferenceColumn({
            label: 'User',
            referenceTable: 'sys_user',
            mandatory: true
        }),
        date: DateColumn({
            label: 'Date',
            mandatory: true
        }),
        first_login: DateTimeColumn({
            label: 'First Login'
        }),
        last_logout: DateTimeColumn({
            label: 'Last Logout'
        }),
        total_hours: DecimalColumn({
            label: 'Total Hours',
            read_only: true
        }),
        working_hours: DecimalColumn({
            label: 'Working Hours',
            read_only: true
        }),
        break_hours: DecimalColumn({
            label: 'Break Hours',
            read_only: true
        }),
        no_of_breaks: IntegerColumn({
            label: 'Number of Breaks',
            default: '0'
        }),
        work_location: ChoiceColumn({
            label: 'Work Location',
            choices: {
                office: { label: 'Office-In', sequence: 0 },
                wfh: { label: 'Work from Home', sequence: 1 }
            },
            default: 'office'
        }),
        shift: ReferenceColumn({
            label: 'Shift',
            referenceTable: 'x_994053_smart_off_shifts'
        }),
        status: ChoiceColumn({
            label: 'Status',
            choices: {
                present: { label: 'Present', sequence: 0 },
                absent: { label: 'Absent', sequence: 1 },
                on_leave: { label: 'On Leave', sequence: 2 },
                partial: { label: 'Partial', sequence: 3 }
            },
            default: 'absent'
        }),
        current_status: ChoiceColumn({
            label: 'Current Login Status',
            choices: {
                online: { label: 'Online', sequence: 0 },
                on_break: { label: 'On Break', sequence: 1 },
                leave: { label: 'Leave', sequence: 2 },
                logout: { label: 'Logout', sequence: 3 }
            },
            default: 'logout'
        })
    },
    display: 'user',
    index: [
        {
            name: 'idx_user_date',
            element: 'user,date',
            unique: true
        }
    ]
})