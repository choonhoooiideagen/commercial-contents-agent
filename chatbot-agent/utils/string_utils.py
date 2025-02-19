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