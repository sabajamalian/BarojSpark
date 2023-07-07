from flask import Flask, request, jsonify
from flask_cors import CORS
import openai
import os

app = Flask(__name__)
CORS(app)

openai.api_key = os.getenv("OPENAI_API_KEY")

intro_message = """Suppose you are a wedding plannign assistant 
                who is here to brain storm ideas with me to help me understand what I need 
                to decide about before planning my wedding. Also, only talk about 
                wedding related stuff and if a question was asked about something other 
                than wedding, redirect the conversation back to wedding related topics. 
                """

conversation = [
    {"role": "system", "content": intro_message}
]

@app.route('/chat', methods=['POST'])
def chat():
    user_message = request.json['message']
    conversation.append({"role": "user", "content": user_message})

    response = openai.ChatCompletion.create(
      model="gpt-3.5-turbo",
      messages=conversation
    )
    assistant_message = response['choices'][0]['message']['content']
    conversation.append({"role": "assistant", "content": assistant_message})

    return jsonify({"message": assistant_message})

if __name__ == '__main__':
    app.run(port=5000)
