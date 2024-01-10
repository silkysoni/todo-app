const mongoose=require('mongoose')
const db=mongoose.connect('mongodb+srv://silky12345soni:silkycloud123@cluster0.6mhvhhb.mongodb.net/mytodo', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => {
  console.log('DB connected');
}).catch((err) => {
  console.log(err);
})
// const db = mongoose.connection;
module.exports=db

