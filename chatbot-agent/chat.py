from langchain_openai import AzureChatOpenAI
import config
from azure_chat_openai_agent import AzureChatOpenAIAgent

def chat(prompt, conversation_history, **kwargs):

        agent = AzureChatOpenAIAgent
        return agent.converse(user_info=None, user_prompt=prompt, user_prompt_history=conversation_history)