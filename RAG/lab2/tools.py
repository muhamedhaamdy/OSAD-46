"""
tools.py — Tool definitions for the Multi-modal Medical AI Assistant Agent.

Contains two LangChain tools:
1. web_search   : Finds nearby hospitals using Tavily web search.
2. save_patient_record : Appends structured patient data to a local CSV file.
"""

import os
import csv
from datetime import datetime

from tavily import TavilyClient
from langchain.tools import tool

tavily_client = TavilyClient(api_key=os.getenv("TAVILY_API_KEY", "<YOUR_API_KEY_HERE>"))

CSV_FILE_PATH = os.path.join(os.path.dirname(os.path.abspath(__file__)), "patient_records.csv")


@tool
def web_search(diagnosis: str, location: str) -> str:
    """
    Search the web for the nearest hospitals that can treat a given diagnosis
    at a specific location.

    Args:
        diagnosis: The medical diagnosis or condition to search for
                   (e.g. "Achilles tendon injury").
        location:  The patient's city, address, or region
                   (e.g. "Cairo", "Aswan").

    Returns:
        A string containing the search results from Tavily.
    """
    query = f"nearest hospital for {diagnosis} near {location}"

    response = tavily_client.search(query)

    results_text = []
    for result in response.get("results", []):
        results_text.append(
            f"• {result.get('title', 'N/A')}\n"
            f"  URL: {result.get('url', 'N/A')}\n"
            f"  {result.get('content', 'N/A')}"
        )

    if results_text:
        return "\n\n".join(results_text)
    else:
        return "No hospital results found for the given diagnosis and location."


@tool
def save_patient_record(patient_id: str, case_summary: str, key_insights: str) -> str:
    """
    Append a structured patient record to patient_records.csv.

    The CSV has three columns:
        - Patient_ID_Timestamp : a combined identifier with the current timestamp.
        - Case_Summary         : a brief summary of the patient's case.
        - Key_Insights         : the most important medical insights from the analysis.

    Args:
        patient_id:   A unique identifier for the patient (e.g. "PAT-001").
        case_summary: A concise summary of the patient's case.
        key_insights: The key medical insights derived from the analysis.

    Returns:
        A confirmation message indicating success or an error description.
    """
    try:
        timestamp = datetime.now().strftime("%Y-%m-%d %H:%M:%S")
        combined_id = f"{patient_id} | {timestamp}"

        file_exists = os.path.isfile(CSV_FILE_PATH)

        with open(CSV_FILE_PATH, mode="a", newline="", encoding="utf-8") as csvfile:
            writer = csv.writer(csvfile)

            if not file_exists:
                writer.writerow(["Patient_ID_Timestamp", "Case_Summary", "Key_Insights"])

            writer.writerow([combined_id, case_summary, key_insights])

        return f"✅ Patient record saved successfully for '{patient_id}' at {timestamp}."

    except Exception as e:
        return f"❌ Error saving patient record: {str(e)}"
