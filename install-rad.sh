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