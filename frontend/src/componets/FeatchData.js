import React, { useEffect, useState } from 'react';
import axios from 'axios';

const FetchData = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Function to fetch data from backend
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api'); // Replace with your backend URL
        setData(response.message)
        console.log(response.data); // Assuming your backend returns a message field
        setLoading(false);
      } catch (error) {
        setError('Error fetching data from the backend');
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div>
      <h1>Data</h1>
      <p>{data}</p>
    </div>
  );
};

export default FetchData;
