from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import re
import math
from collections import Counter

app = FastAPI(title="Austere-Analytics AI Service", version="1.0.0")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3001", "http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# ---------------------------------------------------------------------------
# Models
# ---------------------------------------------------------------------------

class TextQuery(BaseModel):
    text: str

class SummarizeQuery(BaseModel):
    text: str
    sentences: int = 3

class ChatHistoryMessage(BaseModel):
    role: str   # "user" or "bot"
    content: str

class ChatMessage(BaseModel):
    message: str
    history: list[ChatHistoryMessage] = []

# ---------------------------------------------------------------------------
# Helpers
# ---------------------------------------------------------------------------

STOP_WORDS = {
    "a", "an", "the", "and", "or", "but", "in", "on", "at", "to", "for",
    "of", "with", "by", "from", "is", "are", "was", "were", "be", "been",
    "has", "have", "had", "do", "does", "did", "will", "would", "could",
    "should", "may", "might", "this", "that", "these", "those", "i", "we",
    "you", "he", "she", "it", "they", "my", "our", "your", "his", "her",
    "its", "their", "not", "no", "nor", "so", "yet", "both", "either",
    "each", "few", "more", "most", "other", "some", "such", "than", "too",
    "very", "just", "as", "if", "about", "also", "then", "into", "up",
}

POSITIVE_WORDS = {
    "great", "excellent", "good", "amazing", "wonderful", "fantastic",
    "awesome", "outstanding", "brilliant", "superb", "perfect", "love",
    "best", "positive", "happy", "success", "successful", "helpful",
    "innovative", "efficient", "effective", "professional", "quality",
}

NEGATIVE_WORDS = {
    "bad", "terrible", "awful", "horrible", "poor", "worst", "hate",
    "disappointing", "failure", "failed", "negative", "problem", "issue",
    "difficult", "hard", "ugly", "broken", "error", "bug", "slow",
    "inefficient", "weak", "useless", "waste",
}


def tokenize(text: str) -> list[str]:
    return re.findall(r"\b[a-zA-Z']+\b", text.lower())


def sentence_split(text: str) -> list[str]:
    return [s.strip() for s in re.split(r"(?<=[.!?])\s+", text.strip()) if s.strip()]


def tf_idf_score(sentence: str, word_freq: Counter, total_words: int) -> float:
    words = [w for w in tokenize(sentence) if w not in STOP_WORDS]
    if not words:
        return 0.0
    score = sum(word_freq.get(w, 0) / max(total_words, 1) for w in words)
    return score / len(words)


# ---------------------------------------------------------------------------
# Routes
# ---------------------------------------------------------------------------

@app.get("/")
def read_root():
    return {"message": "Austere-Analytics AI Service is running", "version": "1.0.0"}


@app.post("/process-text")
def process_text(query: TextQuery):
    """Basic text processing — word count, char count, sentences."""
    tokens = tokenize(query.text)
    sentences = sentence_split(query.text)
    meaningful = [w for w in tokens if w not in STOP_WORDS]
    return {
        "original_text": query.text,
        "word_count": len(tokens),
        "character_count": len(query.text),
        "sentence_count": len(sentences),
        "meaningful_words": len(meaningful),
        "processed_text": f"Processed: {len(tokens)} words across {len(sentences)} sentences.",
    }


