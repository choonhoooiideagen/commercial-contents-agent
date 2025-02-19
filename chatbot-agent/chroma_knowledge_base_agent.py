from langchain_chroma import Chroma
from langchain_openai import AzureOpenAIEmbeddings
from langchain_openai import AzureChatOpenAI
from langchain.chains import RetrievalQA
from dotenv import load_dotenv
import os

load_dotenv()

class ChromaKnowledgeBaseAgent:
    def retrieve(user_prompt):
        # Define the embedding model
        embeddings = AzureOpenAIEmbeddings(
            model=os.getenv('AZURE_OPENAI_EMBEDDING_DEPLOYMENT_NAME'),
            api_key=os.getenv("AZURE_OPENAI_API_KEY"),
            azure_endpoint=os.getenv("AZURE_OPENAI_ENDPOINT"),
            api_version=os.getenv("AZURE_OPENAI_API_VERSION")
        )

        # Create the Chroma vector store
        vector_store = Chroma(
            collection_name="test_collection",
            embedding_function=embeddings,
            persist_directory="./chroma_langchain_db",  # Where to save data locally, remove if not necessary
        )

        # Define the retriever function
        similarity_threshold = 0.3
        retriever = vector_store.as_retriever(search_type="similarity_score_threshold",
                                              search_kwargs={"k": 5, "score_threshold": similarity_threshold})
        
        # Connect to the Azure OpenAI GPT model
        model = AzureChatOpenAI(
            api_key=os.getenv("AZURE_OPENAI_API_KEY"),
            azure_endpoint=os.getenv("AZURE_OPENAI_ENDPOINT"),
            api_version=os.getenv("AZURE_OPENAI_API_VERSION"),
            deployment_name=os.getenv("AZURE_OPENAI_DEPLOYMENT_NAME"),
        )

        qa = RetrievalQA.from_chain_type(
            llm=model,
            chain_type="stuff", 
            retriever=retriever, 
            return_source_documents=True
            )
        
        # Invoke the model for RAG
        answer = qa.invoke({"query": user_prompt})
        string_answer = answer['result']

        chunks= []
        for i in range(len(answer['source_documents'])):
            chunks.append(answer['source_documents'][i].metadata['path'])
        chunks_unique = list(set(chunks))

        # print(f"Answer: {string_answer}\n")
        # print(f"Source documents: {chunks_unique}")

        return f""""knowledge_base": {string_answer}, "source": {chunks_unique}"""