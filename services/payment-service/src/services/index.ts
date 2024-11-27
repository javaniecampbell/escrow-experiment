import { config } from 'dotenv';
config();
import { BlobServiceClient, generateAccountSASQueryParameters, SASProtocol, AccountSASSignatureValues, AccountSASPermissions, AccountSASServices, AccountSASResourceTypes, StorageSharedKeyCredential, generateBlobSASQueryParameters, BlobSASSignatureValues, BlobSASPermissions } from '@azure/storage-blob';

if (!process.env.AZURE_STORAGE_CONNECTION_STRING) {
    throw new Error('Missing AZURE_STORAGE_CONNECTION_STRING environment variable');
}

if (!process.env.AZURE_CONTAINER_NAME) {
    throw new Error('Missing AZURE_CONTAINER_NAME environment variable');
}

const AZURE_STORAGE_CONNECTION_STRING = process.env.AZURE_STORAGE_CONNECTION_STRING;
const AZURE_CONTAINER_NAME = process.env.AZURE_CONTAINER_NAME;
// Upload file to Azure Blob Storage
const blobService = BlobServiceClient.fromConnectionString(AZURE_STORAGE_CONNECTION_STRING);
const containerClient = blobService.getContainerClient(AZURE_CONTAINER_NAME);
// const blobService = azure.createBlobService();

function generateExpiringAccountLink(blobName: string, expireMinutes = 0) {
    const startDate = new Date();
    const expiryDate = new Date(startDate);
    expiryDate.setMinutes(startDate.getMinutes() + expireMinutes);

    const sharedAccessPolicy = {
        protocol: SASProtocol.HttpsAndHttp,
        expiresOn: expiryDate,
        permissions: AccountSASPermissions.parse('r'),
        services: AccountSASServices.parse('b').toString(),
        resourceTypes: AccountSASResourceTypes.parse('sco').toString(),
    } satisfies AccountSASSignatureValues;

    const sasToken = generateAccountSASQueryParameters({
        ...sharedAccessPolicy,
        startsOn: startDate,
    }, containerClient.credential as StorageSharedKeyCredential);
    const blobClient = containerClient.getBlobClient(blobName);
    return `${blobClient.url}?${sasToken.toString()}`;
}

function generateExpiringLink(blobName: string, expireMinutes = 0) {
    const startDate = new Date();
    const expiryDate = new Date(startDate);
    expiryDate.setMinutes(startDate.getMinutes() + expireMinutes);


    const sharedAccessPolicy = {
        containerName: containerClient.containerName,
        protocol: SASProtocol.HttpsAndHttp,
        startsOn: startDate,
        expiresOn: expiryDate,
        permissions: BlobSASPermissions.parse('r'),
    } satisfies BlobSASSignatureValues;

    const sasToken = generateBlobSASQueryParameters({
        ...sharedAccessPolicy,
    }, containerClient.credential as StorageSharedKeyCredential);
    const blobClient = containerClient.getBlobClient(blobName);
    return `${blobClient.url}?${sasToken.toString()}`;
}


export {
    generateExpiringLink,
    generateExpiringAccountLink,
};