import csv
from pyChatGPT import ChatGPT

# session_token = 'xxxx'  # `__Secure-next-auth.session-token` cookie from https://chat.openai.com/chat
# api = ChatGPT(session_token)  # auth with session token

def getDataChatGPT(query):
    return "balbalba"
    resp = api.send_message('Write an essay on Generative AI')
    api.refresh_auth()  # refresh the authorization token
    api.reset_conversation()  # reset the conversation
    return resp['message']


row_list = []

# read the data from the ind companies csv call the chatgpt api
with open('nifty100.csv', newline='') as file:
    reader = csv.reader(file)
    for row in reader:
        row_list.append([row[0], row[1], row[2], getDataChatGPT("hola")])

# new csv file created with the description of all the companeis
with open('newNiftyData.csv', 'w', newline='') as file:
    writer = csv.writer(file)
    writer.writerows(row_list)
