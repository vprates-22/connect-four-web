# Connect Four (Multiplayer web)

run reddis:

    sudo docker run --rm -p 6379:6379 redis:7
    docker stop $(docker ps -aq)

run app:

    python3 backend/manage.py runserver

    echo "vm.overcommit_memory = 1" | sudo tee /etc/sysctl.d/nextcloud-aio-memory-overcommit.conf
    sysctl "vm.overcommit_memory=1"