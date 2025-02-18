from flask import Flask, jsonify, render_template, request
from recommendation_agent import generate_payload, recommend

app = Flask(__name__)

def index():
    return render_template('./index.html')

if __name__ == '__main__':
    app.run(debug=True)