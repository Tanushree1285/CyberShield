import os
import uuid
from flask import Blueprint, request, jsonify
from google.cloud import dialogflow
from huggingface_hub import InferenceClient
from dotenv import load_dotenv

# Load environment variables
load_dotenv()

chatbot_bp = Blueprint('chatbot_bp', __name__, url_prefix='/api/chatbot')

# Configuration
PROJECT_ID = os.getenv("DIALOGFLOW_PROJECT_ID", "cybershieldbot-mdcy")
HF_TOKEN = os.getenv("HF_TOKEN")

# Configure HuggingFace client
client = None
if HF_TOKEN:
    client = InferenceClient(api_key=HF_TOKEN)


def detect_intent(message, session_id):
    """
    Send user message to Dialogflow and detect intent
    """
    try:
        session_client = dialogflow.SessionsClient()
        session = session_client.session_path(PROJECT_ID, session_id)

        text_input = dialogflow.TextInput(text=message, language_code="en")
        query_input = dialogflow.QueryInput(text=text_input)

        response = session_client.detect_intent(
            request={
                "session": session,
                "query_input": query_input
            }
        )

        intent = response.query_result.intent.display_name

        if not intent:
            intent = "fallback"

        return intent

    except Exception as e:
        print(f"Error detecting intent: {e}")
        return "fallback"


@chatbot_bp.route('', methods=['POST'])
def chat():
    data = request.get_json()

    message = data.get('message', '')
    country = data.get('country', 'global')
    session_id = data.get('session_id') or str(uuid.uuid4())

    if not message:
        return jsonify({
            "status": "error",
            "message": "No message provided"
        }), 400

    if not client:
        return jsonify({
            "status": "error",
            "message": "HuggingFace API not configured"
        }), 500

    # Detect intent using Dialogflow
    intent = detect_intent(message, session_id)

    # AI prompt
    prompt = f"""
You are CyberShield AI, an intelligent cybersecurity assistant that helps users stay safe online.

User Context:
Region: {country}
Detected Intent: {intent}
User Message: {message}

Your Task:
Provide clear cybersecurity guidance based on the user's question and their region.

Response Guidelines:
• Maximum 100–120 words
• Use bullet points when possible
• Keep language simple and beginner friendly
• Focus on practical safety steps
• Avoid complex technical jargon
• Do not generate unrelated content
• If unsure, suggest safe general cybersecurity practices

Cybercrime Reporting Guidance:
• India → Report at https://cybercrime.gov.in or call 1930
• Ireland → Report cyber incidents at https://www.garda.ie or call 1800 666 111
• Other regions → Suggest contacting local cybercrime authorities or national CERT

If the user asks about:
• phishing → explain how to detect and avoid it
• scams/fraud → provide prevention steps
• password safety → recommend strong password practices
• malware → suggest scanning devices and updating software
• data breaches → suggest immediate security steps

Only reference the user's region if the question is about their local cyber laws, reporting methods, or safety resources.
If the question mentions another country, answer for that country only.

Always prioritize user safety and actionable advice.
"""

    try:
        completion = client.chat.completions.create(
            model="meta-llama/Llama-3.1-8B-Instruct",
            messages=[
                {
                    "role": "user",
                    "content": prompt
                }
            ]
        )

        reply = completion.choices[0].message.content

        return jsonify({
            "status": "success",
            "data": {
                "intent": intent,
                "reply": reply,
                "session_id": session_id
            }
        })

    except Exception as e:
        print(f"Error generating content: {e}")
        return jsonify({
            "status": "error",
            "message": "Failed to generate AI response"
        }), 500