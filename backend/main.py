from flask import Flask,request
import pyrebase
import json

# firebase initialize
firebaseConfig = {
    "apiKey": "AIzaSyDsov6BbfeT8Ugeq9QtyfPRZYbsBoTb8yQ",
    "authDomain": "my-test-2ae49.firebaseapp.com",
    "databaseURL": "https://my-test-2ae49-default-rtdb.firebaseio.com",
    "projectId": "my-test-2ae49",
    "storageBucket": "my-test-2ae49.appspot.com",
    "messagingSenderId": "1026473224878",
    "appId": "1:1026473224878:web:9ddd9f1bc53d1d7bb41b3f"
}

firebase  = pyrebase.initialize_app(firebaseConfig)
db = firebase.database()


app = Flask(__name__)


# Different api's for our client
@app.route('/api', methods=['GET'])
def creat():
    return {'hellow':"heoowcver"}

@app.route('/api/users', methods=['GET'])
def get_users():
    allusers = db.child("users").get()
    if(allusers.val() != None):
        print(len(allusers.val()))
        return allusers.val()
    else:
        return {}
 
@app.route('/api/users', methods=['POST'])
def create_user():
    data = request.get_json()
    db.child('users').child(data['userName']).set({ 'notask':'notask'})
    print(data)
    return data

@app.route('/api/users/<string:username>', methods=['DELETE'])
def delete_user(username):
     print(username) 
     db.child("users").child(username).remove()
     return {'success':'ok'}    

@app.route('/api/users/<string:username>', methods=['POST'])
def add_task(username):
     print(username)
     taskdetails= request.get_json()
     updatedKey =db.child('users').child(username).push({'taskdetail':taskdetails['value']})
     return {'key':updatedKey}

@app.route('/api/users/<string:username>/<string:key>', methods=['PUT'])
def rename_task(username,key):
     print(username,key)
     taskdetails= request.get_json()
     print(taskdetails)
     db.child('users').child(username).child(key).update(taskdetails)
     return {'success':'ok' }


@app.route('/api/users/<string:username>/<string:key>', methods=['DELETE'])
def delete_task(username,key):
     print(username)
     print(key)
     db.child("users").child(username).child(key).remove()
     return {'success':'ok'}

  
if __name__ == '__main__':
    app.run(debug=True)