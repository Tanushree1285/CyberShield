from flask import Blueprint, request, jsonify
import random

chatbot_bp = Blueprint('chatbot_bp', __name__, url_prefix='/api/chatbot')

# A very simple mock chatbot logic
RESPONSES = [
    "Always use strong, unique passwords for different accounts.",
    "Be cautious of unsolicited emails or messages asking for personal information.",
    "Enable Two-Factor Authentication (2FA) wherever possible.",
    "Keep your software and operating systems updated.",
    "If you suspect fraud, report it immediately to your bank and local cyber authorities.",
    "Do not click on links from unknown senders.",
    "I am a basic CyberShield assistant. My responses are limited right now, but I'm learning!"
]

@chatbot_bp.route('', methods=['POST'])
def chat():
    """
    Handle a chat message from the user.
    """
    data = request.get_json()
    message = data.get('message', '').lower()
    
    if not message:
        return jsonify({"status": "error", "message": "No message provided"}), 400
        
    # Basic keyword matching
    if 'phishing' in message:
        reply = "Phishing is an attempt to steal your data via deceptive emails. Always verify the sender's address."
    elif 'report' in message or 'fraud' in message:
        reply = "To report cyber fraud, visit your regional portal (e.g., cybercrime.gov.in in India) or call the national helpline."
    elif 'password' in message:
        reply = "Make sure your password is at least 12 characters long and includes a mix of letters, numbers, and symbols."
    else:
        reply = random.choice(RESPONSES)
        
    return jsonify({
        "status": "success",
        "data": {
            "reply": reply
        }
    })
