import '@servicenow/sdk/global'
import { Table, DateTimeColumn, ReferenceColumn, ChoiceColumn, DecimalColumn } from '@servicenow/sdk/core'

export const x_994053_smart_off_user_session = Table({
    name: 'x_994053_smart_off_user_session',
    label: 'User Session',
    schema: {
        user: ReferenceColumn({
            label: 'User',
            referenceTable: 'sys_user',
            mandatory: true
        }),
        login_time: DateTimeColumn({
            label: 'Login Time',
            mandatory: true
        }),
        logout_time: DateTimeColumn({
            label: 'Logout Time'
        }),
        session_duration: DecimalColumn({
            label: 'Session Duration (minutes)',
            read_only: true
        }),
        session_type: ChoiceColumn({
            label: 'Session Type',
            choices: {
                work: { label: 'Work', sequence: 0 },
                break: { label: 'Break', sequence: 1 }
            },
            default: 'work'
        }),
        active: ChoiceColumn({
            label: 'Active',
            choices: {
                true: { label: 'Active', sequence: 0 },
                false: { label: 'Inactive', sequence: 1 }
            },
            default: 'true'
        })
    },
    display: 'user'
})