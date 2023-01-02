import csv
from pyChatGPT import ChatGPT

session_token = 'eyJhbGciOiJkaXIiLCJlbmMiOiJBMjU2R0NNIn0..-VbIXEI1i8RQBltc.u9y7ipfJB077b30k3Cqpylus91YXPXLBDXKsgS8uh0na3weq5R7kmbrqGMfYQ3Acyf3wnOvhnXqQrg92oGiOrV3JgwcJNlNq2t4WWO1pOxi0OdZ930pykMzEM3XnnThJ3eo2BYZaTdoxcR9Gh1vURwieKEelYajs1AJkT5OrWyknBB5Px-Y8s8BEDOfWBSGUW_Zk-2nnllsOnLDfoRsdXP6Ko87Xo8oZ55Zs1LvQ0h1oSKEPyGHz_zZi5HSSvdu0JMbcuS3T940XyeGYwlT0WF8kdXlhWl-sO6v2lHV9SzFSMwj3yK7swBBWuWItcsXqUsWbLNL220z9JtvNe30ew4BPms-hQAHvhKiWwnu1MJKqWWpVYu6x9Nl4pXjkX0utzEQby0R6_4KPqq-wtGpTuRIBeNwFeTBf0kA8DRNXQQkFws8o3_o0YT80oVqT8eK6ukPYVdX-3RiQjIh2ab2zEg-mEgfpCnAELNEKfF-uACGTOtm5dOxowtxwGwHEBA0zDYifTxbDelLose1r_n8_AXUJbgCsHzwwqpC6mox2NVfb-aSlwHK1APBdmECcaCs0IvidQvG7ntQRRwgKhCDhZ2CLiUos3A7IMILke9uwPAFD5hpVIrDvBuUqCSYyCWNLhaCEn2Bd4UNcZy6o8F21o0In0SjmRYwjlULmaT85TfeZXnuMOscj4UZe7ptnuH1_69VCL_3YbWY6UIGVfFpdlqdRcxV8qmRcsUJgI2QZZ8afRaMioBUdBWGTtaJ-C2JtyU6RbamWJuMwqALTcectnkp4f-zSwlK43zDfcJ8vEktmG9WKYj49VT39LYpOmOKva-FCQJxmRPVYTjO_332KSDnJtKZJiNNn22FbUU3I7UYT4qoycUw4Xi7XowmFwgs0j0xS-ruGvNY1EsHwBJP-qgjf_j5z7vGa41OvGRQfQPxV0scQ7-GaSOsR_huXScF5z-AZIBLCGMD8YWn5eNCdQf3WeT30UUNkfm3HYpWGWf0d6VeVlPFcqxr-HEKj0Wqao6QUPfroi67i4vLY1qw5vRJfEoFYIDwtpLABySI7brpsvRWsBHcPycgrGSpgxH8fLaY2ysV4u7nyznHG6Xwl7Zh8ksCDp4kzwiFV1ctvFIVz6WM4sFdypDW1q4idZY96yC0k41IxGBwUluDCZSw53rKkkbzM9k6bK1decI3-RIXw98kQde_j9dwG3qTobGlcFMdDF0M9vPbkZ-FRWcgsHGFi-ouYQ73xBwz22w8eIF21l8-8j1bJupeFsgUlOW4Qhbrj3ExPPPu4s9z2lph2YJ1G9muqwzXChWkBsp2ykokc35Ewsb8in8iOBmGikq60v43QDCnJPKMh1IwTv3bI2AvaahrSKDGXZJuHMASh57MIEHGTPg0GPJ2oy0gSnI8ZiC_wE8D2QEnppgdlOZWtQcL0rYMAFrrZ5FFd27QCImbg0n177TYcYAmiklAy7PvcKRBc6VGAFgy4J_dp2TdXi7Mq52-Pw88dsbUfrbknkff2ZnpG3wTVrS5a3ch5iHcgKT65x_7uQptUvkVY8ewlrTDptiryzaMDUO21BWD1AGbZBSDe1CKmH1vZbozOl_A-efBB5l1GEkGZhDL1DGHtGV7K5survJgDJcgflS4_WMFKTW0hVQp97cF6nwoyJzqNuPLMQ2tRO2LEO_0dpHAcpCek_wWIcUmYX54xh5dLhswV6N-A1cLRU3XGnqS2_ENfNoNlQfyzbw-Hh6bGXliOzoc4TJ6jYYeNQl8p0AdNrDP7VDn_WemsZnt05T8fLpsHkJ4I7C1QV3yLj_9fuuDzzk99238qNy6na6tTv1U9wbrf1iY3jgKXM0RDXXmlbMNMKlZYzOFRfbly1lcbbhxdbDeD-iDgdkllDnJckTpFD1-hVUUw1gp0viZhrXe28rTIOiWBkvQ8Qx6nUuuFTYzoZWgrqfByxvU-ECRub5PeFQRGmn9W1j7W8N6LrH0XFOtlGzGyvhSE0-xwQL8O30TJ3lBzJ1smCYsmuf0iAYXuGlkXpv5GpvWhWxZFsqANgXRJGbIzAWqDriEOZzGE52KzR4Ti-KiXkRaPLXcC6LcWepknJFjEtTHnNaz_afin-XcxOA6huvrnLxBYqlO3sIKGQ1_FmCnYj6bZ_0b2M_WSxrqoRPnkC2kjlvUxe1IijCr15nMQLOlSK73yyvvVPQ6REAlte7SSRMrbA10dTkZFD4VFIJpTMh7TaeMHCuYgW5__mtqkNtUP-7I.mI_sCrg_arMv5izMdLHUNw'  # `__Secure-next-auth.session-token` cookie from https://chat.openai.com/chat
api = ChatGPT(session_token)  # auth with session token


def getDataChatGPT(query):
    resp = api.send_message("A short description about " + query)
    return resp['message']


gptSearched = []


def getColumnsSearchResult():
    global gptSearched
    gptSearched = []
    with open('newNiftyData.csv', newline='') as file:
        reader = csv.reader(file)
        for row in reader:
            gptSearched.append(row[0])


def writeCSV(data):
    # new csv file created with the description of all the companeis
    with open('newNiftyData.csv', 'a+', newline='') as file:
        writer = csv.writer(file)
        writer.writerow(data)


with open('nifty100.csv', newline='') as file:
    reader = csv.reader(file)
    for row in reader:
        getColumnsSearchResult()
        if row[2] not in gptSearched:
            queryResult = getDataChatGPT(row[0])
            writeCSV([row[2], queryResult])
