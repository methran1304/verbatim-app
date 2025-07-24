import Interfaces.IRapidFuzzService as IRapidFuzzService
from rapidfuzz import fuzz


class RapidFuzzService(IRapidFuzzService):
    def get_fuzzy_matchs(mistyped_words: list[str], word_list: list[str]) -> list[str]:
        #TODO
        pass 