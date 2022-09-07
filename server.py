from fastapi import FastAPI

app = FastAPI()


@app.get("/")
def read_root():
    print("Request received at /")
    return {"success": True, "message": "Hello Client"}


@app.get("/message/{message}")
def getMessage(message: str):
    print(f"Request received at /messages/{message}")
    return {"success": True, "message": f"Your message was: {message}"}


print("🖥️  🚀  Server started on port 8000")
