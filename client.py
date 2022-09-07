import http.client
import urllib.parse

connection = http.client.HTTPConnection("localhost", 8000, timeout=5)
print(connection)


def getRoot():
    connection.request("GET", "/")
    response = connection.getresponse()
    print("\nSending request to server at route /")
    print(f"Server response: {response.read().decode()}")


def sendMessage(msg: str):
    connection.request("GET", urllib.parse.quote(f"/message/{msg}"))
    response = connection.getresponse()
    print(f"\nSending request to server at route /message/{msg}")
    print(f"Server response: {response.read().decode()}")


getRoot()
sendMessage("This is a message sent by the client")
connection.close()
