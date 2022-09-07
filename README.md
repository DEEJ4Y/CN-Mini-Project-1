# DMDG Computer Networks Mini Project

A Python client server connection over http.

Team members:

- Mohit Sharma: RA2011032010004
- David Joseph: RA2011032010005
- Deeptadip Mondal: RA2011032010011
- Gautham D: RA2011032010029

## Setting up the project

Install the required packages

- fastapi

```sh
pip install fastapi
```

- uvicorn\[standard\]

```sh
pip install "uvicorn\[standard\]"
```

## Run the project

Once setup is complete, run the server and client in two different CLIs.

### Server

Start the server in development mode:

```sh
  uvicorn server:app --reload
```

### Client

Run the client:

```sh
  python3 client.py
```
