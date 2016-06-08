#!/usr/bin/env python
# -*- coding:utf8 -*-

from flask.ext.script import Shell, Manager
from flask.ext.migrate import MigrateCommand, Migrate
from app import create_app

app = create_app()
app.config['DEBUG'] = True
manager = Manager(app)

if __name__ == '__main__':
    manager.run()
