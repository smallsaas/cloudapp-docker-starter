#!/bin/bash
export SQL_PATH='/mysql/tmp'

function import() {
    sql=$2
    sql=${sql##*/}
    cd $SQL_PATH
    if [ ! -f $sql ]; then
        echo SQL FILE LOSS.
        exit
    fi
    mysql -uroot -p$MYSQL_ROOT_PASSWORD $MYSQL_DATABASE <$sql 2>/dev/null
    echo 'Import Success.'
    exit
}

function export() {
    shift
    mysqldump -uroot -p$MYSQL_ROOT_PASSWORD $MYSQL_DATABASE $* 2>/dev/null
    exit
}

function list() {
    mysql -uroot -p$MYSQL_ROOT_PASSWORD -e "use $MYSQL_DATABASE;show tables;" 2>/dev/null
    exit
}

while [ -n "$1" ]; do
    case $1 in
    -e | --export) export "$@" ;;
    -i | --import) import "$@" ;;
    -l | --list) list ;;
    *) exit ;;
    esac
    shift
done
