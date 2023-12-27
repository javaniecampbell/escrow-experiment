import React, { useState, useEffect } from 'react';

const DownloadAsset = () => {
  const [assetLink, setAssetLink] = useState('');

  const handleDownload = async () => {
    try {
      // Make a GET request to retrieve the expiring asset link
      const response = await fetch('/get-asset-link');
      const data = await response.json();
      // Update the asset link state with the retrieved link
      setAssetLink(data.downloadLink);
    } catch (error) {
      console.error('Error fetching asset link:', error);
    }
  };

  return (
    <div className="p-4 border border-gray-300 rounded">
      <h2 className="text-lg font-semibold mb-2">Download Asset</h2>
      <button
        className="bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
        onClick={handleDownload}
      >
        Download Asset
      </button>
      {assetLink && (
        <div className="mt-4">
          <p className="text-gray-700">
            Expiring Asset Link:
            <a
              href={assetLink}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-500 ml-2"
            >
              {assetLink}
            </a>
          </p>
        </div>
      )}
    </div>
  );
};

export default DownloadAsset;
