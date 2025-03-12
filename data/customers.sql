INSERT INTO customers (
    first_name, last_name, address1, address2, city, state, email, 
    zip, phone, notes, active
) VALUES
    ('John', 'Smith', '123 Main St', NULL, 'Chicago', 'IL', 'john.smith@email.com', 
     '60601', '555-0101', 'Regular customer', true),
    ('Sarah', 'Johnson', '456 Oak Ave', 'Apt 2B', 'Boston', 'MA', 'sarah.j@email.com', 
     '02108', '555-0102', 'VIP customer', true),
    ('Michael', 'Brown', '789 Pine Rd', NULL, 'Austin', 'TX', 'm.brown@email.com', 
     '73301', '555-0103', 'New customer', true),
    ('Emily', 'Davis', '321 Elm St', 'Unit 5', 'Seattle', 'WA', 'emilyd@email.com', 
     '98101', '555-0104', 'Frequent buyer', true),
    ('William', 'Wilson', '654 Cedar Ln', NULL, 'Miami', 'FL', 'will.w@email.com', 
     '33101', '555-0105', 'Corporate account', true),
    ('Lisa', 'Anderson', '987 Birch Dr', 'Suite 100', 'Denver', 'CO', 'lisa.a@email.com', 
     '80202', '555-0106', 'Special requests', true),
    ('James', 'Taylor', '147 Maple St', NULL, 'Portland', 'OR', 'james.t@email.com', 
     '97201', '555-0107', 'Regular customer', true),
    ('Rachel', 'Martinez', '258 Walnut Ave', 'Apt 3C', 'Phoenix', 'AZ', 'rachel.m@email.com', 
     '85001', '555-0108', 'Seasonal buyer', true),
    ('Thomas', 'Lee', '369 Spruce Rd', NULL, 'Atlanta', 'GA', 'thomas.l@email.com', 
     '30301', '555-0109', 'Bulk purchaser', true),
    ('Kelly', 'White', '741 Ash St', 'Unit 10', 'San Diego', 'CA', 'kelly.w@email.com', 
     '92101', '555-0110', 'Loyal customer', true);