import os, sys, sqlite3
db_path = os.path.join(os.getcwd(), 'cybershield_dev.db')
conn = sqlite3.connect(db_path)
cursor = conn.cursor()

cursor.execute('CREATE INDEX IF NOT EXISTS idx_articles_date ON articles(published_date);')
cursor.execute('CREATE INDEX IF NOT EXISTS idx_articles_country ON articles(country_id);')
cursor.execute('CREATE INDEX IF NOT EXISTS idx_articles_type ON articles(type);')
cursor.execute('CREATE UNIQUE INDEX IF NOT EXISTS idx_articles_url ON articles(url);')
conn.commit()
print("Indexes created successfully.")
cursor.execute('PRAGMA index_list(articles);')
for r in cursor.fetchall():
    print(r)
