#!/bin/bash

ENV=$1

function print_howto() {
    echo "How to use : setup-env.sh ENV (eg. setup-env.sh .env.development)"
}

if [ "$ENV" = "" ]; then
    echo -e "ENV cannot be blank"
    print_howto
    exit 1
fi

if [ ! -f "$ENV" ]; then
    echo "$ENV does not exist."
    exit 1
fi

rm ".env"
cp "$ENV" ".env"

echo -e "Setup env to $ENV success"
