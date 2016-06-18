# -*- coding:utf8 -*-

from flask import render_template, url_for, \
        request, redirect, jsonify
from flask.ext.login import login_user, login_required, \
        logout_user, current_user
from . import auth
from .. import db
from ..models import User, Team, Role
from ..email import send_email

@auth.route('/login', methods=['POST'])
def login():
    user_email = request.values.get('user')
    user_pwd = request.values.get('pwd')
    data = {}
    user = User.query.filter_by(email=user_email).first()
    if user is not None and user.verify_password(user_pwd):
        data["success"] = 0
        data["user_img"] = user.head_pic_path
        data['error'] = 0
        data["user_message"] = []
        i = 1
        recv_msgs = user.recv_msgs
        if not (recv_msgs is None):
            for msg in user.recv_msgs:
                msg_data = {}
                msg_data['id'] = i
                msg_data['time'] = msg.timestamp
                msg_data['content'] = msg.msgbody
                data['user_message'].append(msg_data)
                i += 1
        login_user(user, request.values.get('remember_me'))
        return jsonify(data)
    else:
        data = {"success": 1}
        if user is None:
            data["error"] = "user not exist"
        else:
            data["error"] = "password incorrect"
        return jsonify(data)

@auth.route('/logout')
@login_required
def logout():
    logout_user()
    return jsonify({"success": 0,"msg": "you logout now."})

@auth.route("/register", methods=['POST'])
def register():
#    try:
#        return jsonify({"data":request.form})
#    except Exception:
#        return jsonify({"msg":"None", "error": str(Exception)})
    email = request.form.get("user")
    pwd = request.form.get("pwd")
    username = request.form.get("username")
    if not username:
        username = email

    if User.query.filter_by(email=email).first():
        return jsonify({"success": 1, "error": "user had already exist."})
    user = User(email=email, password=pwd, username=username)
    db.session.add(user)
    db.session.commit()
    token = user.generate_confirmation_token()
    send_email(user.email, u'请确认你的帐号',
               'auth/email/confirm', user=user, token=token)
    return jsonify({"success": 0, "error": 0})

@auth.route("/testRegister")
def testRegister():
    url = ''
    if current_user.is_authenticated:
        url = current_user.head_pic_path
    return render_template('auth/testregister.html', url=url)

@auth.route('/createTeam', methods=['POST'])
@login_required
def createTeam():
    team_name = request.form.get('team_name')
    team_avatar = request.form.get('img')
    about_team = request.form.get('des')
    print team_name, team_avatar, about_team
    if not Team.query.filter_by(team_name=team_name).first():
        team = Team(team_name=team_name,
                    about_team=about_team,
                    team_avatar=team_avatar)
        print type(team)
        print current_user.email
        db.session.add(team)
        return jsonify({"success":0, "error":0})
    else:
        return jsonify({"success":1, "error": "team name exists"})

@auth.route('/confirm/<token>')
@login_required
def confirm(token):
    if current_user.confirmed:
        return redirect(url_for('main.index'))

    if current_user.confirm(token):
        return redirect(url_for('main.index'))
    else:
        return redirect(url_for('auth.unconfirmed'))

@auth.route('/unconfirmed')
def unconfirmed():
    return render_template('auth/unconfirmed.html')

@auth.route('/confirm')
@login_required
def resend_confirmation():
    token = current_user.generate_confirmation_token()
    send_email(current_user.email, u'请确认你的帐号',
               'auth/email/confirm', user=user, token=token)
    return redirect(url_for('main.index'))

@auth.before_app_request
def before_request():
    if current_user.is_authenticated:
        current_user.ping()
