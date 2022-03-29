import json
from flask import request, jsonify, g
from ocr import app
# import datetime
from datetime import timedelta
from src.main import OCR

@app.route('/api/uploadfile', methods=["POST", "GET"])
def upload_file():
    content = request.get_json()
    result=OCR(content['image_link'])
    res={}
    # print(result)
    res={'rec':result[0],'prob':str(result[1])}
    li=[]
    li.append(res)
    return json.dumps(li)