def detect_type(title, description=""):
    """
    Categorizes the article intelligently using NLP keywords rather than hardcoded metrics
    """
    text = (title + " " + description).lower()

    high_profile_keywords = [
        "arrest", "scam", "breach", "cyber attack", "fraud", 
        "ransomware", "hacking incident"
    ]

    advisory_keywords = [
        "advisory", "warning", "cert", "alert", 
        "vulnerability notice", "security bulletin"
    ]

    awareness_keywords = [
        "awareness", "guide", "tips", "best practices", 
        "how to protect", "cyber safety"
    ]

    for word in high_profile_keywords:
        if word in text:
            return "high_profile"
            
    for word in advisory_keywords:
        if word in text:
            return "advisory"

    for word in awareness_keywords:
        if word in text:
            return "awareness"

    # Default if no keywords match but we want to fallback to advisory
    return "advisory"
