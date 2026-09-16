export const DATABASE_SCHEMA = `
PRAGMA auto_vacuum = INCREMENTAL;

CREATE TABLE IF NOT EXISTS candlesticks (
  id         INTEGER PRIMARY KEY AUTOINCREMENT,
  exchange   VARCHAR(255) NULL,
  symbol     VARCHAR(255) NULL,
  period     VARCHAR(255) NULL,
  time       INTEGER          NULL,
  open       REAL         NULL,
  high       REAL         NULL,
  low        REAL         NULL,
  close      REAL         NULL,
  volume     REAL         NULL
);

CREATE UNIQUE INDEX IF NOT EXISTS unique_candle
  ON candlesticks (exchange, symbol, period, time);

CREATE INDEX IF NOT EXISTS time_idx ON candlesticks (time);
CREATE INDEX IF NOT EXISTS exchange_symbol_idx ON candlesticks (exchange, symbol);

CREATE TABLE IF NOT EXISTS candlesticks_log (
  id         INTEGER PRIMARY KEY AUTOINCREMENT,
  income_at  BIGINT       NULL,
  exchange   VARCHAR(255) NULL,
  symbol     VARCHAR(255) NULL,
  period     VARCHAR(255) NULL,
  time       INTEGER      NULL,
  open       REAL         NULL,
  high       REAL         NULL,
  low        REAL         NULL,
  close      REAL         NULL,
  volume     REAL         NULL
);

CREATE INDEX IF NOT EXISTS candle_idx ON candlesticks_log (exchange, symbol, period, time);

CREATE TABLE IF NOT EXISTS ticker (
  id         INTEGER PRIMARY KEY AUTOINCREMENT,
  exchange   VARCHAR(255) NULL,
  symbol     VARCHAR(255) NULL,
  ask        REAL         NULL,
  bid        REAL         NULL,
  updated_at INT          NULL
);

CREATE UNIQUE INDEX IF NOT EXISTS ticker_unique
  ON ticker (exchange, symbol);

CREATE TABLE IF NOT EXISTS ticker_log (
  id         INTEGER PRIMARY KEY AUTOINCREMENT,
  exchange   VARCHAR(255) NULL,
  symbol     VARCHAR(255) NULL,
  ask        REAL         NULL,
  bid        REAL         NULL,
  income_at  BIGINT       NULL
);
CREATE INDEX IF NOT EXISTS ticker_log_idx ON ticker_log (exchange, symbol);
CREATE INDEX IF NOT EXISTS ticker_log_time_idx ON ticker_log (exchange, symbol, income_at);

CREATE TABLE IF NOT EXISTS signals (
  id         INTEGER PRIMARY KEY AUTOINCREMENT,
  exchange   VARCHAR(255) NULL,
  symbol     VARCHAR(255) NULL,
  ask        REAL         NULL,
  bid        REAL         NULL,
  options    TEXT         NULL,
  side       VARCHAR(50)  NULL,
  strategy   VARCHAR(50)  NULL,
  income_at  BIGINT       NULL,
  state      VARCHAR(50)  NULL
);
CREATE INDEX IF NOT EXISTS symbol_idx ON signals (exchange, symbol);

CREATE TABLE IF NOT EXISTS logs (
  uuid       VARCHAR(64) PRIMARY KEY,
  level      VARCHAR(32) NOT NULL,
  message    TEXT NULL,
  created_at INT NOT NULL
);

CREATE INDEX IF NOT EXISTS created_at_idx ON logs (created_at);
CREATE INDEX IF NOT EXISTS level_created_at_idx ON logs (level, created_at);
CREATE INDEX IF NOT EXISTS level_idx ON logs (level);

CREATE TABLE IF NOT EXISTS paper_accounts (
  profile_id       VARCHAR(64)  PRIMARY KEY,
  exchange         VARCHAR(255) NULL,
  quote_currency   VARCHAR(32)  NULL,
  initial_balance  REAL         NULL,
  cash             REAL         NULL,
  created_at       INTEGER      NULL
);

CREATE TABLE IF NOT EXISTS paper_positions (
  profile_id   VARCHAR(64)  NOT NULL,
  pair         VARCHAR(255) NOT NULL,
  side         VARCHAR(16)  NULL,
  amount       REAL         NULL,
  entry_price  REAL         NULL,
  opened_at    INTEGER      NULL,
  PRIMARY KEY (profile_id, pair)
);

CREATE TABLE IF NOT EXISTS paper_trades (
  id           INTEGER PRIMARY KEY AUTOINCREMENT,
  profile_id   VARCHAR(64)  NULL,
  pair         VARCHAR(255) NULL,
  side         VARCHAR(16)  NULL,
  amount       REAL         NULL,
  price        REAL         NULL,
  quote_amount REAL         NULL,
  pnl          REAL         NULL,
  created_at   INTEGER      NULL
);

CREATE INDEX IF NOT EXISTS paper_trades_profile_idx ON paper_trades (profile_id, created_at);
`;
