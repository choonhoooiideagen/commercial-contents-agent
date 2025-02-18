from bedrock_chatbot import converse_with_model, invoke_agent

def main():
    # Get user input
    user_input = input("You: ")

    # Converse with the model
    # response = converse_with_model(user_input)
    # print(f"Chatbot: {response}")

    for response in invoke_agent(user_input):
        print(response)  # Streaming output
        

if __name__ == "__main__":
    main()