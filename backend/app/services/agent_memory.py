class AgentMemory:

    def __init__(self):
        self.data = {}

    def save(self, key, value):
        self.data[key] = value

    def get(self, key):
        return self.data.get(key)

    def has(self, key):
        return key in self.data

    def all(self):
        return self.data