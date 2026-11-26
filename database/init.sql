CREATE DATABASE layra_db;
CREATE USER layra_user WITH ENCRYPTED PASSWORD 'layra_secure_password';
GRANT ALL PRIVILEGES ON DATABASE layra_db TO layra_user;
