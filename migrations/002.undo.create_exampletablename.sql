ALTER TABLE blogful_articles
    DROP COLUMN IF EXISTS
        style;

DROP TYPE IF EXISTS article_category;
