import json
from random import randint
from asyncio import sleep

from channels.generic.websocket import AsyncWebsocketConsumer

def gen_days():
    days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"]
    index = 0
    while True:
        yield days[index]
        index += 1
        if index > 6:
            index = 0
class WSConsumer(AsyncWebsocketConsumer):
    def __init__(self):
        super().__init__()
        self.day = gen_days()

    async def connect(self):
        await self.accept()

        for i in range(1000):
            day = next(self.day)
            await self.send(json.dumps({'value': randint(0, 50), "day": day}))
            await sleep(1)