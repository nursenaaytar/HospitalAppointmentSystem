const express = require("express");
const mongoose = require("mongoose");
const User = require("./models/user");
const Hospital = require("./models/hospital");
const Major = require("./models/major");
const Doctor = require("./models/doctor");
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.listen(3000);

//#region  User
app.post("/user/create", async (req, res) => {
  try {
    await User.create(req.body);
    res.status(200).json({ statu: 200, isSuccessful: true, message: "" });
  } catch (err) {
    res
      .status(400)
      .json({ statu: 400, isSuccessful: false, message: err.message });
  }
});

app.get("/user/get/:email", async (req, res) => {
  try {
    const email = req.params.email; // Parametre olarak gelen e-posta adresini al
    if (!email) {
      return res
        .status(400)
        .json({
          status: 400,
          isSuccessful: false,
          message: "E-posta adresi belirtilmedi.",
        });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res
        .status(404)
        .json({
          status: 404,
          isSuccessful: false,
          message: "Kullanıcı bulunamadı.",
        });
    }

    res.status(200).json({ status: 200, isSuccessful: true, user });
  } catch (err) {
    res
      .status(500)
      .json({ status: 500, isSuccessful: false, message: err.message });
  }
});

app.get("/user/getall", async (req, res) => {
  try {
    const users = await User.find({});

    if (!users || users.length === 0) {
      return res
        .status(404)
        .json({
          status: 404,
          isSuccessful: false,
          message: "Kullanıcı bulunamadı.",
        });
    }

    res.status(200).json({ status: 200, isSuccessful: true, users });
  } catch (err) {
    res
      .status(500)
      .json({ status: 500, isSuccessful: false, message: err.message });
  }
});

app.put("/user/update/:userId", async (req, res) => {
  const userId = req.params.userId;
  const { name, surname, dob, tel, gender, role } = req.body;

  try {
    const updatedUser = await User.findOneAndUpdate(
      { _id: userId },
      {
        name: name,
        surname: surname,
        dob: dob,
        tel: tel,
        gender: gender,
        role: role,
      },
      { new: true }
    );

    if (!updatedUser) {
      return res
        .status(404)
        .json({
          status: 404,
          isSuccessful: false,
          message: "Kullanıcı bulunamadı.",
        });
    }

    res.status(200).json({ status: 200, isSuccessful: true, updatedUser });
  } catch (err) {
    res
      .status(500)
      .json({ status: 500, isSuccessful: false, message: err.message });
  }
});

app.delete("/user/delete/:userId", async (req, res) => {
  const userId = req.params.userId;
  try {
    const deletedUser = await User.findByIdAndDelete(userId);

    if (!deletedUser) {
      return res
        .status(404)
        .json({
          status: 404,
          isSuccessful: false,
          message: "Kullanıcı bulunamadı.",
        });
    }

    res
      .status(200)
      .json({
        status: 200,
        isSuccessful: true,
        message: "Hastane başarıyla silindi.",
      });
  } catch (err) {
    res
      .status(500)
      .json({ status: 500, isSuccessful: false, message: err.message });
  }
});
//#endregion

//Hospital
app.post("/hospital/create", async (req, res) => {
  try {
    await Hospital.create(req.body);
    res.status(200).json({ statu: 200, isSuccessful: true, message: "" });
  } catch (err) {
    res
      .status(400)
      .json({ statu: 400, isSuccessful: false, message: err.message });
  }
});

app.get("/hospital/getall", async (req, res) => {
  try {
    const hospitals = await Hospital.find({});

    if (!hospitals || hospitals.length === 0) {
      return res
        .status(404)
        .json({
          status: 404,
          isSuccessful: false,
          message: "Hastane bulunamadı.",
        });
    }

    res.status(200).json({ status: 200, isSuccessful: true, hospitals });
  } catch (err) {
    res
      .status(500)
      .json({ status: 500, isSuccessful: false, message: err.message });
  }
});

