import json
from flask import request, jsonify, g
from ocr import app
# import datetime
from datetime import timedelta
from src.main import OCR

@app.route('/api/uploadfile', methods=["POST", "GET"])
def upload_file():
    content = request.get_json()
    print(f"Content : {content}")
    print(f"Image : {content['image_link']}")
    result=OCR(content['image_link'])
    print(f"Result : {result} Type {type(result)}")
    res={}

    res={'rec':result[0],'prob':str(result[1])}
    li=[]
    li.append(res)
    # li=["Success"]
    return json.dumps(li)