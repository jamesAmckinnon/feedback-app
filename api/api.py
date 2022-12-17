from flask import Flask, request, json

app = Flask(__name__)

@app.route('/api', methods=['GET'])
def index():
    return {
        'name': 'Hello World'
    }

@app.route('/api/create', methods=['POST'])
def create():
    theData = json.loads(request.data)
    print(int(theData['content']))
    return {"content": int(theData['content']) + 1}

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5001, debug=True)