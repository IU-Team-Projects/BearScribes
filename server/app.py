from flask import Flask, send_from_directory
from psycopg2 import sql
import psycopg2
from dotenv import load_dotenv
import os

load_dotenv()

app = Flask(__name__, static_folder='../client/build')

@app.route('/')
def serve_index():
    try:
        db_name = os.getenv('DB_NAME')
        db_user = os.getenv('DB_USER')
        db_password = os.getenv('DB_PASSWORD')
        db_host = os.getenv('DB_HOST')
        db_port = os.getenv('DB_PORT')

        conn = psycopg2.connect(
            dbname=db_name,
            user=db_user,
            password=db_password,
            host=db_host,
            port=db_port
        )

        cur = conn.cursor()
        cur.execute("SELECT version();")

        db_version = cur.fetchone()
        print(f"Database version: {db_version}")

        cur.close()
        conn.close()

    except Exception as e:
        print(f"An error occurred: {e}")


    return send_from_directory(app.static_folder, 'index.html')

@app.route('/<path:path>')
def serve(path):
    return send_from_directory(app.static_folder, path)


if __name__ == '__main__':
    app.run(debug=True)
