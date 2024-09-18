import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import './styles/history.css';  // Ensure you have the correct CSS file for styling

const History = () => {
  const [isFormVisible, setIsFormVisible] = useState(false);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [pdfFile, setPdfFile] = useState(null);
  const [time, setTime] = useState('');
  const [dataList, setDataList] = useState([]);
  const [uploadError, setUploadError] = useState('');

  // Fetch existing data from MongoDB
  const fetchData = useCallback(async () => {
    try {
      const response = await axios.get('https://flyclubwebsite-backend.vercel.app/get-data');
      setDataList(response.data);  // Store fetched data in state
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    setUploadError('');

    // Create a FormData object to handle file uploads
    const formData = new FormData();
    formData.append('title', title);
    formData.append('description', description);
    formData.append('pdfFile', pdfFile);
    formData.append('time', time);

    try {
      const response = await axios.post('https://flyclubwebsite-backend.vercel.app/upload-data', formData);
      console.log('Data uploaded successfully:', response.data);

      // Reset form fields
      setTitle('');
      setDescription('');
      setPdfFile(null);
      setTime('');

      // Update data list with the newly uploaded data
      setDataList([...dataList, response.data]);
      setIsFormVisible(false);  // Close form after successful submission
    } catch (error) {
      console.error('Error uploading data:', error);
      setUploadError('Failed to upload data. Please try again.');
    }
  };

  return (
    <div className="history-container">
      <button className="upload-button" onClick={() => setIsFormVisible(!isFormVisible)}>
        {isFormVisible ? 'Close Form' : 'Upload'}
      </button>

      {isFormVisible && (
        <div className="form-container">
          <div className="form-header">
            <h2>Upload PDF</h2>
          </div>
          <form onSubmit={handleFormSubmit}>
            <input
              type="text"
              placeholder="Title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
            <textarea
              placeholder="Description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
            />
            <input
              type="file"
              accept="application/pdf"
              onChange={(e) => setPdfFile(e.target.files[0])}
              required
            />
            <input
              type="date"
              value={time}
              onChange={(e) => setTime(e.target.value)}
              required
            />
            <div className="form-actions">
              <button type="submit">Submit</button>
              <button type="button" className="close-button" onClick={() => setIsFormVisible(false)}>
                Close
              </button>
            </div>
          </form>
          {uploadError && <p className="error-message">{uploadError}</p>}
        </div>
      )}

      <div className="data-table">
        <h2>CLUB ACTIVITY DETAILS</h2>
        {dataList.length > 0 ? (
          <table>
            <thead>
              <tr>
                <th>Title</th>
                <th>Description</th>
                <th>Date</th>
                <th>PDF</th>
              </tr>
            </thead>
            <tbody>
              {dataList.map((data, index) => (
                <tr key={index}>
                  <td>{data.title}</td>
                  <td>{data.description}</td>
                  <td>{new Date(data.time).toLocaleDateString()}</td>
                  <td>
                    <a
                      href={`https://flyclubwebsite-backend.vercel.app/download-pdf/${data._id}`}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      View PDF
                    </a>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p>No activities yet.</p>
        )}
      </div>
    </div>
  );
};

export default History;
