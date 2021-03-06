SELECT setval('branch_sequence', (SELECT MAX(id) FROM branch) + 1);
SELECT setval('company_sequence', (SELECT MAX(id) FROM company) + 1);
SELECT setval('department_sequence', (SELECT MAX(id) FROM department) + 1);
SELECT setval('employee_sequence', (SELECT MAX(id) FROM employee) + 1);
SELECT setval('person_sequence', (SELECT MAX(id) FROM person) + 1);
SELECT setval('region_sequence', (SELECT MAX(id) FROM region) + 1);
SELECT setval('task_sequence', (SELECT MAX(id) FROM task) + 1);
SELECT setval('task_close_request_sequence', (SELECT MAX(id) FROM task_close_request) + 1);
SELECT setval('task_deduction_sequence', (SELECT MAX(id) FROM task_deduction) + 1);
SELECT setval('task_operation_sequence', (SELECT MAX(id) FROM task_operation) + 1);
SELECT setval('task_operation_attach_sequence', (SELECT MAX(id) FROM task_operation_attach) + 1);
SELECT setval('task_to_sequence', (SELECT MAX(id) FROM task_to) + 1);
SELECT setval('task_warn_sequence', (SELECT MAX(id) FROM task_warn) + 1);
SELECT setval('team_sequence', (SELECT MAX(id) FROM team) + 1);
