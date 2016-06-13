#!/usr/bin/env python
# -*- coding:utf8 -*-

from flask.ext.script import Shell, Manager
from flask.ext.migrate import MigrateCommand, Migrate
from app import create_app, db
from app import models

app = create_app('development')
manager = Manager(app)
migrate = Migrate(app, db)

def make_shell_context():
    return dict(app=app, db=db, User=models.User,
                Role=models.Role, Follow=models.Follow,
                Activity=models.Activity,
                Message=models.Message, Skill=models.Skill,
                HaveSkill=models.HaveSkill,
                CollectPost=models.CollectPost,
                Post=models.Post, Permission=models.Permission,
                )

manager.add_command('shell', Shell(make_context=make_shell_context))
manager.add_command('db', MigrateCommand)

if __name__ == '__main__':
    manager.run()
