# https://pythonprogramminglanguage.com/text-to-speech/
# 

from gtts import gTTS
import os

def say(s,l='en'):
    tts = gTTS(text=s, lang=l)
    tts.save("good.mp3")
    os.system("afplay good.mp3")

#say("Good morning!",'en')