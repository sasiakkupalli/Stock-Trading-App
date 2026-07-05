const mongoose = require("mongoose");

const uri =
  "mongodb+srv://sbstocks:s210815%40yadav@cluster0.oucp9zb.mongodb.net/sbstocks?retryWrites=true&w=majority&appName=Cluster0";

mongoose
  .connect(uri)
  .then(() => {
    console.log("✅ Connected Successfully");
    process.exit(0);
  })
  .catch((err) => {
    console.error(err);
    process.exit(1);
  });