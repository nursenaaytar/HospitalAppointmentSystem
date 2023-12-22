const express = require("express");
const mongoose = require("mongoose");
const User = require("./models/user");
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.listen(3000);

// User
app.post("/user/create", async (req, res) => {
  console.log("***********************************************************************************")
  try {
    const user = await User.create(req.body);
    res.status(200).json(user);
  } catch (err) {
    console.log(err)
    console.log(err.message);
    res.status(500).json({ message: err.message });
  }
});

mongoose.set("strictQuery", false);
mongoose
  .connect(
    "mongodb+srv://admin:123123123@hospitalappointment.ptm1btw.mongodb.net/?retryWrites=true&w=majority"
  )
  .then(() => {
    console.log("Connected to MongoDB");

    //app.listen(3000, () => {console.log('listening')});
  })
  .catch((err) => console.log(err));
