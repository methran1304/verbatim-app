from rapidfuzz import process
from fastapi import FastAPI
from pydantic import BaseModel

class FuzzySearchRequest(BaseModel):
    errorProneWords: list[str]
    wordPool: list[str]
    topN: int

class FuzzySearchResponse(BaseModel):
    similarWords: dict[str, list[str]]

app = FastAPI()

@app.post("/get-fuzzy-matches")
def get_fuzzy_matches(request: FuzzySearchRequest) -> FuzzySearchResponse:
    similarWordsDict = {}

    for errorProneWord in request.errorProneWords:
        # process.extract returns list of tuples (word, score, index)
        matches = process.extract(errorProneWord, request.wordPool, limit=request.topN)
        
        # Extract just the words from the tuples
        similar_words = [match[0] for match in matches]
        
        print(f"Similar words for '{errorProneWord}': {similar_words}")
        
        similarWordsDict[errorProneWord] = similar_words

    return {"similarWords": similarWordsDict}
    
