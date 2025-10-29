import '@servicenow/sdk/global'
import { BusinessRule } from '@servicenow/sdk/core'
import { calculateDailySummary } from '../../server/calculate-daily-summary.js'

export const calculateDailySummaryRule = BusinessRule({
    $id: Now.ID['br-daily-summary'],
    name: 'Calculate Daily Summary',
    table: 'x_994053_smart_off_daily_summary',
    when: 'before',
    action: ['insert', 'update'],
    script: calculateDailySummary,
    order: 100,
    active: true,
    description: 'Automatically calculates daily attendance summary from user sessions'
})