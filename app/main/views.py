# -*- coding:utf8 -*-

import json, os, time
from random import random
from ..main import main
from .. import db
from flask import render_template, jsonify, url_for, \
        request, Response
from flask.ext.login import current_user, login_required

IMAGEDIR = '/home/king/Workspace/flaskWorkspace/cspImageServer/userImages'

@main.route('/')
def index():
    return render_template('index.html')

@main.route('/findPerson')
def findPerson():
    return render_template('main/findPerson.html')

@main.route('/findTeam')
def findTeam():
    return render_template('main/findTeam.html')

@main.route('/findActivity')
def findActivity():
    return render_template('main/findActivity.html')

@main.route('/info_news')
def info_news():
    return render_template('main/info_news.html')

@main.route('/person_team')
def person_team():
    return render_template('main/person_team.html')

#上传图片的视图函数
def save_image(img):
    userdir = current_user.email.replace('@', 'A').replace('.', '')
    user_path = IMAGEDIR + '/' + userdir
    if not os.path.exists(user_path):
        os.mkdir(user_path)
    filename = current_user.email.split('@')[0] + 'A' +\
            str(time.time()).replace('.','') + \
            str(random()).split('.')[1]
    f = open(user_path + '/' +filename,'wb')
    f.write(img)
    f.close
    return userdir + '_' + filename

@main.route('/upload', methods=['POST'])
@login_required
def upload():
    f = request.files['uploaded_file']
    fname = save_image(f.read())
    current_user.head_pic_path = url_for('main.serve_file',
                                         fname=fname,
                                         _external=True)
    db.session.add(current_user)
    return jsonify({'fname': fname})

@main.route('/fimage/<fname>')
def serve_file(fname):
    userdir = fname.split('_')[0]
    userimgname = fname.split('_')[1]
    try:
        f = open(IMAGEDIR + '/' +  userdir + '/' + userimgname, 'rb')
        userimg = f.read()
        f.close()
        return Response(userimg, mimetype='image/png')
    except:
        return "", 404

#活动和资讯页面的ajax请求url
@main.route('/find/data')
def getData():
    flag = request.args.get('flag')
    data1=[
        {
            'id':1,
            'name':'1',
            'lable':'basai',
            'img': url_for('static', filename='./image/myhead.jpg'),
            'descript':'heloo'
        },
        {
            'id':2,
            'name':'2',
            'lable':'basai',
            'img': url_for('static', filename='./image/myhead.jpg'),
            'descript':'heloo'
        },
        {
            'id':3,
            'name':'3',
            'lable':'basai',
            'img': url_for('static', filename='./image/myhead.jpg'),
            'descript':'heloo'
        },
        {
            'id':4,
            'name':'4',
            'lable':'basai',
            'img': url_for('static', filename='./image/myhead.jpg'),
            'descript':'heloo'
        },
        {
            'id':5,
            'name':'5',
            'lable':'basai',
            'img': url_for('static', filename='./image/myhead.jpg'),
            'descript':'heloo'
        }
    ]

    if flag == 'team':
        data = data1
    elif flag == 'act':
        data = ''
    else:
        data = ''

    return jsonify(data=data)
