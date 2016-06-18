# -*- coding:utf8 -*-

from datetime import datetime
from flask import current_app, request
from flask.ext.login import UserMixin, AnonymousUserMixin
from werkzeug.security import generate_password_hash, check_password_hash
from itsdangerous import TimedJSONWebSignatureSerializer as Serializer
from . import db, login_manager

class Permission:
    FOLLOW = 0X01
    COMMENT = 0X02
    WRITE_ARTICLES = 0X04
    MODERATE_COMMENTS = 0X08
    ADMINISTER = 0X80

class Role(db.Model):
    __tablename__ = 'roles'
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(64), unique=True, nullable=False)
    default = db.Column(db.Boolean, default=False, index=True)
    permissions = db.Column(db.Integer)
    users = db.relationship('User', backref='role')

    @staticmethod
    def insert_roles():
        roles = {
            'User': (Permission.FOLLOW |
                     Permission.COMMENT, True),
            'Moderator': (Permission.FOLLOW |
                          Permission.COMMENT |
                          Permission.WRITE_ARTICLES |
                          Permission.MODERATE_COMMENTS, False),
            'Administrator': (0xff, False)
        }

        for r in roles:
            role = Role.query.filter_by(name=r).first()
            if role is None:
                role = Role(name=r)
            role.permissions = roles[r][0]
            role.default = roles[r][1]
            db.session.add(role)
        db.session.commit()

    def __repr__(self):
        return '<Role %r>' % self.name

class Follow(db.Model):
#    '''
#    Follow表为一个关联表，用于记录用户的粉丝和关注的人
#    follower_id: 用户的粉丝
#    followed_id: 用户已关注的人
#    timestamp: 时间戳
#    '''
    __tablename__ = 'follows'
    follower_id = db.Column(db.Integer,db.ForeignKey('users.id'),
                            primary_key=True)
    followed_id = db.Column(db.Integer, db.ForeignKey('users.id'),
                           primary_key=True)
    timestam = db.Column(db.DateTime, default=datetime.utcnow)

    def __repr__(self):
        return '<follower: %r, followed: %r>' % (self.follower_id, self.followed_id)


class HaveSkill(db.Model):
#    '''
#    users表和skills表的关联表
#    '''
    __tablename__ = 'haveskill'
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'),
                        primary_key=True)
    skill_id = db.Column(db.Integer, db.ForeignKey('skills.id'),
                         primary_key=True)

class Skill(db.Model):
#    '''
#    定义技能的种类，如java，c/c++，python等
#    '''
    __tablename__ = 'skills'
    id = db.Column(db.Integer, primary_key=True)
    skillname = db.Column(db.String(64), unique=True, index=True)
    users = db.relationship('HaveSkill',
                            foreign_keys=[HaveSkill.skill_id],
                            backref=db.backref('skill', lazy="joined"),
                            lazy='dynamic',
                            cascade='all, delete-orphan')

    def __repr__(self):
        return '<skill %r>' % self.skillname


class Message(db.Model):
#    '''
#    留言信息表
#    '''
    __tablename__ = 'messages'
    id = db.Column(db.Integer, primary_key=True)
    msgbody = db.Column(db.Text)
    timestamp = db.Column(db.DateTime, index=True, default=datetime.utcnow)
    sender_id = db.Column(db.Integer, db.ForeignKey('users.id'))
    recv_id = db.Column(db.Integer, db.ForeignKey('users.id'))

    def __repr__(self):
        return '<message %r>' % self.msgbody


class CollectPost(db.Model):
#    '''
#    用户收藏文章的关联表
#    '''
    __tablename__ = 'collectposts'
    user_id = db.Column(db.Integer,
                        db.ForeignKey('users.id'),
                        primary_key=True)
    post_id = db.Column(db.Integer,
                        db.ForeignKey('posts.id'),
                        primary_key=True)
    timestamp = db.Column(db.DateTime, default=datetime.utcnow)


