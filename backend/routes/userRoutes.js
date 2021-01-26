import express from "express";
import User from "../models/usersModel.js";
const router = express.Router();

router.get("/", async (req, res) => {
  const users = await User.find({});
  res.json(users);
});

router.post("/post", async (req, res) => {
  const user = new User({
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    email: req.body.email,
    expSales: req.body.expSales,
    birthday: req.body.birthday,
    sales: req.body.sales,
    goalDate: req.body.goalDate,
  });

  user.save().then((data) => {
    res.json(data);
  });
});

router.delete("/:id", async (req, res) => {
  try {
    const removedWorker = await User.remove({ _id: req.params.id });
    res.json(removedWorker);
  } catch (err) {
    res.json({ message: err });
  }
});

router.patch("/:id", async (req, res) => {
  try {
    const updatedSale = await User.updateOne(
      {
        _id: req.params.id,
      },
      {
        $set: {
          sales: req.body.sales,
        },
      }
    );
    res.json(updatedSale);
  } catch (err) {
    res.json({ message: err });
  }
});

router.patch("/edit/:id", async (req, res) => {
  try {
    const updatedSale = await User.updateMany(
      {
        _id: req.params.id,
      },
      {
        $set: {
          firstName: req.body.firstName,
          lastName: req.body.lastName,
          email: req.body.email,
          expSales: req.body.expSales,
          birthday: req.body.birthday,
          sales: req.body.sales,
          goalDate: req.body.goalDate,
        },
      }
    );
    res.json(updatedSale);
  } catch (err) {
    res.json({ message: err });
  }
});

export default router;
