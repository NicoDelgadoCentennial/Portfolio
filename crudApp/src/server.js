const express = require('express');
const app = express();
const path = require('path');

app.use(express.static('public'));

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '/app/home/home.component.html'));
});

const port = 3000; 
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});