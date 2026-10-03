-- Twelve-hour defaults for new sources, and reschedule existing collectors from their last attempt.
-- External sources receive pushed material and have no collection schedule.
ALTER TABLE sources ALTER COLUMN interval_minutes SET DEFAULT 720;

UPDATE sources
SET interval_minutes = 720,
    next_fetch_at = CASE
      WHEN last_fetch_at IS NULL THEN coalesce(next_fetch_at, now())
      ELSE greatest(now(), last_fetch_at + interval '12 hours')
    END,
    updated_at = now()
WHERE kind IN ('rss', 'web_list', 'json_list', 'x_search', 'mp_account');
