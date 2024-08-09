import { useEffect, useState } from "react";

function App() {
  const [file, setFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);
  const [uploadStatus, setUploadStatus] = useState("");
  const [images, setImages] = useState([]);
  const [viewingFile, setViewingFile] = useState(null);

  useEffect(() => {
    async function fetchImages() {
      try {
        const response = await fetch("http://localhost:3022/images");
        if (!response.ok) throw new Error("Failed to fetch images.");
        const data = await response.json();
        setImages(data);
      } catch (error) {
        console.error("Error fetching images:", error);
      }
    }
    fetchImages();
  }, []);

  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0];
    setFile(selectedFile);

    if (selectedFile) {
      setPreviewUrl(URL.createObjectURL(selectedFile));
    }
  };

  const handleUploadClick = () => {
    document.getElementById("fileInput").click();
  };

  const handleUpload = async () => {
    if (!file) {
      setUploadStatus("Please select a file first.");
      return;
    }

    const formData = new FormData();
    formData.append("image", file);

    try {
      const response = await fetch("http://localhost:3022/upload", {
        method: "POST",
        body: formData,
      });

      if (response.ok) {
        setUploadStatus("File uploaded successfully!");
        const updatedImages = await fetch("http://localhost:3022/images");
        const updatedData = await updatedImages.json();
        setImages(updatedData);
        setFile(null); // Clear selected file after upload
        setPreviewUrl(null); // Clear preview URL after upload
      } else {
        setUploadStatus("Failed to upload file.");
      }
    } catch (error) {
      setUploadStatus(`Error: ${error.message}`);
    }
  };

  const handleViewFile = (file) => {
    setViewingFile(file);
  };

  return (
    <div className="container">
      <button onClick={handleUploadClick} className="upload-button">
        Select File/Image
      </button>
      <input
        type="file"
        id="fileInput"
        onChange={handleFileChange}
        className="file-input"
      />

      {file && (
        <div className="file-details">
          <p className="file-name">File Name: {file.name}</p>
          {previewUrl && (
            <div className="preview">
              {file.type.startsWith("image/") ? (
                <img src={previewUrl} alt="Preview" className="image-preview" />
              ) : file.type === "application/pdf" ? (
                <iframe
                  src={previewUrl}
                  title="PDF Preview"
                  className="pdf-preview"
                />
              ) : (
                <p className="unsupported">Unsupported file type</p>
              )}
            </div>
          )}
          <button onClick={handleUpload} className="upload-button">
            Upload File/Image
          </button>
          <p className="upload-status">{uploadStatus}</p>
        </div>
      )}

      <hr className="separator" />

      <div className="image-list">
        {images.length > 0 ? (
          images.map((image) => (
            <div key={image.id} className="image-item">
              <p className="image-name">{image.name}</p>
              <button
                onClick={() => handleViewFile(image)}
                className="view-button"
              >
                View
              </button>
            </div>
          ))
        ) : (
          <p className="no-images">No images available.</p>
        )}

        {viewingFile && (
          <div className="viewing-file">
            <h3 className="viewing-file-name">Viewing: {viewingFile.name}</h3>
            {viewingFile.name.endsWith(".jpg") && (
              <img
                src={`data:image/jpeg;base64,${viewingFile.image}`}
                alt="Preview"
                className="image-preview"
              />
            )}
            {viewingFile.name.endsWith(".png") && (
              <img
                src={`data:image/png;base64,${viewingFile.image}`}
                alt="Preview"
                className="image-preview"
              />
            )}
            {viewingFile.name.endsWith(".pdf") && (
              <iframe
                src={`data:application/pdf;base64,${viewingFile.image}`}
                title="PDF Preview"
                className="pdf-preview"
              />
            )}
            {!viewingFile.name.endsWith(".jpg") &&
              !viewingFile.name.endsWith(".png") &&
              !viewingFile.name.endsWith(".pdf") && (
                <p className="unsupported">Unsupported file type</p>
              )}
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
