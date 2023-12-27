import radius as radius

@description('The Radius Application ID. Injected automatically by the rad CLI.')
param application string

@description('The Radius Environment ID. Injected automatically by the rad CLI.')
param environment string

resource payment_service 'Applications.Core/containers@2023-10-01-preview' = {
  name: 'payment-service'
  properties: {
    application: application
    container: {
      image: 'mjavacam/payment-service:latest'
      env: {
        DATABASE_URL: 'postgresql://postgres:postgres@localhost:5432/escrowservice?schema=public'
        AZURE_STORAGE_CONNECTION_STRING: 'devstoreaccount1;AccountKey=Eby8vdM02xNOcqFlqUwJPLlmEtlCDXJ1OUzFT50uSRZ6IFsuFq2UVErCz4I6tq/K1SZFPTOtr/KBHBeksoGMGw==;DefaultEndpointsProtocol=http;BlobEndpoint=http://127.0.0.1:10000/devstoreaccount1;QueueEndpoint=http://127.0.0.1:10001/devstoreaccount1;TableEndpoint=http://127.0.0.1:10002/devstoreaccount1;'
        AZURE_CONTAINER_NAME: 'digitalAssets'
      }
      ports: {
        web: {
          containerPort: 3000
        }
      }
    }
    connections: {
      postgres: {
        source: postgres.id
      }
    }
  }
}

resource postgres 'Applications.Datastores/sqlDatabases@2023-10-01-preview' = {
  name: 'postgres'
  properties: {
    application: application
    environment: environment
    database: 'postgres'
    server: 'postgres'
    port: 5432
    username: 'postgres'
    secrets: {
      password: 'postgres'
    }
  }
}
