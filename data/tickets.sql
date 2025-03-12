INSERT INTO tickets (
    customer_id, title, description, completed, tech
) VALUES
    (1, 'Network Issue', 'Cannot connect to WiFi', false, 'unassigned'),
    (2, 'Software Crash', 'Application freezes on startup', false, 'Tech1'),
    (3, 'Hardware Failure', 'Laptop won''t power on', true, 'Tech2'),
    (4, 'Printer Problem', 'Printer not responding', false, 'unassigned'),
    (5, 'Email Sync', 'Emails not syncing properly', false, 'Tech3'),
    (6, 'Server Down', 'Main server inaccessible', false, 'unassigned'),
    (7, 'Update Issue', 'Software update failed', true, 'Tech1'),
    (8, 'Security Alert', 'Suspicious login attempt', false, 'Tech4'),
    (9, 'Backup Failure', 'Nightly backup didn''t run', false, 'unassigned'),
    (10, 'Performance Slow', 'System running very slow', false, 'Tech2');