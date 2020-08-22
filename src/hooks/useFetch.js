import React, { useEffect, useState, useContext } from 'react'
import axios from 'axios';
import { Link, useHistory } from "react-router-dom";
import { LoginContext } from '../context/LoginContext'
const useFetch = ({ url, method, token, input }) => {
  let history = useHistory();
  const [response, setResponse] = useState([]);
  const [appData, setAppData] = useState({});
  const [error, setError] = useState(null);
  const [isAuth, setIsAuth] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [successResponse, setSuccessResponse] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useContext(LoginContext);

  const handleChange = (event) => {
    setAppData({ ...appData, [event.target.name]: event.target.value });
  };

  const handleSubmit = async (evt) => {
    evt.preventDefault();

    if (evt.target.orgId) {
      setAppData({ ...appData, orgId: evt.target.orgId.value });
      appData.orgId = evt.target.orgId.value;
    } else if (evt.target.companyId) {
      setAppData({ ...appData, companyId: evt.target.companyId.value });
      appData.orgId = evt.target.companyId.value;
    }
    fetchData()
  }

  const fetchData = async () => {
    let fetchUrl = `https://organization-demo.herokuapp.com/${url}`;
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
    setIsLoading(true);
    setSuccessResponse(false);
    setError(false);
    try {
      const res = await fetch(fetchUrl, config);
      const json = await res.json();
      setSuccessResponse(true);
      if (json.statusCode === 401) {
        setSuccessResponse(false);
        setIsAuth(false);
        setIsLoading(false);
        localStorage.removeItem("authToken");
        history.push("/");
        return;
      }
      if (json.statusCode >= 399 && json.statusCode <= 500) {
        setError(json.message)
        setSuccessResponse(false);
        setIsLoading(false);
        return
      }
      if (json && json.jwt) {
        localStorage.setItem('authToken', json.jwt);
        setIsLoggedIn(true)
      };
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

  return { response, isAuth, error, isLoading, handleChange, handleSubmit, fetchData, successResponse };
}

export default useFetch 