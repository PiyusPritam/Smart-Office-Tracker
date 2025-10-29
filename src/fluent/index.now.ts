// Smart Office Attendance Tracker - Main Index
// Importing all Fluent API definitions

// Tables
import './tables/user-extensions.now.ts';
import './tables/user-session.now.ts';
import './tables/daily-summary.now.ts';
import './tables/shifts.now.ts';
import './tables/leaves.now.ts';

// Records
import './records/default-shifts.now.ts';

// UI Pages
import './ui-pages/smart-office-attendance.now.ts';

// Business Rules
import './business-rules/calculate-daily-summary.now.ts';

// Application Menu and Modules
import './application-menu/smart-office-menu.now.ts';

// This index file imports all the Fluent API definitions
// to ensure they are included in the build process