const express = require('express');
const axios = require('axios');
const app = express();
const PORT = process.env.PORT || 3000;

// Allow cross-origin requests (CORS)
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  next();
});

// Endpoint to get trending topics
app.get('/trending-topics', async (req, res) => {
  try {
    const response = await axios.get('https://indeed-indeed.p.rapidapi.com/apisearch', {
      params: {
        v: '2',
        format: 'json',
        q: 'developer', 
        l: 'usa', 
        radius: '25'
      },
      headers: {
        'x-rapidapi-key': '3225a63b4bmshe5baf115f197de6p1b529cjsndc896ead0734',
        'x-rapidapi-host': 'indeed-indeed.p.rapidapi.com'
      }
    });

    const jobs = response.data.results; 

    // Process job titles to count occurrences
    const topicCounts = jobs.reduce((acc, job) => {
      const title = job.jobtitle; 
      acc[title] = (acc[title] || 0) + 1;
      return acc;
    }, {});

    res.json(topicCounts);
  } catch (error) {
    console.error(error);
    res.status(500).send('Error fetching trending topics');
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
