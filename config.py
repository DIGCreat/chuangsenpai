# -*- coding:utf8 -*-

import os

class Config:
    SECRET_KEY = os.environ.get('CSP_SECRET_KEY') or \
            'c2ps56r0tke9#j%*ls3Lls'
    SQLALCHEMY_TRACK_MODIFICATIONS = True
    SQLALCHEMY_COMMIT_ON_TEARDOWN = True
    CSP_MAIL_SUBJECT_PREFIX = u'[CSP 创森派]'
    CSP_MAIL_SENDER = 'King <kingflasktest@sina.com>'
    CSP_ADMIN = os.environ.get('CSP_ADMIN')

    @staticmethod
    def init_app(app):
        pass

class DevelopmentConfig(Config):
    DEBUG = True
    SQLALCHEMY_DATABASE_URI = 'mysql://root:' + \
       os.environ.get('MYSQL_PWD') + '@localhost/csptest'
    MAIL_SERVER = 'smtp.sina.com'
    MAIL_USERNAME = os.environ.get('MAIL_USERNAME')
    MAIL_PASSWORD = os.environ.get('MAIL_PASSWORD')

config = {
    'development': DevelopmentConfig,
    'default': DevelopmentConfig,
}
