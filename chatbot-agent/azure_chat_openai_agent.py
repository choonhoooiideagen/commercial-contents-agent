from langchain_openai import AzureChatOpenAI
from langchain_core.prompts import ChatPromptTemplate, MessagesPlaceholder
from chroma_knowledge_base_agent import ChromaKnowledgeBaseAgent
from dotenv import load_dotenv
import os

load_dotenv()

class AzureChatOpenAIAgent:
    def converse(user_info, user_prompt, user_prompt_history):
        llm = AzureChatOpenAI(
            api_key=os.getenv("AZURE_OPENAI_API_KEY"),
            azure_endpoint=os.getenv("AZURE_OPENAI_ENDPOINT"),
            azure_deployment=os.getenv("AZURE_OPENAI_DEPLOYMENT_NAME"),
            api_version=os.getenv("AZURE_OPENAI_API_VERSION"),
            temperature=0,
            max_tokens=None,
            timeout=None,
            max_retries=2,
        )


        knowledge_base_agent = ChromaKnowledgeBaseAgent
        knowledge_base = knowledge_base_agent.retrieve(user_prompt)

        # Convert user_prompt_history to the desired format
        past_conversation = [
            (message['role'], message['content']) for message in user_prompt_history
        ]

        prompt = ChatPromptTemplate.from_messages(
             [
                MessagesPlaceholder("past_conversation"),
                (
                    "system",
                    """
                    You are provided a knowledge base that consists of "{knowledge_base}".
                    """
                ),
                (
                    "system",
                    """
                    You are a Content Management Agent for a large company.
                    You are tasked with recommending relevant content strictly from the provided knowledge base based on user prompt, provide a maximum of 5 recommendations.
                    If the price of the content is not available, fabricate a value.
                    You will need to also provide a short and suitable reply to the user prompt for the recommended content.
                    If there is a mention about the recommended list of content in the response, ensure that the content is listed in using the following format:
                    #contents-list
                    {{
                        "contents": [
                            {{
                                "id": 1,
                                "title": "Learn Spanish",
                                "summary": "Learn Spanish in 30 days",
                                "path": "path/to/content",
                                "price": 10
                            }}
                        ]
                    }}
                    #end-contents-list
                    """
                ),
                (
                    "user",
                    "{user_prompt}"
                )
             ]
        )

        chain = prompt | llm
        response = chain.invoke({
            "input_language": "English",
            "output_language": "English",
            "knowledge_base": knowledge_base,
            "user_prompt": user_prompt,
            "past_conversation": past_conversation
        })

        return response.content