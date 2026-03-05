import sqlite3
import os

db_path = "cybershield_dev.db"
if not os.path.exists(db_path):
    print(f"Database {db_path} not found.")
else:
    conn = sqlite3.connect(db_path)
    cursor = conn.cursor()
    query = """
    SELECT c.name, a.type, COUNT(*)
    FROM articles a
    JOIN countries c ON a.country_id = c.id
    GROUP BY c.name, a.type;
    """
    cursor.execute(query)
    results = cursor.fetchall()
    print("Country | Type | Count")
    print("-" * 30)
    for row in results:
        print(f"{row[0]} | {row[1]} | {row[2]}")
    conn.close()