class Post(db.Model):
#    '''
#    保存发表的文章
#    '''
    __tablename__ = 'posts'
    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(128), nullable=False, index=True)
    author = db.Column(db.String(128), index=True)
    body_html = db.Column(db.Text)
    like = db.Column(db.Integer)
    timestamp = db.Column(db.DateTime,
                          default=datetime.utcnow, index=True)

    collectusers = db.relationship('CollectPost',
                                   foreign_keys=[CollectPost.post_id],
                                   backref=db.backref('post', lazy="joined"),
                                   lazy='dynamic',
                                   cascade='all, delete-orphan')

    def __repr__(self):
        return '<post %r>' % self.title


class Activity(db.Model):
#    '''
#    记录用户发表的活动
#    '''
    __tablename__ = 'activities'
    id = db.Column(db.Integer, primary_key=True)
    act_name = db.Column(db.String(128), nullable=False, index=True)
    location = db.Column(db.String(128), index=True)
    pic_path = db.Column(db.String(256))
    timestamp = db.Column(db.DateTime, default=datetime.utcnow,
                          index=True)
    summary = db.Column(db.String(256))
    details = db.Column(db.Text)
    like = db.Column(db.Integer)
    join_num = db.Column(db.Integer)

    sponsor_id = db.Column(db.Integer,
                           db.ForeignKey('users.id'),
                           index=True)

    def __repr__(self):
        return '<activity %r>' % self.act_name

class JoinTeam(db.Model):
    __tablename__='jointeam'
    teammate_id = db.Column(db.Integer,
                           db.ForeignKey('users.id'),
                           primary_key=True)
    team_id = db.Column(db.Integer,
                        db.ForeignKey('teams.id'),
                        primary_key=True)

class Team(db.Model):
    __tablename__ = 'teams'
    id = db.Column(db.Integer, primary_key=True)
    team_avatar = db.Column(db.String(256))
    work = db.Column(db.String(128), index=True)
    sponsor_id = db.Column(db.Integer, db.ForeignKey('users.id'))
    team_name = db.Column(db.String(128), unique=True, index=True)
    about_team = db.Column(db.Text)
    timestamp = db.Column(db.DateTime,
                          default=datetime.utcnow, index=True)

    teammate = db.relationship('JoinTeam',
                               foreign_keys=[JoinTeam.team_id],
                               backref = db.backref('team',
                                                   lazy='joined'),
                               lazy='dynamic',
                               cascade="all, delete-orphan")

    def __repr__(self):
        return '<team %r>' % self.team_name

