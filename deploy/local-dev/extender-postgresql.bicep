@description('Radius-provided object containing information about the resource calling the recipe')
param context object

@description('Name of the PostgreSQL database. Defaults to the name of the Radius resource.')
param database string = context.resource.name

@description('Name of the PostgreSQL user. Defaults to "postgres".')
param user string = 'postgres'

@description('Password for the PostgreSQL user. Defaults to "postgres".')
@secure()
#disable-next-line secure-parameter-default
param password string = 'P@ssword1234$$'

@description('Tag to pull for the postgres container image.')
param tag string = '16-alpine'

@description('Memory request for the postgres deployment.')
param memoryRequest string = '512Mi'

@description('Memory limit for the postgres deployment')
param memoryLimit string = '1024Mi'

import kubernetes as kubernetes {
  kubeConfig: ''
  namespace: context.runtime.kubernetes.namespace
}

var uniqueName = 'postgres-${uniqueString(context.resource.id)}'
var port = 5432

resource postgresql 'apps/Deployment@v1' = {
  metadata: {
    name: uniqueName
  }
  spec: {
    selector: {
      matchLabels: {
        app: 'postgresql'
        resource: context.resource.name
      }
    }
    template: {
      metadata: {
        labels: {
          app: 'postgresql'
          resource: context.resource.name

          'radapp.io/application': context.application == null ? '' : context.application.name
        }
      }
      spec: {
        containers: [ {
            name: 'postgres'
            image: 'postgres:${tag}'
            ports: [ {
                containerPort: port
              } ]
            resources: {
              requests: {
                memory: memoryRequest
              }
              limits: {
                memory: memoryLimit
              }
            }
            env: [ {
                name: 'POSTGRES_PASSWORD'
                value: password
              }
              {
                name: 'POSTGRES_USER'
                value: user
              }
              {
                name: 'POSTGRES_DB'
                value: database
              } ]
          } ]
      }
    }
  }
}

resource svc 'core/Service@v1' = {
  metadata: {
    name: uniqueName
    labels: {
      name: uniqueName
    }
  }
  spec: {
    type: 'ClusterIP'
    selector: {
      app: 'postgresql'
      resource: context.resource.name
    }
    ports: [ {
        port: port
      } ]
  }
}

@description('The result of the Recipe. Must match the target resource\'s schema.')
output result object = {
  // UCP IDs for the above Kubernetes resources
  resources: [
    '/planes/kubernetes/local/namespaces/${svc.metadata.namespace}/providers/core/Service/${svc.metadata.name}'
    '/planes/kubernetes/local/namespaces/${postgresql.metadata.namespace}/providers/apps/Deployment/${postgresql.metadata.name}'
  ]
  values: {
    host: '${svc.metadata.name}.${svc.metadata.namespace}.svc.cluster.local'
    port: port
    database: database
    username: user
  }
  secrets: {
    // Temporarily disable linter until secret outputs are added
    #disable-next-line outputs-should-not-contain-secrets
    password: password
  }
  
}

