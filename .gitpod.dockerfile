FROM gitpod/workspace-postgres

RUN sudo apt-get update  && sudo apt-get install -y redis-server apt-transport-https ca-certificates && sudo update-ca-certificates  && sudo rm -rf /var/lib/apt/lists/*