app.put("/hospital/update/:hospitalId", async (req, res) => {
  const hospitalId = req.params.hospitalId;
  const { name } = req.body;

  try {
    const updatedHospital = await Hospital.findOneAndUpdate(
      { _id: hospitalId },
      { name: name },
      { new: true }
    );

    if (!updatedHospital) {
      return res
        .status(404)
        .json({
          status: 404,
          isSuccessful: false,
          message: "Hastane bulunamadı.",
        });
    }

    res.status(200).json({ status: 200, isSuccessful: true, updatedHospital });
  } catch (err) {
    res
      .status(500)
      .json({ status: 500, isSuccessful: false, message: err.message });
  }
});

app.delete("/hospital/delete/:hospitalId", async (req, res) => {
  const hospitalId = req.params.hospitalId;
  console.log(hospitalId);
  try {
    const deletedHospital = await Hospital.findByIdAndDelete(hospitalId);

    if (!deletedHospital) {
      return res
        .status(404)
        .json({
          status: 404,
          isSuccessful: false,
          message: "Hastane bulunamadı.",
        });
    }

    res
      .status(200)
      .json({
        status: 200,
        isSuccessful: true,
        message: "Hastane başarıyla silindi.",
      });
  } catch (err) {
    res
      .status(500)
      .json({ status: 500, isSuccessful: false, message: err.message });
  }
});

//Major

app.post("/major/create", async (req, res) => {
  try {
    await Major.create(req.body);
    res.status(200).json({ statu: 200, isSuccessful: true, message: "" });
  } catch (err) {
    res
      .status(400)
      .json({ statu: 400, isSuccessful: false, message: err.message });
  }
});

app.get("/major/getall", async (req, res) => {
  try {
    const majors = await Major.find({});
    if (!majors || majors.length === 0) {
      return res
        .status(404)
        .json({
          status: 404,
          isSuccessful: false,
          message: "Ana Bilim Dalı bulunamadı.",
        });
    }
    res.status(200).json({ status: 200, isSuccessful: true, majors });
  } catch (err) {
    res
      .status(500)
      .json({ status: 500, isSuccessful: false, message: err.message });
  }
});

app.put("/major/update/:majorId", async (req, res) => {
  const majorId = req.params.majorId;
  const { name } = req.body;

  try {
    const updatedMajor = await Major.findOneAndUpdate(
      { _id: majorId },
      { name: name },
      { new: true }
    );

    if (!updatedMajor) {
      return res
        .status(404)
        .json({
          status: 404,
          isSuccessful: false,
          message: "Ana Bilim Dalı bulunamadı.",
        });
    }

    res.status(200).json({ status: 200, isSuccessful: true, updatedMajor });
  } catch (err) {
    res
      .status(500)
      .json({ status: 500, isSuccessful: false, message: err.message });
  }
});

app.delete("/major/delete/:majorId", async (req, res) => {
  const majorId = req.params.majorId;
  try {
    const deletedMajor = await Major.findByIdAndDelete(majorId);

    if (!deletedMajor) {
      return res
        .status(404)
        .json({
          status: 404,
          isSuccessful: false,
          message: "Ana Bilim Dalı bulunamadı.",
        });
    }

    res
      .status(200)
      .json({
        status: 200,
        isSuccessful: true,
        message: "Ana Bilim Dalı başarıyla silindi.",
      });
  } catch (err) {
    res
      .status(500)
      .json({ status: 500, isSuccessful: false, message: err.message });
  }
});

//

//#region Doctor

app.post("/doctor/create", async (req, res) => {
  try {
    const { userId, majorId, hospitalId } = req.body;

    const userExists = await User.findById(userId);
    if (!userExists) {
      return res.status(400).json({ error: "Geçersiz kullanıcı ID'si" });
    }

    const majorExists = await Major.findById(majorId);
    if (!majorExists) {
      return res.status(400).json({ error: "Geçersiz ana bilim dalı ID'si" });
    }

    const hospitalExists = await Hospital.findById(hospitalId);
    if (!hospitalExists) {
      return res.status(400).json({ error: "Geçersiz hastane ID'si" });
    }

    const newDoctor = new Doctor({
      userId,
      majorId,
      hospitalId,
    });

    const savedDoctor = await newDoctor.save();

    res.json(savedDoctor);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});
//#endregion

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
