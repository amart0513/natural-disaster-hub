-- Reset the database
DROP DATABASE IF EXISTS disaster_hub;
CREATE DATABASE disaster_hub;
USE disaster_hub;

-- USERS table
CREATE TABLE users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100),
    email VARCHAR(100) UNIQUE,
    password_hash VARCHAR(255),
    role ENUM('admin', 'volunteer', 'requester')
);

-- LOCATIONS table
CREATE TABLE locations (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100),
    latitude FLOAT,
    longitude FLOAT,
    address VARCHAR(255)
);

-- DISASTER EVENTS table
CREATE TABLE disaster_events (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100),
    type VARCHAR(50),
    description TEXT,
    location_id INT,
    date_occurred DATE,
    FOREIGN KEY (location_id) REFERENCES locations(id)
);

-- RESOURCES table
CREATE TABLE resources (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100),
    category VARCHAR(50),
    quantity INT,
    location_id INT,
    FOREIGN KEY (location_id) REFERENCES locations(id)
);

-- REQUESTS table
CREATE TABLE requests (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT,
    resource_id INT,
    quantity INT,
    status ENUM('pending', 'approved', 'denied'),
    created_at DATETIME,
    FOREIGN KEY (user_id) REFERENCES users(id),
    FOREIGN KEY (resource_id) REFERENCES resources(id)
);

-- Sample LOCATIONS
INSERT INTO locations (name, latitude, longitude, address)
VALUES 
('Central Park Shelter', 40.785091, -73.968285, 'Central Park, NY'),
('Downtown Relief Center', 34.052235, -118.243683, 'Los Angeles, CA');

-- Sample DISASTERS
INSERT INTO disaster_events (name, type, description, location_id, date_occurred)
VALUES 
('Hurricane Zeta', 'hurricane', 'Category 3 hurricane with widespread flooding.', 1, '2024-09-15'),
('Wildfire Alpha', 'wildfire', 'Severe wildfire affecting multiple zones.', 2, '2024-07-20');

-- Sample RESOURCES
INSERT INTO resources (name, category, quantity, location_id)
VALUES 
('Bottled Water', 'food', 500, 1),
('Emergency Blankets', 'shelter', 300, 2),
('First Aid Kits', 'medical', 150, 1);

-- Sample USERS
INSERT INTO users (name, email, password_hash, role)
VALUES 
('Alice Admin', 'alice@admin.com', 'hashedpassword1', 'admin'),
('Victor Volunteer', 'victor@help.org', 'hashedpassword2', 'volunteer'),
('Riley Requester', 'riley@need.com', 'hashedpassword3', 'requester');

-- Sample REQUESTS
INSERT INTO requests (user_id, resource_id, quantity, status, created_at)
VALUES 
(3, 1, 10, 'pending', NOW()),
(3, 3, 2, 'approved', NOW());
