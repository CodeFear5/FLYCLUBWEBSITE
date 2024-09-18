import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './styles/history.css'; // Import the CSS file

const History = () => {
  const [isFormVisible, setIsFormVisible] = useState(false);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [pdfFile, setPdfFile] = useState(null);
  const [time, setTime] = useState('');
  const [dataList, setDataList] = useState([]);

  // Fetch existing data from MongoDB
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('https://flyclubwebsite-backend.vercel.app/get-data');
        setDataList(response.data); // Store fetched data in state
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  const handleFormSubmit = async (event) => {
    event.preventDefault();

    // Create a FormData object to handle file uploads
    const formData = new FormData();
    formData.append('title', title);
    formData.append('description', description);
    formData.append('pdfFile', pdfFile);
    formData.append('time', time);

    try {
      const response = await axios.post('https://flyclubwebsite-backend.vercel.app/upload-data', formData);
      console.log('Data uploaded successfully:', response.data);
      
      setIsFormVisible(false);
      setTitle('');
      setDescription('');
      setPdfFile(null);
      setTime('');
      setDataList([...dataList, response.data]);
    } catch (error) {
      console.error('Error uploading data:', error);
    }
  };

  return (
    <div className="history-container">
      <button className="upload-button" onClick={() => setIsFormVisible(!isFormVisible)}>
        {isFormVisible ? 'Upload' : 'Upload'}
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
            placeholder="Date"
            value={time}
            onChange={(e) => setTime(e.target.value)}
            required
            />

            <button type="submit">Submit</button>
            <button className="close-button" onClick={() => setIsFormVisible(false)}>
             CLOSE
            </button>
          </form>
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
                <th>DATE</th>
                <th>PDF</th>
              </tr>
            </thead>
            <tbody>
              {dataList.map((data, index) => (
                <tr key={index}>
                  <td>{data.title}</td>
                  <td>{data.description}</td>
                  <td>{data.time}</td>
                  <td>
                    <a
                      href={`https://flyclubwebsite-backend.vercel.app/uploads/${data.pdfFile.filePath}`}
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
          <p>NO ACTIVITIES YET.</p>
        )}
      </div>
    </div>
  );
};

export default History;
