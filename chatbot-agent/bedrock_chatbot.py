import boto3
import uuid
from config import model_id, agent_id, agent_alias_id, aws_profile, aws_region
from chatbot_system_prompts import content_management_system_prompt

# Initialize a session using a specific profile
session = boto3.Session(profile_name=aws_profile,region_name=aws_region)

# Initialize the Bedrock client
bedrock_client = session.client('bedrock-runtime')
bedrock_agent_client = session.client('bedrock-agent-runtime')

def converse_with_model(user_query):
    """Send a message to the Bedrock model and receive a response."""
    messages = [
        {"role": "user", "content": [{"text": user_query}]}
    ]

    response = bedrock_client.converse(
        modelId=model_id,
        messages=messages,
        system=[content_management_system_prompt],
    )
    return response['output']['message']['content'][0]['text']

# Initialize the AWS Bedrock agent clientclient = boto3.client("bedrock-agent-runtime", region_name="us-east-1")
# Replace with your actual agent ID and knowledge base IDagent_id = "your-agent-id"session_id = "your-session-id" 
# Use a unique session ID for each conversation
def invoke_agent(user_input):
    response = bedrock_agent_client.invoke_agent(agentAliasId=agent_alias_id, agentId=agent_id, sessionId=str(uuid.uuid4()), inputText=user_input)

    # Yield streamed events and capture response text
    responses = []
    for event in response["completion"]:
        responses.append({
            "text": event["chunk"]["attribution"]["citations"][0]["generatedResponsePart"]["textResponsePart"]["text"]
        })

    return responses  # Return final response after streaming
