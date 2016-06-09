# -*- coding:utf8 -*-

from datetime import datetime
from werkzeug.security import generate_password_hash, check_password_hash
from itsdangerous import TimedJSONWebSignatureSerializer as Serializer
from . import db

class Permission:
    FOLLOW = 0X01
    COMMENT = 0X02
    WRITE_ARTICLES = 0X04
    MODERATE_COMMENTS = 0X08
    ADMINISTER = 0X80

class Role(db.Model):
    __tablename__ = 'roles'
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(64), unique=True)
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
            role.Permissions = roles[r][0]
            role.default = roles[r][1]
            db.session.add(role)
        db.session.commit()

    def __repr__(self):
        return '<Role %r>' % self.name

class Follow(db.Model):
    '''
    Follow表为一个关联表，用于记录用户的粉丝和关注的人
    follower_id: 用户的粉丝
    followed_id: 用户已关注的人
    timestamp: 时间戳
    '''
    __tablename__ = 'follows'
    follower_id = db.Column(db.Integer,db.ForeignKey('users.id'),
                            primary_key=True)
    followed_id = db.Column(db.Integer, db.ForeignKey('users.id'),
                           primary_key=True)
    timestam = db.Column(db.DateTime, default=datetime.utcnow)


class HaveSkill(db.Model):
    '''
    users表和skills表的关联表
    '''
    __tablename__ = 'havesskill'
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'),
                        primary_key=True)
    skill_id = db.Column(db.Integer, db.ForeignKey('skills.id'),
                         primary_key=True)

class Skill(db.Model):
    '''
    定义技能的种类，如java，c/c++，python等
    '''
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
    '''
    留言信息表
    '''
    __tablename__ = 'messages'
    id = db.Column(db.Integer, primary_key=True)
    msgbody = db.Column(db.Text)
    timestamp = db.Column(db.DateTime, index=True, default=datetime.utcnow)
    sender_id = db.Column(db.Integer, db.ForeignKey('users.id'))
    recv_id = db.Column(db.Integer, db.ForeignKey('users.id'))

    def __repr__(self):
        return '<message %r>' % self.msgbody


class CollectPost(db.Model):
    '''
    用户收藏文章的关联表
    '''
    __tablename__ = 'collectposts'
    user_id = db.Column(db.Integer,
                        db.ForeignKey('users.id'),
                        primary_key=True)
    post_id = db.Column(db.Integer,
                        db.ForeignKey('posts.id'),
                        primary_key=True)
    timestamp = db.Column(db.DateTime, default=datetime.utcnow)


class Post(db.Model):
    '''
    保存发表的文章
    '''
    __tablename__ = 'posts'
    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(128), index=True)
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
    '''
    记录用户发表的活动
    '''
    __tablename__ = 'activities'
    id = db.Column(db.Integer, primary_key=True)
    act_name = db.Column(db.String(128), index=True)
    location = db.Column(db.String(128), index=True)
    timestamp = db.Column(db.DateTime, default=datetime.utcmow,
                          index=True)
    summary = db.Column(db.String(256))
    details = db.Column(db.Text)
    like = db.Column(db.Integer)

    sponsor_id = db.Column(db.Integer,
                           db.ForeignKey('users.id'),
                           index=True)

    def __repr__(self):
        return '<activity %r>' % self.act_name


class User(db.Model):
    '''
    用户模型，用email作为注册帐号，用email和username都可以登陆
    id:每个用户的唯一id
    head_pic_path: 头像的保存路径
    email: 用户登陆邮箱
    username: 用户名，也可以用来登陆
    password_hash: 用于保存用户密码的hash值
    role_id: 用户角色
    confirmed: 用户注册确认
    real_name: 用户的真实姓名
    address: 用户地址
    about_me: 用户简介
    member_since: 注册时间
    last_seen: 最后一次登陆的时间
    last_IP: 最后一次登陆的IP
    followed: 关注的人的关系
    followers: 粉丝的关系
    skill: 用户的技能
    kind: 用户的种类
    '''
    __tablename__ = 'users'
    #以下字段均为用户注册的必要字段
    id = db.Column(db.Integer, primary_key=True)
    head_pic_path = db.Column(db.String(128))
    email = db.Column(db.String(64), unique=True, index=True)
    username = db.Column(db.String(64), unique=True, index=True)
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

    recv_msgs = db.relationship('Message',
                                foreign_keys=[Message.sender_id],
                                backref=db.backref('send', lazy='joined'),
                                lazy='dynamic',
                                cascade='all , delete-orphan')
    sended_msgs = db.relationship('Message',
                                  foreign_keys=[Message.recv_id],
                                  backref=db.backref('recv', lazy='joined'),
                                  lazy='dynamic',
                                  cascade='all, delete-orphan')
    collectpost = db.relationship('CollectPost',
                                  foreign_keys=[CollectPost.user_id],
                                  backref=db.backref('user', lazy="joined"),
                                  lazy='dymanic',
                                  cascade='all, delete-orphan')
    myactivities = db.relationship('Activity', backref='sponsor', lazy='dymanic')
    #kind