@app.post("/analyze")
def analyze_text(query: TextQuery):
    """
    Analyse text for:
    - basic statistics
    - keyword extraction (top-10 non-stopword terms)
    - simple sentiment (positive / negative / neutral)
    - estimated reading time (avg 200 wpm)
    """
    tokens = tokenize(query.text)
    sentences = sentence_split(query.text)
    meaningful = [w for w in tokens if w not in STOP_WORDS]
    freq = Counter(meaningful)
    top_keywords = [word for word, _ in freq.most_common(10)]

    pos_hits = sum(1 for w in tokens if w in POSITIVE_WORDS)
    neg_hits = sum(1 for w in tokens if w in NEGATIVE_WORDS)
    if pos_hits > neg_hits:
        sentiment = "positive"
    elif neg_hits > pos_hits:
        sentiment = "negative"
    else:
        sentiment = "neutral"

    reading_time_seconds = max(1, math.ceil(len(tokens) / 200 * 60))

    return {
        "word_count": len(tokens),
        "sentence_count": len(sentences),
        "character_count": len(query.text),
        "avg_words_per_sentence": round(len(tokens) / max(len(sentences), 1), 1),
        "keywords": top_keywords,
        "sentiment": sentiment,
        "sentiment_detail": {"positive_signals": pos_hits, "negative_signals": neg_hits},
        "reading_time_seconds": reading_time_seconds,
        "reading_time_label": f"{reading_time_seconds // 60}m {reading_time_seconds % 60}s" if reading_time_seconds >= 60 else f"{reading_time_seconds}s",
    }


@app.post("/summarize")
def summarize_text(query: SummarizeQuery):
    """
    Extractive summarization: picks the top N sentences ranked by
    term-frequency score of their meaningful words.
    """
    text = query.text.strip()
    sentences = sentence_split(text)

    if len(sentences) <= query.sentences:
        return {"summary": text, "original_sentence_count": len(sentences), "summary_sentence_count": len(sentences)}

    tokens = [w for w in tokenize(text) if w not in STOP_WORDS]
    freq = Counter(tokens)
    total = len(tokens)

    scored = [(s, tf_idf_score(s, freq, total), idx) for idx, s in enumerate(sentences)]
    top = sorted(scored, key=lambda x: x[1], reverse=True)[: query.sentences]
    # Restore original order
    top_sorted = sorted(top, key=lambda x: x[2])
    summary = " ".join(s for s, _, _ in top_sorted)

    return {
        "summary": summary,
        "original_sentence_count": len(sentences),
        "summary_sentence_count": len(top_sorted),
    }


# ---------------------------------------------------------------------------
# Chatbot helpers
# ---------------------------------------------------------------------------

SERVICE_KEYWORDS = {
    "web": ["web", "website", "webapp", "site", "landing", "frontend", "backend", "fullstack", "full-stack"],
    "mobile": ["mobile", "app", "ios", "android", "react native", "flutter"],
    "ai": ["ai", "artificial intelligence", "machine learning", "ml", "data", "analytics", "automation"],
    "design": ["design", "ui", "ux", "branding", "logo", "figma"],
    "ecommerce": ["ecommerce", "e-commerce", "shop", "store", "shopify", "woocommerce"],
}

BUDGET_HIGH = ["50k", "50,000", "100k", "100,000", "enterprise", "large budget", "big budget", "unlimited"]
BUDGET_MID = ["20k", "20,000", "30k", "30,000", "40k", "40,000", "medium", "mid"]
BUDGET_LOW = ["under 5k", "less than 5k", "small budget", "cheap", "low budget", "2k", "3k", "4k", "1k"]


def detect_service(text: str) -> str | None:
    lower = text.lower()
    for service, keywords in SERVICE_KEYWORDS.items():
        if any(kw in lower for kw in keywords):
            return service
    return None


def detect_budget_tier(text: str) -> str:
    lower = text.lower()
    if any(kw in lower for kw in BUDGET_HIGH):
        return "high"
    if any(kw in lower for kw in BUDGET_MID):
        return "mid"
    if any(kw in lower for kw in BUDGET_LOW):
        return "low"
    # Detect numeric ranges
    numbers = re.findall(r"\d[\d,]*", lower.replace(",", ""))
    for num_str in numbers:
        try:
            value = int(num_str.replace(",", ""))
            if value >= 50000:
                return "high"
            if value >= 20000:
                return "mid"
            if value < 5000:
                return "low"
        except ValueError:
            pass
    return "unknown"


