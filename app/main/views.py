# -*- coding:utf8 -*-

import json, os, time
from random import random
from ..main import main
from .. import db
from ..models import User, Team, Activity, Post
from flask import render_template, jsonify, url_for, \
        request, Response
from flask.ext.login import current_user, login_required

IMAGEDIR = u'/home/king/Workspace/flaskWorkspace/cspImageServer/userImages'

@main.route('/')
def index():
    return render_template('index.html')

@main.route('/findPerson', methods=['GET', 'POST'])
def findPerson():
    if request.method == 'POST':
        data = []
        uid = 0
        for user in User.query.all():
            item = {}
            uid += 1
            item['id'] = uid
            item['lable'] = ''
            item['name'] = user.username
            item['img'] = user.head_pic_path
            item['des'] = user.about_me
            item['link'] = ''
            data.append(item)
        return jsonify({'data':data})
    return render_template('main/findPerson.html')

@main.route('/findTeam', methods=['GET', 'POST'])
def findTeam():
    if request.method == 'POST':
        data = []
        tid = 0
        for team in Team.query.all():
            item = {}
            tid += 1
            item['id'] = tid
            item['name'] = team.team_name
            item['do'] = team.work
            item['img'] = team.team_avatar
            item['des'] = team.about_team
            item['link'] = ''
            data.append(item)
        return jsonify({'data':data})
    return render_template('main/findTeam.html')

@main.route('/findActivity', methods=['GET', 'POST'])
def findActivity():
    if request.method == 'POST':
        data = []
        aid = 0
        for activity in Activity.query.all():
            item = {}
            aid += 1
            item['id'] = aid
            item['name'] = activity.act_name
            item['join_num'] = activity.join_num
            item['agree_num'] = activity.like
            item['img'] = activity.pic_path
            item['des'] = activity.summary
            item['place'] = activity.location
            item['link'] = ''
            data.append(item)
        return jsonify({'data':data})
    return render_template('main/findActivity.html')

@main.route('/info_news', methods=['GET', 'POST'])
def info_news():
    if request.method == 'POST':
        data = []
        pid = 0
        for activity in Post.query.all():
            item = {}
            pid += 1
            item['id'] = pid
            item['title'] = Post.title
            item['img'] = Post.pic_path
            item['agree_num'] = Post.like
            item['des'] = activity.summary
            item['link'] = ''
            data.append(item)

        return jsonify({'data': data})
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
    f.close()
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
    try:
        f = open(IMAGEDIR + '/' +  fname.replace('_', "/"), 'rb')
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
