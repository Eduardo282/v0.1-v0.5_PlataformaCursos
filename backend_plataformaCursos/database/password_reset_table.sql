-- ========================================
-- TABLA PARA TOKENS DE RECUPERACIÓN DE CONTRASEÑA
-- ========================================

CREATE TABLE IF NOT EXISTS password_reset_tokens (
  id INT PRIMARY KEY AUTO_INCREMENT,
  user_id INT NOT NULL,
  email VARCHAR(255) NOT NULL,
  token VARCHAR(255) NOT NULL UNIQUE,
  expires_at DATETIME NOT NULL,
  used BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  
  -- Índices para búsquedas rápidas
  INDEX idx_token (token),
  INDEX idx_email (email),
  INDEX idx_expires_at (expires_at),
  INDEX idx_user_id (user_id),
  
  -- Llave foránea (si existe la tabla admin_signup)
  FOREIGN KEY (user_id) REFERENCES admin_signup(id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ========================================
-- EVENTO AUTOMÁTICO PARA LIMPIAR TOKENS EXPIRADOS
-- (Se ejecuta cada día a las 2 AM)
-- ========================================

SET GLOBAL event_scheduler = ON;

CREATE EVENT IF NOT EXISTS cleanup_expired_reset_tokens
ON SCHEDULE EVERY 1 DAY
STARTS TIMESTAMP(CURRENT_DATE) + INTERVAL 2 HOUR
DO
  DELETE FROM password_reset_tokens 
  WHERE expires_at < NOW() OR used = TRUE;

-- ========================================
-- VERIFICAR QUE TODO ESTÁ CORRECTO
-- ========================================

-- Ver estructura de la tabla
DESC password_reset_tokens;

-- Ver eventos programados
SHOW EVENTS LIKE 'cleanup_expired_reset_tokens';
