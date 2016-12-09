from flask import Flask, jsonify, send_from_directory
import pandas as pd
import random, string
from flask_socketio import SocketIO

app = Flask(__name__)
app.config['SECRET_KEY'] = 'secret!'
socketio = SocketIO(app)


@app.route("/")
def index():
    return send_from_directory('', 'index.html')


@app.route("/get/<id>")
def get(id=-1):
    for d in data:
        if str(d['id']) == id:
            print d
            print "~~~~~~~~~~~~"
            return jsonify(d)
    return jsonify({0: 0})


@app.route("/<path>")
@app.route("/<dir>/<path>")
def getFile(dir='', path=''):
    return send_from_directory(dir, path)


@app.route("/reset")
def reset():
    data.append({'id': 0, 'name': 'Nateland', 'health': 100, 'team': 'red'})
    data.append({'id': 15, 'name': 'Sebland', 'health': 100, 'team': 'blue'})
    for i in range(1, 15):
        name = ''.join(random.choice(string.ascii_uppercase + string.digits) for _ in range(5));
        team = 'red'
        if i % 2 == 0:
            team = 'blue'
        data.append({'id': i, 'name': name, 'health': 100, 'team': team})

    ret = ""

    for r in data:
        ret += str(r['id']) + ", "
        ret += str(r['name']) + ", "
        ret += str(r['health']) + ", "
        ret += str(r['team'])
        ret += "<br>"
    return ret


@app.route("/view")
def view():
    for r in data:
        ret += str(r['id']) + ", "
        ret += str(r['name']) + ", "
        ret += str(r['health']) + ", "
        ret += str(r['team'])
        ret += "<br>"
    return ret


if __name__ == "__main__":
    data = []
    data.append({'id': 0, 'name': 'Nateland', 'health': 100, 'team': 'red'})
    data.append({'id': 15, 'name': 'Sebland', 'health': 100, 'team': 'blue'})
    for i in range(1, 15):
        name = ''.join(random.choice(string.ascii_uppercase + string.digits) for _ in range(5));
        team = 'red'
        if i % 2 == 0:
            team = 'blue'
        data.append({'id': i, 'name': name, 'health': 100, 'team': team})
    socketio.run(app, host="0.0.0.0", port=80, debug=True)
