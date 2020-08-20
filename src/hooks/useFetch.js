import React, { useEffect, useState } from 'react'
import axios from 'axios';
const useFetch = ({ url, method, token, input }) => {

  const [response, setResponse] = useState([]);
  const [appData, setAppData] = useState({});
  const [error, setError] = useState(null);
  const [isAuth, setIsAuth] = useState(true);
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (event) => {
    setAppData({ ...appData, [event.target.name]: event.target.value });
    console.log(appData);
  };

  const handleSubmit = async (evt) => {
    evt.preventDefault();  
    fetchData()
  }

  const fetchData = async () => {
    let fetchUrl = `https://organization-demo.herokuapp.com/${url}`;
    console.log(fetchUrl);
    let payload = appData || ``;
    let authToken = token || ``;

    let config = {
      method: method,
      headers: {
        "Content-Type": "application/json",
        "token": authToken
      },
    }
    if (method != "GET") config.body = JSON.stringify(payload);
    console.log(config);
    setIsLoading(true);
    try {
      const res = await fetch(fetchUrl, config);
      const json = await res.json();
      console.log(json);
      if(json.status == 401) setIsAuth(false) 
      if(json && json.jwt) localStorage.setItem('authToken', json.jwt)
      setResponse(json);
      setIsLoading(false);
    } catch (error) {
      console.log(error);
      setError(error)
      setIsLoading(false);
    }
  };

  // useEffect(() => {
  //   fetchData();
  //   console.log(response)
  // }, [input]);

  return { response, isAuth, error, isLoading, handleChange, handleSubmit, fetchData };
}

export default useFetch 