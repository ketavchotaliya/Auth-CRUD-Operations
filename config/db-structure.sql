-- QUERY for Create User Table
CREATE TABLE practice.users (
	user_id BIGINT NOT NULL AUTO_INCREMENT,
	first_name varchar(255) NULL,
	last_name varchar(255) NULL,
	email varchar(255) NOT NULL,
	password varchar(500) NULL,
	dob DATE NULL,
	photo varchar(100) NULL,
	is_active BOOL DEFAULT 1 NULL,
	is_delete BOOL DEFAULT 0 NULL,
	created_at DATETIME NULL,
	updated_at DATETIME NULL,
	CONSTRAINT users_PK PRIMARY KEY (user_id)
)
ENGINE=InnoDB
DEFAULT CHARSET=utf8
COLLATE=utf8_general_ci;


-- QUERY for user_session table
CREATE TABLE practice.user_sessions (
	user_id BIGINT NOT NULL,
	session_id VARCHAR(255) NOT NULL,
	session_timeout INT DEFAULT 18000 NULL,
	stay_logged_in BOOL DEFAULT 0 NULL,
	login_date DATETIME DEFAULT CURRENT_TIMESTAMP NULL,
	logout_date DATETIME NULL,
	is_active BOOL DEFAULT 1 NULL,
	device_type TINYINT NULL COMMENT '1-Android, 2-iOS, 3-Web, 4-Others',
	CONSTRAINT user_sessions_users_FK FOREIGN KEY (user_id) REFERENCES practice.users(user_id) ON UPDATE CASCADE
)
ENGINE=InnoDB
DEFAULT CHARSET=utf8
COLLATE=utf8_general_ci;


--Query for books table
CREATE TABLE practice.bools (
	book_id BIGINT NOT NULL AUTO_INCREMENT,
	name varchar(255) NOT NULL,
	author_name varchar(100) NULL,
	description varchar(500) NULL,
	photo varchar(100) NULL,
	published_date DATE NULL,
	is_active BOOL DEFAULT 1 NULL,
	is_delete BOOL DEFAULT 0 NULL,
	created_at DATETIME DEFAULT CURRENT_TIMESTAMP NULL,
	updated_at DATETIME NULL,
	CONSTRAINT bools_PK PRIMARY KEY (book_id)
)
ENGINE=InnoDB
DEFAULT CHARSET=utf8
COLLATE=utf8_general_ci;

ALTER TABLE practice.bools ADD price NUMERIC NULL;

RENAME TABLE practice.bools TO practice.books;

ALTER TABLE practice.books ADD isbn_number varchar(30) NOT NULL;
ALTER TABLE practice.books ADD CONSTRAINT isbn_UK UNIQUE KEY (isbn_number);

ALTER TABLE practice.users ADD forgot_password_otp varchar(20) NULL;


