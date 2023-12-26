const dotenv = require('dotenv');
dotenv.config();
const { BlobServiceClient, generateAccountSASQueryParameters, ContainerSASPermissions } = require('@azure/storage-blob');
const AZURE_STORAGE_CONNECTION_STRING = process.env.AZURE_STORAGE_CONNECTION_STRING;
const AZURE_CONTAINER_NAME = process.env.AZURE_CONTAINER_NAME;
// Upload file to Azure Blob Storage
const blobService = BlobServiceClient.fromConnectionString(AZURE_STORAGE_CONNECTION_STRING);
const containerClient = blobService.getContainerClient(AZURE_CONTAINER_NAME);
// const blobService = azure.createBlobService();

function generateExpiringLink(blobName, expireMinutes) {
    const startDate = new Date();
    const expiryDate = new Date(startDate);
    expiryDate.setMinutes(startDate.getMinutes() + expireMinutes);

    const sharedAccessPolicy = {

        containerName: AZURE_CONTAINER_NAME,
        protocol: SASProtocol.HttpsAndHttp,
        expiresOn: expireyDate,
        permissions: ContainerSASPermissions.parse('r'),
    };

    const sasToken = generateAccountSASQueryParameters(sharedAccessPolicy, containerClient.credential);
    return containerClient.getBlobClient(blobName).url + '?' + sasToken;
}


module.exports = {
    generateExpiringLink
};