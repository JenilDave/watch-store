"use client";

import axios from "axios";
import axiosRetry from "axios-retry";

export const baseURL = "http://localhost:3001";

// axios.defaults.withCredentials = true;

let authKey = ""
// const localStVal = localStorage && localStorage.getItem("authKey")
if (typeof window !== 'undefined') {
  authKey = JSON.parse(localStorage.getItem("authKey"));
}

axiosRetry(axios, {
  retries: 3, // number of retries
  retryDelay: (retryCount) => {
    console.log(`retry attempt: ${retryCount}`);
    return retryCount * 2000; // time interval between retries
  },
  retryCondition: (error) => {
    // if retry condition is not specified, by default idempotent requests are retried
    return error.response.status === 503;
  },
});

export const api = axios.create({
  baseURL,
  headers: {
    "Access-Control-Allow-Origin": "*",
    "Authorization": `Bearer ${authKey || ""}`
  }
});
