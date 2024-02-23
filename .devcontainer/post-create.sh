#!/bin/bash

## Create a k3d cluster
while (! kubectl cluster-info); do
# Docker is not ready yet, wait a bit and try again
    echo "Waiting for docker to be ready..."
    k3d cluster delete
    k3d cluster create --agents 2 -p '8081:80@loadbalancer' --k3s-arg '--disable=traefik@server:0' --registry-create reciperegistry:51351
    sleep 1
done

## Install anything else you need here
wget -q https://raw.githubusercontent.com/dapr/cli/master/install/install.sh -O - | /bin/bash
dapr uninstall # clean up any previous installs
dapr init -k

# Ensure that the k3d cluster is the current context
kubectl config current-context

# Initialize rad in the workspace
rad init

# Verify that the radius-system namespace was created

kubectl get deployments -n radius-system

# view my evironment

rad env list

# Install any monorepo dependencies
yarn install