import flask
from flask import Flask
from flask_cors import CORS

app = Flask(__name__, static_folder="build", static_url_path='/')
CORS(app)

from ocr import routes