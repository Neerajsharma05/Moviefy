import React, { useEffect, useState } from "react";

import CardUi from "./CardUi";
import CardContainer from "./CardContainer";
import { GetpopularMovie } from '../Services/Api'


const Popular = ({className}) => {
  
  const [data, setData] = useState([]);

  const GetpopularMovies = async () => {
    try {
      const response = await GetpopularMovie() ;
      setData(response.data.results); // ✅ store only movie list
    } catch (error) {
      console.log("Error fetching movies:", error);
    }
  };

  useEffect(() => {
    GetpopularMovies();
  }, []);

  // console.log("Movies Data:", data);

  return (
    <div>
      <h1 className={`text-white text-center font-bold text-4xl ${className}`}>Popular Movies</h1>
      <CardContainer data={data} />
    </div>
  );
};

export default Popular;
