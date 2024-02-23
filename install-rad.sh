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

kubectl apply -f https://raw.githubusercontent.com/radius-project/dashboard/main/deploy/dashboard.yaml

# Open the dashboard
kubectl port-forward --namespace=radius-system svc/dashboard 3000:80