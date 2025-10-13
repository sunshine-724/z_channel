import sqlite3

conn = sqlite3.connect('users.db')
cursor = conn.cursor()

# Ensure users table exists (core columns)
cursor.execute('''
CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    username TEXT UNIQUE,
    password TEXT
)
''')

# Add missing profile columns if they don't exist
cursor.execute("PRAGMA table_info(users)")
cols = [r[1] for r in cursor.fetchall()]
if 'name' not in cols:
    cursor.execute("ALTER TABLE users ADD COLUMN name TEXT")
if 'bio' not in cols:
    cursor.execute("ALTER TABLE users ADD COLUMN bio TEXT")
if 'ico' not in cols:
    cursor.execute("ALTER TABLE users ADD COLUMN ico TEXT")

# posts table: ensure exists
cursor.execute('''
CREATE TABLE IF NOT EXISTS posts (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    text TEXT,
    user_id INTEGER,
    good INTEGER DEFAULT 0,
    heart INTEGER DEFAULT 0,
    createAt TEXT,
    FOREIGN KEY(user_id) REFERENCES users(id)
)
''')

# follows table: follower -> following relationships
cursor.execute('''
CREATE TABLE IF NOT EXISTS follows (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    follower_id INTEGER,
    following_id INTEGER,
    createAt TEXT,
    FOREIGN KEY(follower_id) REFERENCES users(id),
    FOREIGN KEY(following_id) REFERENCES users(id)
)
''')

conn.commit()
conn.close()
