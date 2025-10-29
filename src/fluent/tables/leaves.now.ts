import '@servicenow/sdk/global'
import { Table, StringColumn, DateColumn, DateTimeColumn, IntegerColumn, ReferenceColumn, ChoiceColumn } from '@servicenow/sdk/core'

export const x_994053_smart_off_leaves = Table({
    name: 'x_994053_smart_off_leaves',
    label: 'Leaves',
    schema: {
        user: ReferenceColumn({
            label: 'User',
            referenceTable: 'sys_user',
            mandatory: true
        }),
        leave_type: ChoiceColumn({
            label: 'Leave Type',
            choices: {
                earned: { label: 'Earned Leave', sequence: 0 },
                maternity: { label: 'Maternity Leave', sequence: 1 },
                wedding: { label: 'Wedding Leave', sequence: 2 },
                sick: { label: 'Sick Leave', sequence: 3 },
                emergency: { label: 'Emergency Leave', sequence: 4 }
            },
            mandatory: true
        }),
        start_date: DateColumn({
            label: 'Start Date',
            mandatory: true
        }),
        end_date: DateColumn({
            label: 'End Date',
            mandatory: true
        }),
        total_days: IntegerColumn({
            label: 'Total Days',
            read_only: true
        }),
        reason: StringColumn({
            label: 'Reason',
            maxLength: 1000
        }),
        status: ChoiceColumn({
            label: 'Status',
            choices: {
                pending: { label: 'Pending', sequence: 0 },
                approved: { label: 'Approved', sequence: 1 },
                rejected: { label: 'Rejected', sequence: 2 },
                cancelled: { label: 'Cancelled', sequence: 3 }
            },
            default: 'pending'
        }),
        applied_date: DateTimeColumn({
            label: 'Applied Date'
        }),
        approved_by: ReferenceColumn({
            label: 'Approved By',
            referenceTable: 'sys_user'
        }),
        approved_date: DateTimeColumn({
            label: 'Approved Date'
        }),
        comments: StringColumn({
            label: 'Comments',
            maxLength: 1000
        })
    },
    display: 'user'
})