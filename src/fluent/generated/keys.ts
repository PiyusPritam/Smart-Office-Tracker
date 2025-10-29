import '@servicenow/sdk/global'

declare global {
    namespace Now {
        namespace Internal {
            interface Keys extends KeysRegistry {
                explicit: {
                    'attendance-tracker-module': {
                        table: 'sys_app_module'
                        id: 'd135a8cfb95546b9a77b72f20fddb4bf'
                    }
                    bom_json: {
                        table: 'sys_module'
                        id: 'd0170fdbd149400d8783d15dec1a1248'
                    }
                    'br-daily-summary': {
                        table: 'sys_script'
                        id: 'c981283f9ccf46f9bdbf514ce444d3fc'
                    }
                    'config-separator': {
                        table: 'sys_app_module'
                        id: '911f4e717e874b608a0bcfb5aaaa2e57'
                    }
                    'daily-summaries-module': {
                        table: 'sys_app_module'
                        id: 'dc08c91da1a248559f5bfdc53dad0830'
                    }
                    'leaves-module': {
                        table: 'sys_app_module'
                        id: '8bc8349aaaf6443590cc1f0b230336e8'
                    }
                    package_json: {
                        table: 'sys_module'
                        id: '72c7c39c32aa442f9d48670d711054ea'
                    }
                    'reports-separator': {
                        table: 'sys_app_module'
                        id: '6b8daee7376f4380acd5089a1b47190d'
                    }
                    'shift-afternoon': {
                        table: 'x_994053_smart_off_shifts'
                        id: 'd79afdfdb3944cbd98adc358c3828d9a'
                    }
                    'shift-flexible': {
                        table: 'x_994053_smart_off_shifts'
                        id: 'df2fbb7f110248dd9bd78de3f25dbd46'
                    }
                    'shift-morning': {
                        table: 'x_994053_smart_off_shifts'
                        id: 'cb92fddd001d444db6f228689426c8e5'
                    }
                    'shift-night': {
                        table: 'x_994053_smart_off_shifts'
                        id: '18b0b0f788204b668eeb025167907bb0'
                    }
                    'shifts-module': {
                        table: 'sys_app_module'
                        id: 'c794a22ce8414d3fbdcdc862fb3bc593'
                    }
                    'smart-office-attendance': {
                        table: 'sys_ui_page'
                        id: '2f8a2042205b451a8bea736ba6b7d688'
                    }
                    'smart-office-category': {
                        table: 'sys_app_category'
                        id: 'e648de7991cb42cf9977ef620005ab21'
                    }
                    'smart-office-menu': {
                        table: 'sys_app_application'
                        id: '26d1d424a412412cbdd14d90dca96441'
                    }
                    'src_server_calculate-daily-summary_js': {
                        table: 'sys_module'
                        id: 'd3883b9702ab4ed6b685c6e9515fbc05'
                    }
                    'user-sessions-module': {
                        table: 'sys_app_module'
                        id: '1249e18bc49a47d58b40bfd0dec8bb4a'
                    }
                    'x_994053_smart_off/main': {
                        table: 'sys_ux_lib_asset'
                        id: 'a3935448a5744b709989b1e8d512f307'
                    }
                    'x_994053_smart_off/main.js.map': {
                        table: 'sys_ux_lib_asset'
                        id: '3346193dcc4f46e9a3839f6ffc871d83'
                    }
                }
                composite: [
                    {
                        table: 'sys_documentation'
                        id: '03a03bb702a7402aafc2985234edac15'
                        key: {
                            name: 'x_994053_smart_off_daily_summary'
                            element: 'user'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_choice'
                        id: '08414a2818d043ab9f6467993376ac90'
                        key: {
                            name: 'sys_user'
                            element: 'x_994053_smart_off_login_status'
                            value: 'leave'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: '095b4ac9832549b2a26751c8f5010bce'
                        key: {
                            name: 'x_994053_smart_off_user_session'
                            element: 'active'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: '098580d9ab554a439781224df60740fc'
                        key: {
                            name: 'x_994053_smart_off_user_session'
                            element: 'session_duration'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: '09b39f8543e04fc08f16ad1e10e0a2b9'
                        key: {
                            name: 'sys_user'
                            element: 'x_994053_smart_off_total_hours'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_choice'
                        id: '0a14e01a19e444eaa18d13527a64f34f'
                        key: {
                            name: 'sys_user'
                            element: 'x_994053_smart_off_login_status'
                            value: 'online'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: '0a1e45f057d542cea987445d9ff2f5d3'
                        key: {
                            name: 'sys_user'
                            element: 'x_994053_smart_off_working_hours'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: '0a571a92666d4cd4b94432eccbecb990'
                        key: {
                            name: 'x_994053_smart_off_user_session'
                            element: 'user'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: '0b87bcf1d4ae41b8871d9767cfbc4159'
                        key: {
                            name: 'x_994053_smart_off_leaves'
                            element: 'reason'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: '0bd7a4aab15b40fcaf6b31ebad97f06f'
                        key: {
                            name: 'x_994053_smart_off_leaves'
                            element: 'start_date'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: '0cbf2f4940c5407886f4dc88b16646c5'
                        key: {
                            name: 'x_994053_smart_off_shifts'
                            element: 'name'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: '13ba04fa25bb4cef93a64f612a44c433'
                        key: {
                            name: 'x_994053_smart_off_leaves'
                            element: 'NULL'
                        }
                    },
                    {
                        table: 'sys_choice'
                        id: '187ad8cc47b64a369087432a97962b08'
                        key: {
                            name: 'x_994053_smart_off_leaves'
                            element: 'leave_type'
                            value: 'emergency'
                        }
                    },
                    {
                        table: 'sys_choice'
                        id: '19d38bc0c17d4e0f8d8e20a10c165382'
                        key: {
                            name: 'x_994053_smart_off_leaves'
                            element: 'leave_type'
                            value: 'wedding'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: '1b531ab1b8eb49d48e3072ffb078572f'
                        key: {
                            name: 'sys_user'
                            element: 'x_994053_smart_off_leaves_allocated'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: '1dd5c453413e423d98c6fe31f946e0c1'
                        key: {
                            name: 'x_994053_smart_off_user_session'
                            element: 'login_time'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: '21b4855f0b364030875fc49ce382ee00'
                        key: {
                            name: 'x_994053_smart_off_daily_summary'
                            element: 'working_hours'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: '21d7210e3920490eb39477424999477c'
                        key: {
                            name: 'x_994053_smart_off_daily_summary'
                            element: 'NULL'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: '24976adf7e1d4ad599987d1d642d8b0f'
                        key: {
                            name: 'x_994053_smart_off_leaves'
                            element: 'approved_by'
                        }
                    },
                    {
                        table: 'sys_choice'
                        id: '2a481362154a498b8859979db6fca623'
                        key: {
                            name: 'x_994053_smart_off_user_session'
                            element: 'active'
                            value: 'true'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: '2d7376b43bd94e9db8ad39668837a04d'
                        key: {
                            name: 'x_994053_smart_off_shifts'
                            element: 'end_time'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_choice'
                        id: '2e212bdf30e541f9ba620fd91bd82984'
                        key: {
                            name: 'x_994053_smart_off_leaves'
                            element: 'status'
                            value: 'approved'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: '2e7cecf991044ac08d5efea5d1afaf53'
                        key: {
                            name: 'sys_user'
                            element: 'x_994053_smart_off_login_status'
                        }
                    },
                    {
                        table: 'sys_choice'
                        id: '309a878af44c4171a7dc9864850f73f6'
                        key: {
                            name: 'x_994053_smart_off_daily_summary'
                            element: 'current_status'
                            value: 'online'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: '3318cd58bb4b431caa382cd4714ce58a'
                        key: {
                            name: 'x_994053_smart_off_daily_summary'
                            element: 'working_hours'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: '33269f62dcb94a4bba8c073480e98e4a'
                        key: {
                            name: 'x_994053_smart_off_shifts'
                            element: 'duration_hours'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: '3757de58904b401bb618ec57b518bedd'
                        key: {
                            name: 'x_994053_smart_off_shifts'
                            element: 'break_duration'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_choice'
                        id: '3833b43042d9467e8705664471ae3376'
                        key: {
                            name: 'x_994053_smart_off_daily_summary'
                            element: 'status'
                            value: 'partial'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: '4742a450c57e466a84ab0893f76e9594'
                        key: {
                            name: 'sys_user'
                            element: 'x_994053_smart_off_first_login'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: '4907c9528ced4acda7cf72c0e14c8531'
                        key: {
                            name: 'x_994053_smart_off_daily_summary'
                            element: 'break_hours'
                        }
                    },
                    {
                        table: 'sys_db_object'
                        id: '4acd4d0ea21e4a139bc0e1d4c7c1863a'
                        key: {
                            name: 'sys_user'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: '4d0f47b2fb23440290a32fab88f8d2d7'
                        key: {
                            name: 'x_994053_smart_off_daily_summary'
                            element: 'status'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_choice'
                        id: '4ea8619aa8634d33ac4ecb3a80a91ba2'
                        key: {
                            name: 'x_994053_smart_off_daily_summary'
                            element: 'current_status'
                            value: 'on_break'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: '57ad3427ba3b48569ef9e13fa6b1ca75'
                        key: {
                            name: 'x_994053_smart_off_leaves'
                            element: 'status'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: '5b36f041b7a04394911b59079ec23de9'
                        key: {
                            name: 'x_994053_smart_off_daily_summary'
                            element: 'first_login'
                        }
                    },
                    {
                        table: 'sys_choice'
                        id: '5ba72836558e474ebc51b2f9386aee68'
                        key: {
                            name: 'sys_user'
                            element: 'x_994053_smart_off_work_location'
                            value: 'wfh'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: '5bb4ad55b05645c19a9f585199f9f53b'
                        key: {
                            name: 'sys_user'
                            element: 'NULL'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: '5d5eadea3b5a437f96b3b3ed57a66595'
                        key: {
                            name: 'x_994053_smart_off_leaves'
                            element: 'user'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: '5e4f45288bd240a6bfb62fd61f133f24'
                        key: {
                            name: 'x_994053_smart_off_user_session'
                            element: 'user'
                        }
                    },
                    {
                        table: 'sys_db_object'
                        id: '601663d629f844759f0c793f1a22c022'
                        key: {
                            name: 'x_994053_smart_off_shifts'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: '60a188c9540e4e8ba1f9c9f4c3962860'
                        key: {
                            name: 'x_994053_smart_off_daily_summary'
                            element: 'NULL'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: '60ff5a2b5b5e42bc98444c3c93921613'
                        key: {
                            name: 'x_994053_smart_off_leaves'
                            element: 'approved_date'
                        }
                    },
                    {
                        table: 'sys_choice'
                        id: '61ed7bdf67fd449ca24d55cd6673282e'
                        key: {
                            name: 'x_994053_smart_off_leaves'
                            element: 'leave_type'
                            value: 'sick'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: '6258b7ca8dd14c4a9700421fcc30228c'
                        key: {
                            name: 'x_994053_smart_off_daily_summary'
                            element: 'first_login'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: '627ddde763b34eb482f3d665395aa6e2'
                        key: {
                            name: 'x_994053_smart_off_shifts'
                            element: 'active'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: '65572d9a4a6a416ebd0407c8fc8ae177'
                        key: {
                            name: 'sys_user'
                            element: 'x_994053_smart_off_first_login'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: '65aa54e8aa7f4f9e97b292dcca892de4'
                        key: {
                            name: 'x_994053_smart_off_shifts'
                            element: 'NULL'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: '6aa637032bfd4b41857b841c5f6e232d'
                        key: {
                            name: 'x_994053_smart_off_shifts'
                            element: 'end_time'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: '6dda82bcc90b4cb8a57ff058408bb83f'
                        key: {
                            name: 'x_994053_smart_off_user_session'
                            element: 'logout_time'
                        }
                    },
                    {
                        table: 'sys_choice'
                        id: '6f294d836438429abc0f6e1356f48c92'
                        key: {
                            name: 'x_994053_smart_off_leaves'
                            element: 'status'
                            value: 'pending'
                        }
                    },
                    {
                        table: 'ua_table_licensing_config'
                        id: '709b4417e4434ba39207de04c724de6a'
                        key: {
                            name: 'x_994053_smart_off_shifts'
                        }
                    },
                    {
                        table: 'sys_choice'
                        id: '73660d62c4a444d098b8194e53c02ec4'
                        key: {
                            name: 'x_994053_smart_off_user_session'
                            element: 'session_type'
                            value: 'break'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: '7481bb9db4ba4c749c40f41a507382db'
                        key: {
                            name: 'sys_user'
                            element: 'x_994053_smart_off_shift'
                        }
                    },
                    {
                        table: 'sys_choice'
                        id: '7939154225154f5eaef182146b359583'
                        key: {
                            name: 'x_994053_smart_off_user_session'
                            element: 'session_type'
                            value: 'work'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: '7a048de8433c4784b912c968e4b64f00'
                        key: {
                            name: 'x_994053_smart_off_daily_summary'
                            element: 'shift'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: '7c6b0c35e85b477abea0e30e5ac68d9c'
                        key: {
                            name: 'x_994053_smart_off_daily_summary'
                            element: 'shift'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_choice'
                        id: '7cf84d9ff6cd426fad5e0956dfb32668'
                        key: {
                            name: 'x_994053_smart_off_daily_summary'
                            element: 'status'
                            value: 'on_leave'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: '816e133a76d04f339139c97cf3200b2e'
                        key: {
                            name: 'x_994053_smart_off_leaves'
                            element: 'total_days'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: '82baf7d1cd984ccea9d2c0ef01c93f21'
                        key: {
                            name: 'sys_user'
                            element: 'NULL'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_choice'
                        id: '82e9f1091b94499080f37be6cf01d6a3'
                        key: {
                            name: 'x_994053_smart_off_daily_summary'
                            element: 'status'
                            value: 'present'
                        }
                    },
                    {
                        table: 'sys_choice'
                        id: '85bdc6bee6694398b49ea7ce52d431e4'
                        key: {
                            name: 'x_994053_smart_off_daily_summary'
                            element: 'current_status'
                            value: 'leave'
                        }
                    },
                    {
                        table: 'sys_choice'
                        id: '8658f1c419cb459ab1a7ee8d1662e58f'
                        key: {
                            name: 'sys_user'
                            element: 'x_994053_smart_off_login_status'
                            value: 'logout'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: '88167178a7a249eebd0fe8f481d5a11a'
                        key: {
                            name: 'x_994053_smart_off_daily_summary'
                            element: 'date'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: '8cbe28a037b84b97abeedb5f736e69ea'
                        key: {
                            name: 'x_994053_smart_off_leaves'
                            element: 'approved_by'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: '8eefb2135d874529a22674438469e423'
                        key: {
                            name: 'x_994053_smart_off_user_session'
                            element: 'NULL'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: '908476fbe2274c2688c6b8d72e48bbf4'
                        key: {
                            name: 'x_994053_smart_off_leaves'
                            element: 'applied_date'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: '99dab73fd3b948549c12ff2d5eafa06b'
                        key: {
                            name: 'x_994053_smart_off_user_session'
                            element: 'NULL'
                        }
                    },
                    {
                        table: 'ua_table_licensing_config'
                        id: '9ad6358c5e5045699dac13e062dabc31'
                        key: {
                            name: 'x_994053_smart_off_user_session'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: '9c10db3d701f41ca96472bc30eb1cb5f'
                        key: {
                            name: 'x_994053_smart_off_shifts'
                            element: 'active'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: '9c32383929aa4121b82aeb46a5663a22'
                        key: {
                            name: 'x_994053_smart_off_daily_summary'
                            element: 'current_status'
                        }
                    },
                    {
                        table: 'sys_choice'
                        id: '9cd14986083d45b4840cbcef0da713be'
                        key: {
                            name: 'x_994053_smart_off_daily_summary'
                            element: 'work_location'
                            value: 'wfh'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: '9ea6cf3a9be343e4b7717712509a9557'
                        key: {
                            name: 'x_994053_smart_off_daily_summary'
                            element: 'date'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_choice'
                        id: '9f2e3abfdcc74187b882f9df3a231b8a'
                        key: {
                            name: 'x_994053_smart_off_leaves'
                            element: 'leave_type'
                            value: 'earned'
                        }
                    },
                    {
                        table: 'sys_index'
                        id: 'a31a6c0550ff4fd6b2fb6626842f840e'
                        key: {
                            logical_table_name: 'x_994053_smart_off_daily_summary'
                            col_name_string: 'user,date'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: 'a3d8eda98e32456c8452240a4e200046'
                        key: {
                            name: 'sys_user'
                            element: 'x_994053_smart_off_work_location'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: 'a3fd5f893cf449c1a7237517eb451b33'
                        key: {
                            name: 'x_994053_smart_off_leaves'
                            element: 'leave_type'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: 'a43fd6eaaa264819a44533e65f262acd'
                        key: {
                            name: 'x_994053_smart_off_shifts'
                            element: 'duration_hours'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_choice'
                        id: 'a8d7ab277c5340ce8c2d806014e1cd25'
                        key: {
                            name: 'x_994053_smart_off_user_session'
                            element: 'active'
                            value: 'false'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: 'aa7c9fdb674547fcaecf0cc74510d849'
                        key: {
                            name: 'x_994053_smart_off_daily_summary'
                            element: 'no_of_breaks'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_choice'
                        id: 'ad8a4802f33f4f978cce9386964226cf'
                        key: {
                            name: 'x_994053_smart_off_leaves'
                            element: 'status'
                            value: 'cancelled'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: 'b048e77610c34f75b79e499831e4ef45'
                        key: {
                            name: 'x_994053_smart_off_daily_summary'
                            element: 'last_logout'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: 'b06deca5db9d40caaa31701d19a7bbbe'
                        key: {
                            name: 'x_994053_smart_off_leaves'
                            element: 'start_date'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: 'b0a0633c97a14c308f7e88e43dcb7361'
                        key: {
                            name: 'sys_user'
                            element: 'x_994053_smart_off_no_of_breaks'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_choice'
                        id: 'b12c5180f120427fae4c5e75dc43d5d0'
                        key: {
                            name: 'x_994053_smart_off_leaves'
                            element: 'status'
                            value: 'rejected'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: 'b468ec89d5304f7386c7e31b68b2128c'
                        key: {
                            name: 'sys_user'
                            element: 'x_994053_smart_off_shift'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: 'b4ca8eb096694df18d4d61dbe0df610b'
                        key: {
                            name: 'x_994053_smart_off_leaves'
                            element: 'comments'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: 'b525c9939c0246b7b071bf552b5b3f8c'
                        key: {
                            name: 'x_994053_smart_off_leaves'
                            element: 'applied_date'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: 'b56a5aeb657d4024b3b960d77ffc1660'
                        key: {
                            name: 'x_994053_smart_off_daily_summary'
                            element: 'no_of_breaks'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: 'b6231260af1b42c98a18319feb523746'
                        key: {
                            name: 'x_994053_smart_off_user_session'
                            element: 'active'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: 'b6c5e30d95b142b387e4531acd2c441f'
                        key: {
                            name: 'sys_user'
                            element: 'x_994053_smart_off_last_logout'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: 'b6e9c6bf9b1f497f83b16cd2c35919e1'
                        key: {
                            name: 'x_994053_smart_off_shifts'
                            element: 'start_time'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: 'b887c6126573426cbdca972130e49599'
                        key: {
                            name: 'x_994053_smart_off_daily_summary'
                            element: 'work_location'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: 'bdc0f47058b04b6c9986acbe05b064ea'
                        key: {
                            name: 'sys_user'
                            element: 'x_994053_smart_off_leaves_allocated'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: 'be0ae1f51d82464a8fc06e8d64995d36'
                        key: {
                            name: 'x_994053_smart_off_shifts'
                            element: 'description'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: 'bed862252c674061a0bd429e727db14f'
                        key: {
                            name: 'x_994053_smart_off_leaves'
                            element: 'NULL'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: 'c072cdeaabcb4c02be0c625e498adeb9'
                        key: {
                            name: 'sys_user'
                            element: 'x_994053_smart_off_last_logout'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: 'c1c45b4a2cf0456695e8878143b686e1'
                        key: {
                            name: 'x_994053_smart_off_daily_summary'
                            element: 'total_hours'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: 'c232c7ceb9f842eca2b27b96f7fe4b5f'
                        key: {
                            name: 'sys_user'
                            element: 'x_994053_smart_off_no_of_breaks'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: 'c4874cc9d1554463b489ab9ffaa1ba53'
                        key: {
                            name: 'x_994053_smart_off_leaves'
                            element: 'comments'
                        }
                    },
                    {
                        table: 'sys_choice'
                        id: 'c58cbbf9185246f7a0829ea4fb91070b'
                        key: {
                            name: 'x_994053_smart_off_leaves'
                            element: 'leave_type'
                            value: 'maternity'
                        }
                    },
                    {
                        table: 'sys_choice'
                        id: 'c60ae772ca2e46f983df706c4bb59043'
                        key: {
                            name: 'x_994053_smart_off_daily_summary'
                            element: 'status'
                            value: 'absent'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: 'c6284406a05c44d692f0ae5e512c623a'
                        key: {
                            name: 'x_994053_smart_off_shifts'
                            element: 'NULL'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: 'c63cc4be73b5477da6b8ff959ff05f22'
                        key: {
                            name: 'x_994053_smart_off_shifts'
                            element: 'start_time'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: 'c681f2beb70b4a4c90b7c8c03cd6fb08'
                        key: {
                            name: 'x_994053_smart_off_user_session'
                            element: 'login_time'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: 'c759cdf1b9744875b9b3655b55297dfb'
                        key: {
                            name: 'x_994053_smart_off_leaves'
                            element: 'end_date'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: 'c78f8e47247b4d948ad5b94d772cfba0'
                        key: {
                            name: 'x_994053_smart_off_user_session'
                            element: 'session_type'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: 'c7cc52ac1723432bb24274ea40dc9564'
                        key: {
                            name: 'x_994053_smart_off_user_session'
                            element: 'logout_time'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: 'c8171b11f58c47f9a0d4bafb223b0cef'
                        key: {
                            name: 'x_994053_smart_off_user_session'
                            element: 'session_type'
                        }
                    },
                    {
                        table: 'sys_choice'
                        id: 'ce63f87457c54d2d905428500bf6869b'
                        key: {
                            name: 'x_994053_smart_off_daily_summary'
                            element: 'current_status'
                            value: 'logout'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: 'd11a53bf43054faf83f537d203e3cf0e'
                        key: {
                            name: 'x_994053_smart_off_daily_summary'
                            element: 'work_location'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: 'd21245719e0347239be9c3a341d6741c'
                        key: {
                            name: 'x_994053_smart_off_daily_summary'
                            element: 'status'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: 'd3312a01233243f1b40623fe601b13dd'
                        key: {
                            name: 'sys_user'
                            element: 'x_994053_smart_off_working_hours'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: 'd44cbcfb2fbe40cdb2665fb4201ece76'
                        key: {
                            name: 'x_994053_smart_off_daily_summary'
                            element: 'break_hours'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: 'd5377125bc094161bb14574959733591'
                        key: {
                            name: 'x_994053_smart_off_daily_summary'
                            element: 'last_logout'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: 'd5ba2468ec3745229a6819c2fa88b047'
                        key: {
                            name: 'x_994053_smart_off_leaves'
                            element: 'total_days'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_choice'
                        id: 'd5c8c1ddcf2148fa90a1ed454a9d1639'
                        key: {
                            name: 'x_994053_smart_off_daily_summary'
                            element: 'work_location'
                            value: 'office'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: 'd5dbbd253985495f9c6e3c9271e123f3'
                        key: {
                            name: 'sys_user'
                            element: 'x_994053_smart_off_login_status'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_db_object'
                        id: 'd966c65fe1864bfa910a043215eebe2b'
                        key: {
                            name: 'x_994053_smart_off_daily_summary'
                        }
                    },
                    {
                        table: 'ua_table_licensing_config'
                        id: 'dd4fa92646bc4af29219caf0f630d6cf'
                        key: {
                            name: 'x_994053_smart_off_leaves'
                        }
                    },
                    {
                        table: 'sys_db_object'
                        id: 'e103f679f0d24f649d386790296e54b3'
                        key: {
                            name: 'x_994053_smart_off_leaves'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: 'e23e9e7801c043c58da4b23b5e0610ec'
                        key: {
                            name: 'x_994053_smart_off_leaves'
                            element: 'reason'
                        }
                    },
                    {
                        table: 'sys_db_object'
                        id: 'e4b97551b8c341efacabfe4b6f8fee6c'
                        key: {
                            name: 'x_994053_smart_off_user_session'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: 'e4ea527396734a14bef3ae9abf274767'
                        key: {
                            name: 'x_994053_smart_off_daily_summary'
                            element: 'current_status'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: 'e77954755cca461cb3e1f1bd49988508'
                        key: {
                            name: 'x_994053_smart_off_shifts'
                            element: 'name'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: 'e86dfb4d4cc145a0982400ba20bd6240'
                        key: {
                            name: 'x_994053_smart_off_user_session'
                            element: 'session_duration'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: 'e87348fd4e00431e86cbe26a0d7b9808'
                        key: {
                            name: 'x_994053_smart_off_leaves'
                            element: 'approved_date'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_choice'
                        id: 'e8d5a38dbd9045bd9e8c4f459215c170'
                        key: {
                            name: 'sys_user'
                            element: 'x_994053_smart_off_work_location'
                            value: 'office'
                        }
                    },
                    {
                        table: 'ua_table_licensing_config'
                        id: 'e9a6caa8b7d24a159472b24c1c47c4bb'
                        key: {
                            name: 'x_994053_smart_off_daily_summary'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: 'eb6f52349af2432a99664c55706bf365'
                        key: {
                            name: 'x_994053_smart_off_daily_summary'
                            element: 'total_hours'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: 'ef40d6063ca540e180016ed1c74bbc5b'
                        key: {
                            name: 'sys_user'
                            element: 'x_994053_smart_off_work_location'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: 'ef452bbe37d84dce97513c1ffcf724de'
                        key: {
                            name: 'x_994053_smart_off_leaves'
                            element: 'user'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_choice'
                        id: 'f2cc5aeaeb104a1eb05bbe71c38041f3'
                        key: {
                            name: 'sys_user'
                            element: 'x_994053_smart_off_login_status'
                            value: 'on_break'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: 'f317f303642247bcb84326804d7a5ff0'
                        key: {
                            name: 'x_994053_smart_off_shifts'
                            element: 'break_duration'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: 'f9e43ac7158a4ee2a4407e73e5307527'
                        key: {
                            name: 'x_994053_smart_off_daily_summary'
                            element: 'user'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: 'fba1790e9500455ab8ff0f86aa65d615'
                        key: {
                            name: 'x_994053_smart_off_leaves'
                            element: 'leave_type'
                        }
                    },
                    {
                        table: 'ua_table_licensing_config'
                        id: 'fc2596942c404055b9f07744c8e7ad29'
                        key: {
                            name: 'sys_user'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: 'fc51cd2fa5e0408dbb964da6da2fccc3'
                        key: {
                            name: 'x_994053_smart_off_leaves'
                            element: 'status'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: 'fcc2474c3ec345aba01a86b3887bf945'
                        key: {
                            name: 'x_994053_smart_off_leaves'
                            element: 'end_date'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: 'fcd47fa7e7034800b854866a9d30782b'
                        key: {
                            name: 'x_994053_smart_off_shifts'
                            element: 'description'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: 'feebfbeeee7e4dbf99d9800f3c10543e'
                        key: {
                            name: 'sys_user'
                            element: 'x_994053_smart_off_total_hours'
                        }
                    },
                ]
            }
        }
    }
}
