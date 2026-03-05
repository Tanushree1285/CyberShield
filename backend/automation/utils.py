def detect_type(title, description=""):
    """
    Categorizes the article intelligently using NLP keywords rather than hardcoded metrics
    """
    text = (title + " " + description).lower()

    cybercrime_keywords = [
        "attack", "breach", "hacked", "malware", "virus", "trojan",
        "ransomware", "phishing", "exploit", "vulnerability", "cve",
        "data leak", "cyber crime", "cybercrime", "fraud", "scam",
        "theft", "stolen", "arrest", "dark web", "ddos"
    ]

    awareness_keywords = [
        "awareness", "guideline", "guidelines", "best practices", "how to", "guide",
        "training", "security tips", "tips", "precaution", "protect", "safe", "education",
        "public notice", "campaign", "initiative", "framework", "policy",
        "strategy", "advice", "report", "survey"
    ]

    for word in cybercrime_keywords:
        if word in text:
            return "cybercrime"

    for word in awareness_keywords:
        if word in text:
            return "awareness"

    return "advisory"
