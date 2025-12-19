import express from "express";
import axios from "axios";
import cors from "cors";

const app = express();
app.use(cors());

const API_KEY = "c4e2efe2860f78e8a430feb5656c6c76";
const BASE_URL = "https://api.themoviedb.org/3";

// Example route to get popular movies
app.get("/api/movies/popular", async (req, res) => {
  try {
    const response = await axios.get(`${BASE_URL}/movie/popular?api_key=${API_KEY}&language=en-US&page=1`);
    res.json(response.data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error fetching data" });
  }
});

// Example route to search movies
app.get("/api/movies/search", async (req, res) => {
  const query = req.query.q;
  try {
    const response = await axios.get(`${BASE_URL}/search/movie?api_key=${API_KEY}&query=${query}`);
    res.json(response.data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error searching movies" });
  }
});

app.listen(5000, () => console.log("✅ Server running on http://localhost:5000"));
