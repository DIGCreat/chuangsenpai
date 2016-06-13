# -*- coding:utf8 -*-

import json
from ..main import main
from flask import render_template, jsonify, url_for, request
from flask.ext.login import current_user, login_required

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
