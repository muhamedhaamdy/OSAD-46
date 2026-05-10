import pathlib
from langchain_openai import OpenAIEmbeddings
from langchain_community.document_loaders import PyPDFLoader
from langchain_community.vectorstores import Chroma
from langchain.chat_models import init_chat_model
from langchain_core.prompts import PromptTemplate
from langchain_text_splitters import RecursiveCharacterTextSplitter
from dotenv import load_dotenv

load_dotenv()

def init_rag_system():
    print("Initializing RAG system and loading documents...")
    embeddings = OpenAIEmbeddings(model="text-embedding-3-small")
    text_splitter = RecursiveCharacterTextSplitter(chunk_size=1000, chunk_overlap=200, separators=["\n\n", "\n", " ", ""])
    pathes = list(pathlib.Path('./data').glob('*.pdf'))
    
    loaded_docs = []
    for path in pathes:
        loader = PyPDFLoader(str(path))
        loaded_docs.extend(loader.load())
        
    if not loaded_docs:
        print("Warning: No PDFs found in ./data directory.")
        
    chunks = text_splitter.split_documents(loaded_docs)
    vectorstore = Chroma.from_documents(chunks, embeddings, collection_name="pdf_chunks")
    llm = init_chat_model(model="gpt-4o-mini", temperature=0.2)
    print("RAG system initialization complete.")
    return vectorstore, llm

def ask_question(question, vectorstore, llm):
    rag_prompt = PromptTemplate(
        template="""
You are a specialized Technical Support Assistant. Your behavior is strictly governed by the following three logic paths:
1. OUT-OF-SCOPE: If the user asks about topics unrelated to [MongoDB Associated Developer Certification], do not attempt to answer. Instead, identify yourself and state your specific expertise.
2. IN-SCOPE & FOUND: You will be provided with retrieved context. If the answer to the user's question is contained within that context, provide a concise and accurate response based ONLY on that information.
3. IN-SCOPE & NOT FOUND: If the user's question is related to your expertise but the provided context does not contain the answer, you must respond exactly with: "I don't know." Do not use your internal knowledge to fill in the gaps.
STRICT RULE: Never hallucinate. If the information is not in the context, do not make it up.
context:
{context}
question:
{question}
""", 
        input_variables=["context", "question"]
    )
    
    response = vectorstore.similarity_search(question, k=4)
    context = "\n\n".join([doc.page_content for doc in response])
    res = llm.invoke(rag_prompt.format(context=context, question=question))
    return res.content

if __name__ == "__main__":
    vectorstore, llm = init_rag_system()
    prompt = "duration of the exam"
    response_text = ask_question(prompt, vectorstore, llm)
    print("Test Output:", response_text)