class User(UserMixin, db.Model):
#    '''
#    用户模型，用email作为注册帐号，用email和username都可以登陆
#    id:每个用户的唯一id
#    head_pic_path: 头像的保存路径
#    email: 用户登陆邮箱
#    username: 用户名，也可以用来登陆
#    password_hash: 用于保存用户密码的hash值
#    role_id: 用户角色
#    confirmed: 用户注册确认
#    real_name: 用户的真实姓名
#    address: 用户地址
#    about_me: 用户简介
#    member_since: 注册时间
#    last_seen: 最后一次登陆的时间
#    last_IP: 最后一次登陆的IP
#    followed: 关注的人的关系
#    followers: 粉丝的关系
#    skill: 用户的技能
#    kind: 用户的种类
#    '''
    __tablename__ = 'users'
    #以下字段均为用户注册的必要字段
    id = db.Column(db.Integer, primary_key=True)
    head_pic_path = db.Column(db.String(128))
    email = db.Column(db.String(64), unique=True, nullable=False,
                      index=True)
    username = db.Column(db.String(64), unique=True,
                         nullable=False, index=True)
    password_hash = db.Column(db.String(128))
    role_id = db.Column(db.Integer, db.ForeignKey('roles.id'))
    confirmed = db.Column(db.Boolean, default=False)

    #以下字段为用户基本信息
    real_name = db.Column(db.String(128))
    address = db.Column(db.String(256))
    about_me = db.Column(db.Text())
    member_since = db.Column(db.DateTime(), default=datetime.utcnow)
    last_seen = db.Column(db.DateTime(), default=datetime.utcnow)
    last_IP = db.Column(db.String(15))

    myteam = db.relationship('Team',
                             foreign_keys=[Team.sponsor_id],
                             backref=db.backref('sponsor', lazy='joined'),
                             lazy='dynamic',
                             cascade='all, delete-orphan')
    joined_team = db.relationship('JoinTeam',
                                  foreign_keys=[JoinTeam.teammate_id],
                                  backref=db.backref('teammate', lazy='joined'),
                                  cascade='all, delete-orphan')

    followed = db.relationship('Follow',
                               foreign_keys=[Follow.follower_id],
                               backref=db.backref('follower', lazy='joined'),
                               lazy='dynamic',
                               cascade='all, delete-orphan')
    followers = db.relationship('Follow',
                                foreign_keys=[Follow.followed_id],
                                backref=db.backref('followed', lazy='joined'),
                                lazy='dynamic',
                                cascade='all, delete-orphan')
    skills = db.relationship('HaveSkill',
                             foreign_keys=[HaveSkill.user_id],
                             backref=db.backref('user', lazy='joined'),
                             lazy='dynamic',
                             cascade='all, delete-orphan')

    send_msgs = db.relationship('Message',
                                foreign_keys=[Message.sender_id],
                                backref=db.backref('send', lazy='joined'),
                                lazy='dynamic',
                                cascade='all , delete-orphan')
    recv_msgs = db.relationship('Message',
                                  foreign_keys=[Message.recv_id],
                                  backref=db.backref('recv', lazy='joined'),
                                  lazy='dynamic',
                                  cascade='all, delete-orphan')
    collectpost = db.relationship('CollectPost',
                                  foreign_keys=[CollectPost.user_id],
                                  backref=db.backref('user', lazy="joined"),
                                  lazy='dynamic',
                                  cascade='all, delete-orphan')
    myactivities = db.relationship('Activity', backref='sponsor',
                                   lazy='dynamic', cascade='all, delete-orphan')
    #kind

    def __init__(self, **kwargs):
        super(User, self).__init__(**kwargs)
        if self.role is None:
            if self.email == current_app.config['CSP_ADMIN']:
                self.role = Role.query.filter_by(Permission=0xff).first()
            if self.role is None:
                self.role = Role.query.filter_by(default=True).first()

    @property
    def password(self):
        raise AttributeError('password is not a readable attribute.')

    @password.setter
    def password(self, password):
        self.password_hash = generate_password_hash(password)

    def verify_password(self, password):
        return check_password_hash(self.password_hash, password)

    def generate_confirmation_token(self, expiration=3600):
        s = Serializer(current_app.config['SECRET_KEY'], expiration)
        return s.dumps({'confirm': self.id})

    def confirm(self, token):
        s = Serializer(current_app.config["SECRET_KEY"])
        try:
            data = s.loads(token)
        except:
            return False
        if data.get('confirm') != self.id:
            return False

        self.confirmed = True
        db.session.add(self)
        return True

    def can(self, permissions):
        return self.role is not None and \
                (self.role.permissions & permissions) == permissions

    def is_administrator(self):
        return self.can(Permission.ADMINISTER)

    def follow(self, user):
        if not self.is_following(user):
            f = Follow(follower=self, followed=user)
            db.session.add(f)

    def unfollow(self, user):
        f = self.followed.filter_by(followed_id=user.id).first()
        if f:
            db.session.delete(f)

    def is_following(self, user):
        return self.followed.filter_by(
            followed_id=user.id).first() is not None

    def send_message(self, user, msg_body):
        msg = Message(send=self, recv=user, msgbody=msg_body)
        db.session.add(msg)

    def ping(self):
        self.last_seen = datetime.utcnow()
        self.last_IP = request.remote_addr
        db.session.add(self)

    def __repr__(self):
        return '<User %r>' % self.email

class AnonymousUser(AnonymousUserMixin):
    def can(self, Permissions):
        return False

    def is_administrator(self):
        return False

login_manager.anonymous_user = AnonymousUser

@login_manager.user_loader
def load_user(user_id):
    return User.query.get(int(user_id))
