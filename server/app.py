from flask import Flask, jsonify, make_response, request
import json
from flask_cors import CORS

app = Flask(__name__) 
CORS(app) # Enable CORS support for this app

# Create function to write JSON data to file 
def write_json(new_data, filename='leaderboard.json'):
    with open(filename,'r+') as file: # Open leaderboard.json in read and write mode
        file_data = json.load(file) # Load data from leaderboard.json as file_data dictionary
        file_data["data"].append(new_data) # Append new_data argument to the "data" key of the file_data dictionary
        file.seek(0)
        json.dump(file_data, file, indent = 4) # Write file_data dictionary to the leaderboard.json in JSON format with an indentation of 4 spaces (more human readable)

@app.route("/", methods=['POST','GET'])
def main():

    # If user is submitting name and score after game
    if request.method == 'POST':
        data = json.loads(request.data) # Load our request.data (JSON formatted string), convert it into a Python object and set it as 'data' variable
        if data:
            write_json(data) # Add data object containing name and score into leaderboard.json 
        
        # Create HTTP response object that can be returned from a Flask view function using make_response function
        return make_response(jsonify({"message":"Success"}), 200) # jsonify function creates JSON response from a Python dictionary

    with open('leaderboard.json','r') as file:
        file_data = json.load(file)
        return make_response(jsonify({"data":file_data['data']}), 200)

# flask run --host=0.0.0.0