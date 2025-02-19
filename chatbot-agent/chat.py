from langchain_openai import AzureChatOpenAI
import config

def chat(prompt, **kwargs):

    llm = AzureChatOpenAI(
            api_key=config.open_ai_api_key,
            azure_endpoint=config.open_ai_endpoint,
            api_version=config.open_ai_api_version,
            deployment_name=config.open_ai_model,
            )
    
    return llm.invoke(input=prompt)