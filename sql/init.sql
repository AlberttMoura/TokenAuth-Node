CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "pgcrypto"

CREATE TABLE IF NOT EXISTS app_user(
    uuid uuid DEFAULT uuid_generate_v4(),
    username VARCHAR NOT NULL,
    password VARCHAR NOT NULL,
    primary key (uuid)
)

INSERT INTO app_user (username, password) VALUES ('admin', crypt('admin', 'bread'))