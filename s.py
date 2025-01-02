import requests
import json

url = 'https://d662-2401-4900-1c89-76bf-94b6-c0c2-e3ef-3976.ngrok-free.app/api/send-message'

data = {
    'content': 'Hello, World!',
    'userId': 1,
    'roomId': 1
}

response = requests.post(url, json=data)

if response.status_code == 201:
    print('Message sent successfully:', response.json())
else:
    print('Failed to send message:', response.json())
