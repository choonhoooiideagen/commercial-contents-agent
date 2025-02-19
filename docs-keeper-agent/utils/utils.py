from PyPDF2 import PdfReader
from io import BytesIO
from transformers import GPT2Tokenizer
import json


def pdf_bytes_to_text(pdf_bytes: bytes) -> str:
    """
    Converts the PDF bytes to text.
    Args:
        pdf_bytes (bytes): The PDF bytes to convert to text.
    Returns:
        str: The text extracted from the PDF.
    """
    reader = PdfReader(BytesIO(pdf_bytes))
    contents = ''

    for page in reader.pages:
        contents += page.extract_text()
    
    return contents


def clean_json_string(json_string: str) -> str:
    """
    Cleans the JSON string by removing the escape characters.
    Args:
        json_string (str): The JSON string to clean.
    Returns:
        str: The cleaned JSON string.
    """
    json_string = json_string.replace("```json", "")
    json_string = json_string.replace("```", "")
    json_string = json_string.strip()

    return json_string


def write_to_db(data: dict) -> bool:
    """
    Writes the data to the database.
    Args:
        data (dict): The data to write to the database.
    Returns:
        bool: True if the data was successfully written, False otherwise.
    """
    print("WRITING INTO DB:", data)

    # Load the existing data
    with open("metadata.json", "r") as f:
        existing_data = json.load(f)

    # Append the new data
    existing_data.append(data)

    # Write the data back to the database
    with open("metadata.json", "w") as f:
        json.dump(existing_data, f, indent=2) 


def count_tokens(text: str) -> int:
    """
    Counts the number of tokens in the text.
    Args:
        text (str): The text to count the tokens for.
    Returns:
        int: The number of tokens in the text.
    """
    # Initialize the tokenizer
    tokenizer = GPT2Tokenizer.from_pretrained("gpt2")

    # Tokenize the text
    tokens = tokenizer.tokenize(text)
    num_tokens = len(tokens)

    return num_tokens