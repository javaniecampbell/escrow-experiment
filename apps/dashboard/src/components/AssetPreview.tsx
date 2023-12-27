import React, { useState, useEffect } from 'react';
import useStore from '@/shared/store';

const AssetPreview = () => {
  const [downloadLink, setDownloadLink] = useState('');
  const { selectedProject } = useStore();

  useEffect(() => {
    // Fetch the expiring asset link for the selected project
    if (selectedProject) {
      const fetchAssetLink = async () => {
        try {
          const response = await fetch(`/get-asset-link?projectId=${selectedProject}`);
          const data = await response.json();
          setDownloadLink(data.downloadLink);
        } catch (error) {
          console.error('Error fetching asset link:', error);
        }
      };

      fetchAssetLink();
    }
  }, [selectedProject]);

  return (
    <div className="p-4 border border-gray-300 rounded">
      <h2 className="text-lg font-semibold mb-2">Asset Preview</h2>
      {downloadLink ? (
        <>
          <p className="text-gray-700 mb-2">Preview the downloadable asset:</p>
          {/* Display the asset preview based on its type (e.g., image, video) */}
          <iframe title="Asset Preview" src={downloadLink} className="w-full h-64"></iframe>
          <p className="text-gray-700 mt-2">Expiring Asset Link:</p>
          <a href={downloadLink} target="_blank" rel="noopener noreferrer" className="text-blue-500">
            {downloadLink}
          </a>
        </>
      ) : (
        <p className="text-gray-700">No asset selected for preview.</p>
      )}
    </div>
  );
};

export default AssetPreview;
