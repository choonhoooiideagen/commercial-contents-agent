from langchain_openai import AzureChatOpenAI
import config
from azure_chat_openai_agent import AzureChatOpenAIAgent

def chat(prompt, **kwargs):

        agent = AzureChatOpenAIAgent
        return agent.converse(user_info=None, user_input=prompt, user_input_history=[])