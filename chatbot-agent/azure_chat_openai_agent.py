import json
from langchain_openai import AzureChatOpenAI
from langchain_core.prompts import ChatPromptTemplate
from langchain.output_parsers import ResponseSchema, StructuredOutputParser
from config import azure_openai_api_key, azure_openai_endpoint, azure_openai_deployment, azure_openai_api_version
from utils.string_utils import clean_json_string

class AzureChatOpenAIAgent:
    def converse(user_info, user_input, user_input_history):
        llm = AzureChatOpenAI(
            api_key=azure_openai_api_key,
            azure_endpoint=azure_openai_endpoint,
            azure_deployment=azure_openai_deployment,
            api_version=azure_openai_api_version,
            temperature=0,
            max_tokens=None,
            timeout=None,
            max_retries=2,
        )

        response_schemas = [
            ResponseSchema(name="Quote", description="Phrase from the knowledge base sources"),
            ResponseSchema(name="Source", description="Source of the quote"),
        ]

        knowledge_base = "Fire safety in a company is about having extinguisher, fire alarms, and fire drills."
        output_parser = StructuredOutputParser.from_response_schemas(response_schemas)

        prompt = ChatPromptTemplate.from_messages(
             [
                (
                    "system",
                    """
                    You are a Content Management Agent for a large company.
                    You are tasked with recommending the most relevant content from "{knowledge_base}" based on user input.
                    "{output_format}"
                    """
                ),
                (
                    "user",
                    "{user_input}"
                )
             ]
        )

        chain = prompt | llm
        response = chain.invoke({
            "input_language": "English",
            "output_language": "English",
            "user_input": user_input,
            "knowledge_base": knowledge_base,
            "output_format": output_parser,
        })

        response_clean = clean_json_string(response.content)
        response_json = json.loads(response_clean)
        print(response_json)