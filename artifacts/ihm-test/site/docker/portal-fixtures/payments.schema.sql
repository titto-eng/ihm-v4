-- Fixture `payments` table (45-payments §2). Kept apart from schema.sql, which is generated for the five read tables.
-- PROVISIONAL: columns follow the legacy inserts (T/functions.php:2052,2137,2210) and paid updates (T/functions.php:2406-2414);
-- replace with SHOW CREATE TABLE output when the DB access arrives (50-portal-data §10 Q2).
SET NAMES utf8mb4;
DROP TABLE IF EXISTS payments;
CREATE TABLE payments (
  id BIGINT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
  student_name VARCHAR(255) NOT NULL DEFAULT '',
  studentid VARCHAR(50) NOT NULL DEFAULT '0',
  invoice_number VARCHAR(100) NOT NULL DEFAULT '',
  payment_type_id INT NOT NULL DEFAULT 2,
  email VARCHAR(254) NOT NULL DEFAULT '',
  payment_for VARCHAR(255) NULL,
  e2payment VARCHAR(8) NOT NULL DEFAULT 'no',
  amount DECIMAL(10,2) NOT NULL DEFAULT 0.00,
  total DECIMAL(10,2) NOT NULL DEFAULT 0.00,
  paid_amount DECIMAL(10,2) NULL,
  payment_gateway VARCHAR(40) NULL,
  applydate DATE NULL,
  created DATETIME NULL,
  paymentdate DATETIME NULL,
  ip_addr VARCHAR(64) NULL,
  status TINYINT NOT NULL DEFAULT 0,          -- 0 = pending or failed, 1 = paid
  payment_number VARCHAR(255) NULL,
  response_code VARCHAR(255) NULL,
  payment_status VARCHAR(255) NULL,
  payment_response TEXT NULL,
  type VARCHAR(255) NULL,
  sp_status VARCHAR(255) NULL,
  sp_bankTransactionId VARCHAR(255) NULL,
  sp_gatewayResponseCode VARCHAR(255) NULL,
  sp_gatewayResponseMessage VARCHAR(255) NULL,
  sp_orderId VARCHAR(255) NULL,
  sp_dcc_orderId VARCHAR(255) NULL,
  aw_intent_id VARCHAR(255) NULL,
  KEY idx_payments_status (status),
  KEY idx_payments_invoice (invoice_number)
) ENGINE=InnoDB AUTO_INCREMENT=100000;