STAGE_RESPONSES = {
    "greeting": (
        "Hi there! 👋 I'm the Austere-Analytics assistant. We build world-class web, mobile, and AI solutions. "
        "What kind of project are you looking to build?"
    ),
    "ask_project_detail": (
        "That sounds interesting! Tell me a bit more about your project — what's the main goal you're trying to achieve?"
    ),
    "ask_budget": (
        "Great! To connect you with the right team, what's your approximate budget for this project? "
        "(e.g. under $5k, $5k–$20k, $20k–$50k, $50k+)"
    ),
    "ask_timeline": (
        "Understood! And what's your ideal timeline — do you need this done ASAP, "
        "within 1–3 months, 3–6 months, or is the timeline flexible?"
    ),
    "qualify_high": (
        "This sounds like a fantastic project! 🚀 Based on what you've shared, I think we'd be a great fit. "
        "Our team specialises in exactly this kind of work. "
        "Would you like to fill out our contact form or schedule a free discovery call with one of our specialists? "
        "👉 [Contact us here](/contact)"
    ),
    "qualify_mid": (
        "Thanks for sharing that! We work with a wide range of budgets and would love to explore how we can help. "
        "The best next step is to have a quick chat with our team. "
        "👉 [Send us a message here](/contact)"
    ),
    "qualify_low": (
        "Thanks for being upfront about the budget! We have flexible engagement models, including fixed-scope packages. "
        "Let's see if there's a good fit — "
        "👉 [drop us a message here](/contact) and mention your budget constraints."
    ),
    "qualify_unknown": (
        "Perfect, thank you! Let's connect you with one of our specialists who can walk you through options and pricing. "
        "👉 [Reach out here](/contact) and we'll get back to you within 24 hours."
    ),
    "fallback": (
        "Thanks for your message! I'm still learning, but our team is always happy to help directly. "
        "👉 [Contact us here](/contact) for a quick response."
    ),
}


@app.post("/chat")
def chat(message: ChatMessage):
    """
    Rule-based lead-qualification chatbot.
    Progresses through stages: greeting → service → detail → budget → timeline → qualify/CTA
    """
    history = message.history
    user_text = message.message.strip()

    # Count number of bot turns to determine current stage
    bot_turns = sum(1 for m in history if m.role == "bot")

    # Collect all prior user messages for context
    user_history_text = " ".join(m.content for m in history if m.role == "user") + " " + user_text

    action = None  # optional: "contact" | "schedule"

    if bot_turns == 0:
        # Stage 0 → greet and ask what they want to build
        reply = STAGE_RESPONSES["greeting"]

    elif bot_turns == 1:
        # Stage 1 → user described what they want; ask for more detail
        service = detect_service(user_history_text)
        if service:
            service_labels = {
                "web": "a web application",
                "mobile": "a mobile app",
                "ai": "an AI / data solution",
                "design": "a design project",
                "ecommerce": "an e-commerce store",
            }
            reply = (
                f"Great — {service_labels.get(service, 'that')} is right in our wheelhouse! "
                + STAGE_RESPONSES["ask_project_detail"].split("That sounds interesting! ")[1]
            )
        else:
            reply = STAGE_RESPONSES["ask_project_detail"]

    elif bot_turns == 2:
        # Stage 2 → ask budget
        reply = STAGE_RESPONSES["ask_budget"]

    elif bot_turns == 3:
        # Stage 3 → ask timeline
        reply = STAGE_RESPONSES["ask_timeline"]

    elif bot_turns == 4:
        # Stage 4 → qualify based on detected budget and wrap up
        budget = detect_budget_tier(user_history_text)
        if budget == "high":
            reply = STAGE_RESPONSES["qualify_high"]
            action = "contact"
        elif budget == "mid":
            reply = STAGE_RESPONSES["qualify_mid"]
            action = "contact"
        elif budget == "low":
            reply = STAGE_RESPONSES["qualify_low"]
            action = "contact"
        else:
            reply = STAGE_RESPONSES["qualify_unknown"]
            action = "contact"

    else:
        # Follow-up: keep it simple and direct to contact page
        reply = STAGE_RESPONSES["fallback"]
        action = "contact"

    return {"reply": reply, "action": action}

