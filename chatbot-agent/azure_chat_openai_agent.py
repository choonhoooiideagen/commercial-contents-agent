from langchain_openai import AzureChatOpenAI
from langchain_core.prompts import ChatPromptTemplate
from langchain.output_parsers import ResponseSchema, StructuredOutputParser
from chroma_knowledge_base_agent import ChromaKnowledgeBaseAgent
# from utils.string_utils import clean_json_string
from dotenv import load_dotenv
# import json
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

        response_schemas = [
            ResponseSchema(name="id", description="ID of the content"),
            ResponseSchema(name="title", description="Title of the content"),
            ResponseSchema(name="summary", description="Summary of the content"),
            ResponseSchema(name="price", description="Price of the content"),
        ]

        knowledge_base_agent = ChromaKnowledgeBaseAgent
        knowledge_base = knowledge_base_agent.retrieve(user_prompt)
        output_parser = StructuredOutputParser.from_response_schemas(response_schemas)

        prompt = ChatPromptTemplate.from_messages(
             [
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
                    You are tasked with recommending relevant content from the provided knowledge base based on user prompt, provide a maximum of 5 recommendations.
                    If the price of the content is not available, fabricate a value.
                    You will need to also provide a short and suitable reply to the user prompt for the recommended content.
                    If there is a mention about the recommended list of content in the response, ensure that the content is listed in using the following format:
                    #contents-list
                    {{
                        "contents": [
                            {{
                                "id": 1,
                                "title": "Learn Spanish",
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
            "user_prompt": user_prompt,
            "knowledge_base": knowledge_base,
            "output_format": output_parser.get_format_instructions(),
        })

        # print(response.content)
        return response.content

        # response_clean = clean_json_string(response.content)
        # response_json = json.loads(response_clean)
        # print(f"Answer: {response_json}\n")
        # return response_json