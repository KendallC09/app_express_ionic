import axios from "axios";
import { useEffect, useState } from "react";

function ApiMethods(url : any) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const config = {
      headers: {
        "Accept": "application/json",
        "Content-Type": "application/json"
      }
    }
    setLoading(true);
    axios.get(url, config)
      .then((response) => {setData(response.data)})
      .catch((err) => {setError(err)})
      .finally(() => {setLoading(false)})
  }, [url])

  const postMethodOrder = (state: any, client_id: any) => {
    const config = {
      headers: {
        "Accept": "application/json",
        "Content-Type": "application/json"
      }
    }

    setLoading(true);
    axios.post(url, { state: state, client_id: client_id }, config)
      .then((response) => { setData(response.data) })
      .catch((err) => { setError(err) })
      .finally(() => { setLoading(false) })
  }

  const postMethodClient = (state: any, first_name: any, last_name: any, physical_address: any, email: any, password: any) => {
    const config = {
      headers: {
        "Accept": "application/json",
        "Content-Type": "application/json"
      }
    }

    setLoading(true);
    axios.post(url, {state: state, first_name: first_name, last_name: last_name, physical_address: physical_address, email: email, password: password, config})
      .then((response) => { setData(response.data) })
      .catch((err) => { setError(err) })
      .finally(() => { setLoading(false) })
  }

  const putMethod = (id: any, name: any, price: any) => {
    const config = {
      headers: {
        "Accept": "application/json",
        "Content-Type": "application/json"
      }
    }

    setLoading(true);
    axios.put(`${url}/${id}`, {name: name, price: price}, config)
      .then((response) => {setData(response.data)})
      .catch((err) => {setError(err)})
      .finally(() => {setLoading(false)})
  }
   
  const deleteMethod = (id: any) =>{
    const config ={
      headers: {
          "Accept": "application/json",
          "Content-Type": "application/json"
      }
    }
    setLoading(true);
    axios.delete(`${url}/${id}`, config)
      .then((response) => {setData(response.data)})
      .catch((err) => {setError(err)})
      .finally(() => {setLoading(false)})
  }

  return {data, loading, error, postMethodOrder, postMethodClient, putMethod, deleteMethod}

}

export default ApiMethods;