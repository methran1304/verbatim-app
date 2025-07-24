from abc import ABC, abstractmethod

class IRapidFuzzService(ABC):
    @abstractmethod
    def get_fuzzy_matchs(mistyped_words: list[str], word_list: list[str]) -> list[str]:
        pass