from flask import Flask, request, jsonify
from chat import chat

app = Flask(__name__)

print(chat("What'sup?").content)

@app.route("/invoke", methods=["POST"])
def invoke_model():
    try:
        # Get JSON request body
        data = request.get_json()
        prompt = data.get("prompt", "")
        conversation_history = data.get("conversationHistory", [])
        print(conversation_history)
        if not prompt:
            return jsonify({"error": "Message is required"}), 400

        # Invoke the LangChain model
        response = chat(
                    prompt=prompt,
                    conversation_history=conversation_history)

        return jsonify({"response": response.content})

    except Exception as e:
        return jsonify({"error": str(e)}), 500

if __name__ == "__main__":
    app.run(debug=True, host="0.0.0.0", port=5000)