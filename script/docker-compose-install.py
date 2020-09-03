#!/usr/bin/python3
import os
os.system('curl -sSL http://acs-public-mirror.oss-cn-hangzhou.aliyuncs.com/docker-engine/internet | sh -')
os.system('curl -L https://github.com/docker/compose/releases/download/1.8.1/docker-compose-`uname -s`-`uname -m` > /usr/local/bin/docker-compose')
os.system('chmod +x /usr/local/bin/docker-compose')