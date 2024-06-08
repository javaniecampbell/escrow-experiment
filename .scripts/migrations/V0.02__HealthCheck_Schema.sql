-- Health Check Data Table
-- CREATE TABLE health_check_data (
CREATE TABLE "HealthCheckData" (
    id INT IDENTITY(1,1) PRIMARY KEY,
    service_id INT NOT NULL,
    component_id INT NOT NULL,
    measurement_name VARCHAR(255),
    status VARCHAR(10) NOT NULL,
    observed_value FLOAT,
    observed_unit VARCHAR(20),
    output TEXT,
    created_at DATETIME NOT NULL DEFAULT GETDATE()
);

-- Services Table
CREATE TABLE "Services" (
    id INT IDENTITY(1,1) PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    description TEXT
);

-- Components Table
CREATE TABLE "Components" (
    id INT IDENTITY(1,1) PRIMARY KEY,
    service_id INT NOT NULL FOREIGN KEY REFERENCES services(id),
    name VARCHAR(255) NOT NULL,
    description TEXT
);

-- Usage Table
CREATE TABLE usage (
    id INT IDENTITY(1,1) PRIMARY KEY,
    service_id INT NOT NULL FOREIGN KEY REFERENCES services(id),
    request_count INT NOT NULL,
    created_at DATETIME NOT NULL DEFAULT GETDATE()
);