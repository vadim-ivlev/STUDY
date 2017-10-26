#!/usr/bin/env python3

# text recognition in python
# 1. install Pyaudio 
#               https://people.csail.mit.edu/hubert/pyaudio/
# 2. pip install SpeechRecognition 
#      example  https://pythonprogramminglanguage.com/speech-recognition/
#      doc      https://pypi.python.org/pypi/SpeechRecognition/
# 
# you should use 
#   r.recognize_google(audio, key="GOOGLE_SPEECH_RECOGNITION_API_KEY")


import speech_recognition as sr
import json #to print
from tts import say



# get audio from the microphone
r = sr.Recognizer()
# silence threshhold to stop listening
r.pause_threshold = 0.5

s=''
while s!='stop it':
    with sr.Microphone() as source:
        print("Speak: Ctll-C to finish, or say 'Stop it'")
        audio = r.listen(source)

    #print("let me think...")

    try:
        # print("You said " + r.recognize_google_cloud(audio))
        #print("You said " + json.dumps( r.recognize_google(audio, language="ru", show_all=True), indent=4 ))
        s = r.recognize_google(audio)
        print("You said:" + s)
        say("Did you said " +s +'?')
        

    except sr.UnknownValueError:
        print("Could not understand audio")
    except sr.RequestError as e:
        print("Could not request results; {0}".format(e))

