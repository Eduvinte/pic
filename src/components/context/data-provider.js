import React, { createContext, useEffect, useState } from 'react'
const API_KEY = process.env.REACT_APP_API_KEY;
import axios from 'axios'

export const DataContext = createContext({});

function DataProvider({ children }){

  const [datas, setData] = useState([])
  const [item, setItem] = useState([])

  const [searchText, setSearchText] = useState('Dog');

  const updateSearchText = (text) => {
    setSearchText(text);
  };

  // Consume la Api
    const pexelsApi = async () => {
  try {
    const response = await axios.get(`https://api.pexels.com/v1/search?query=${searchText}`, {
      headers: {
        Authorization: API_KEY
      }
    });
    const result = response.data;
    setData(result);
    console.log(result);
  } catch (error) {
    console.log(error);
  }
};

    // Ejecuta una sola vez la función pexelsApi
      useEffect(() => {
        pexelsApi()
      }, [searchText])
      


    
    return (
      // Pasa todos los estado a los componentes de forma Global
        <DataContext.Provider value={{ datas, setData, item, setItem, searchText, updateSearchText }}>
            { children } 
        </DataContext.Provider>
    )
}

export default DataProvider;
