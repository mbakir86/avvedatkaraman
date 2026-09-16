ALTER TABLE mail_outbox ADD COLUMN IF NOT EXISTS subscriber_id uuid;
ALTER TABLE mail_outbox ADD COLUMN IF NOT EXISTS kind text NOT NULL DEFAULT 'transactional';
CREATE INDEX IF NOT EXISTS subscriber_token_idx ON subscribers(token_hash);
CREATE INDEX IF NOT EXISTS outbox_pending_idx ON mail_outbox(status,created_at);
