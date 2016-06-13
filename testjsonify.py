# -*- conding:utf8 -*-

from flask import Flask, jsonify

app = Flask(__name__)

@app.route('/')
def index():
    data = {"name":"king",
            "age": 10}
    data['success'] = 0
    return jsonify(data)

if __name__ == '__main__':
    app.run()
