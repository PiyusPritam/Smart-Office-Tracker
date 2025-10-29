import '@servicenow/sdk/global'
import { Table, StringColumn, IntegerColumn, BooleanColumn } from '@servicenow/sdk/core'

export const x_994053_smart_off_shifts = Table({
    name: 'x_994053_smart_off_shifts',
    label: 'Shifts',
    schema: {
        name: StringColumn({
            label: 'Shift Name',
            mandatory: true,
            maxLength: 100
        }),
        start_time: StringColumn({
            label: 'Start Time',
            mandatory: true,
            maxLength: 8,
            default: '09:00:00'
        }),
        end_time: StringColumn({
            label: 'End Time',
            mandatory: true,
            maxLength: 8,
            default: '17:00:00'
        }),
        duration_hours: IntegerColumn({
            label: 'Duration (Hours)',
            mandatory: true,
            default: '8'
        }),
        break_duration: IntegerColumn({
            label: 'Break Duration (Minutes)',
            default: '60'
        }),
        active: BooleanColumn({
            label: 'Active',
            default: 'true'
        }),
        description: StringColumn({
            label: 'Description',
            maxLength: 500
        })
    },
    display: 'name'
})