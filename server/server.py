from flask import Flask, request, jsonify
import psycopg2
import psycopg2.extras
import json
from flask_cors import CORS

app = Flask(__name__)
CORS(app, resources={r"/*": {"origins": "*", "methods": ["GET", "POST", "OPTIONS"], "allow_headers": ["*"]}})
# PostgreSQL connection details
DATABASE_URL = "postgresql://admin:NCv9fSOVeKP0YbknvPisdctwTG5KTtYY@dpg-ctt37f9opnds73c993j0-a.oregon-postgres.render.com/epic_name_db"

def get_connection():
    """Create and return a connection to the PostgreSQL database."""
    conn = psycopg2.connect(DATABASE_URL, sslmode='require')
    return conn

# Initialize the PostgreSQL database if it doesn't exist
try:
    conn = get_connection()
    with conn:
        with conn.cursor() as cursor:
            cursor.execute("""
                CREATE TABLE IF NOT EXISTS design_data (
                    id SERIAL PRIMARY KEY,
                    name TEXT UNIQUE NOT NULL,
                    payload JSONB NOT NULL
                )
            """)
    conn.close()
except Exception as e:
    print(f"Error initializing database: {e}")

@app.route("/", methods=["GET"])
def home():
  
    try:
        conn = get_connection()
        with conn:
            with conn.cursor(cursor_factory=psycopg2.extras.DictCursor) as cursor:
                cursor.execute("SELECT payload FROM design_data WHERE name = %s", ("some_name",))
                row = cursor.fetchone()
    except Exception as e:
        return jsonify({"error": str(e)}), 500
    finally:
        conn.close()

    if not row:
        return jsonify({"error": "Data not found"}), 404

    return jsonify({
        "name": "some_name",
        "payload": row['payload']  # Automatically parsed from JSONB
    }), 200




@app.route('/store_data', methods=['POST'])
def store_data():
    """
    POST /store_data
    Body (JSON):
      {
        "name": "someName",
        "payload": { ... }   // any JSON data
      }
    """
    data = request.get_json()
    if not data:
        return jsonify({"error": "No JSON data provided"}), 400

    name = data.get('name')
    payload = data.get('payload')

    if not name or payload is None:
        return jsonify({"error": "Missing 'name' or 'payload' in JSON"}), 400

    try:
        conn = get_connection()
        with conn:
            with conn.cursor() as cursor:
                cursor.execute("""
                    INSERT INTO design_data (name, payload)
                    VALUES (%s, %s)
                    ON CONFLICT (name)
                    DO UPDATE SET payload = EXCLUDED.payload
                """, (name, json.dumps(payload)))
        conn.commit()
    except Exception as e:
        return jsonify({"error": str(e)}), 500
    finally:
        conn.close()

    return jsonify({"message": "Data stored successfully"}), 200


@app.route('/get_data', methods=['GET'])
def get_data():
    """
    GET /get_data?name=someName
    Returns:
      {
        "name": "someName",
        "payload": { ... }   // JSON data
      }
    """
    name = request.args.get('name')
    if not name:
        return jsonify({"error": "No 'name' query parameter provided"}), 400

    try:
        conn = get_connection()
        with conn:
            with conn.cursor(cursor_factory=psycopg2.extras.DictCursor) as cursor:
                cursor.execute("SELECT payload FROM design_data WHERE name = %s", (name,))
                row = cursor.fetchone()
    except Exception as e:
        return jsonify({"error": str(e)}), 500
    finally:
        conn.close()

    if not row:
        return jsonify({"error": "Data not found"}), 404

    return jsonify({
        "name": name,
        "payload": row['payload']  # Automatically parsed from JSONB
    }), 200


if __name__ == '__main__':
    app.run(debug=True, port=5000)
