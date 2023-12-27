import radius as radius

@description('The Radius Application ID. Injected automatically by the rad CLI.')
param application string

resource payment_service 'Applications.Core/containers@2023-10-01-preview' = {
  name: 'payment-service'
  properties: {
    application: application
    container: {
      image: './services/payment-service/Dockerfile'
      ports: {
        web: {
          containerPort: 3000
        }
      }
    }
  }
}
