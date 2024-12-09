from flask import Flask, request, jsonify
import requests

app = Flask(__name__)

# Замените на ваш токен бота и chat_id
TELEGRAM_TOKEN = '8094857434:AAFZD7kXAluBqoYSGroYe-QHL644qbgxo74'  # Ваш токен бота
CHAT_ID = '6187759773'  # Ваш chat_id

@app.route('/send_message', methods=['POST'])
def send_message():
    data = request.json
    name = data['name']
    message = data['message']
    
    # Формируем сообщение для Telegram
    telegram_message = f"Имя: {name}\nСообщение: {message}"
    send_telegram_message(telegram_message)
    return jsonify({"status": "success", "message": "Сообщение отправлено в бот!"})

def send_telegram_message(message):
    url = f"https://api.telegram.org/bot{TELEGRAM_TOKEN}/sendMessage"
    payload = {
        'chat_id': CHAT_ID,
        'text': message
    }
    requests.post(url, json=payload)

if __name__ == '__main__':
    app.run(port=5000)
