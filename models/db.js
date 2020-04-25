const mongoose = require('mongoose');


// Connect to MongoDB
mongoose
  .connect(
    'mongodb://mongo:27017/docker-node-mongo',
    { useNewUrlParser: true }, (err) => {
      if(!err) {
        console.log('MogoDB Connnection Successed. ') 
      } else {
        console.log('Error in DB connection : ' + err)
      }
      });

        
