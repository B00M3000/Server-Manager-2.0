const mongoose = require('mongoose')

const username = process.env.MONGO_USER || '';
const password = process.env.MONGO_PASS || '';
const database = process.env.MONGO_DATABASE_NAME;
if(!database) throw new Error('MongoDB Database isn\'t defined');

if (!process.env.MONGO_PATH) throw new Error('Mongo db path is not defined');

const path = process.env.MONGO_PATH.replace('<username>', username)
  .replace('<password>', password)
  .replace('<database>', database);

module.exports = async () => {
  await mongoose.connect(path, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    keepAlive: true,
    useFindAndModify: false,
  });

  return mongoose;
};
