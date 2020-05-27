const mongoose = require('mongoose');
const PORT = process.env.PORT;
// Connect to MongoDB
const url = process.env.MONGO_URL || 'mongodb://mongo:27017/docker-node-mongo';
mongoose
  .connect(
    url,
    { useNewUrlParser: true , useUnifiedTopology: true})
    .then(async () => {
      console.log(`MongoDB Connnection Successed on port ${PORT}`)
    })
    .catch(error => console.error(error));
    
        
