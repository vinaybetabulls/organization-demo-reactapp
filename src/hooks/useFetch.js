import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { Link, useHistory } from "react-router-dom";
const useFetch = ({ url, method, token, input }) => {
  let history = useHistory();
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
    
    if(evt.target.orgId) {
      setAppData({ ...appData, orgId: evt.target.orgId.value });
      appData.orgId = evt.target.orgId.value;
      console.log(appData);
    } else if(evt.target.companyId) {
      console.log(evt.target.companyId.value);
      setAppData({ ...appData, companyId: evt.target.companyId.value });
      appData.orgId = evt.target.companyId.value;
      console.log(appData);
    }
    fetchData()
  }

  const fetchData = async () => {
    let fetchUrl = `https://organization-demo.herokuapp.com/${url}`;
    console.log(fetchUrl);
    let payload = appData || ``;
    let authToken = token || localStorage.getItem('authToken') || ``;

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
      if(json.statusCode == 401)
      {
        console.log('fghjkl;kjhcxcvbnm,.')
        setIsAuth(false);
        localStorage.removeItem("authToken");
        history.push("/");
      }
      if(json && json.jwt) localStorage.setItem('authToken', json.jwt);
      setResponse(json);
      setIsLoading(false);
      return json;
    } catch (error) {
      alert('in catch')
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