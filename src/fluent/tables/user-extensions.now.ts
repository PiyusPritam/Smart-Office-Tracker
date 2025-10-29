import '@servicenow/sdk/global'
import { Table, DateTimeColumn, IntegerColumn, ChoiceColumn, DecimalColumn, ReferenceColumn } from '@servicenow/sdk/core'

// Extending sys_user table to add Smart Office fields
export const sys_user = Table({
    name: 'sys_user' as any,
    schema: {
        x_994053_smart_off_first_login: DateTimeColumn({
            label: 'First Login Today'
        }),
        x_994053_smart_off_last_logout: DateTimeColumn({
            label: 'Last Logout Today'
        }),
        x_994053_smart_off_login_status: ChoiceColumn({
            label: 'Login Status',
            choices: {
                online: { label: 'Online', sequence: 0 },
                on_break: { label: 'On Break', sequence: 1 },
                leave: { label: 'Leave', sequence: 2 },
                logout: { label: 'Logout', sequence: 3 }
            },
            default: 'logout'
        }),
        x_994053_smart_off_no_of_breaks: IntegerColumn({
            label: 'Number of Breaks Today',
            default: '0'
        }),
        x_994053_smart_off_total_hours: DecimalColumn({
            label: 'Total Hours Today',
            read_only: true
        }),
        x_994053_smart_off_working_hours: DecimalColumn({
            label: 'Working Hours Today',
            read_only: true
        }),
        x_994053_smart_off_work_location: ChoiceColumn({
            label: 'Work Location',
            choices: {
                office: { label: 'Office-In', sequence: 0 },
                wfh: { label: 'Work from Home', sequence: 1 }
            },
            default: 'office'
        }),
        x_994053_smart_off_shift: ReferenceColumn({
            label: 'Assigned Shift',
            referenceTable: 'x_994053_smart_off_shifts'
        }),
        x_994053_smart_off_leaves_allocated: IntegerColumn({
            label: 'Leaves Allocated per Quarter',
            default: '5'
        })
    }
})