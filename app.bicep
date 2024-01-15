import radius as radius

@description('The Radius Application ID. Injected automatically by the rad CLI.')
param application string

@description('The Radius Environment ID. Injected automatically by the rad CLI.')
param environment string

// @description('The OCI registry for test Bicep recipes.')
// param registry string

// resource myenv 'Applications.Core/environments@2023-10-01-preview' = {
//   name: 'myenv'
//   properties: {
//     compute: {
//       kind: 'kubernetes'
//       namespace: 'default-escrow-experiment'
//     }
//     recipes: {
//       'Applications.Core/extenders@2023-10-01-preview': {
//         postgresql: {
//           templateKind: 'bicep'
//           plainHttp: true
//           templatePath: '${registry}/recipes/local-dev/postgresql:latest'
//         }
//       }
//     }
//   }
// }

resource payment_service 'Applications.Core/containers@2023-10-01-preview' = {
  name: 'payment-service'
  properties: {
    application: application
    container: {
      image: 'mjavacam/payment-service:latest'
      env: {

        DATABASE_URL: 'postgresql://${postgres.properties.username}:${postgres.secrets('password')}@${postgres.properties.host}:${postgres.properties.port}/${postgres.properties.database}?schema=public'
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

resource postgres 'Applications.Core/extenders@2023-10-01-preview' = {
  name: 'postgresql'
  properties: {
    application: application
    environment: environment
    recipe: {
      name: 'postgresql'
    }
  }
}
