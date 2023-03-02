const express = require("express");
const app = express();
const users = require("./users");

// parse incoming requests with JSON payloads
app.use(express.json());

// GET /users - return list of users
app.get("/users", (req, res) => {
  res.json(users);
});

// POST /users - create new user
app.post("/users", (req, res) => {
  const newUser = {
    id: users.length + 1,
    name: req.body.name,
    createdOn: new Date().toISOString(),
    gender: req.body.gender,
    dob: req.body.dob,
    city: req.body.city,
    state: req.body.state,
    pincode: req.body.pincode,
    modifiedOn: new Date().toISOString(),
  };

  users.push(newUser);
  res.status(201).json(newUser);
});

// PUT /users/<userId> - update user
app.put("/users/:userId", (req, res) => {
  const userId = parseInt(req.params.userId);
  const userIndex = users.findIndex((user) => user.id === userId);

  if (userIndex === -1) {
    return res.status(404).json({ message: "User not found" });
  }

  users[userIndex] = {
    ...users[userIndex],
    ...req.body,
    modifiedOn: new Date().toISOString(),
  };

  res.json(users[userIndex]);
});

// DELETE /users/<userId> - delete user
app.delete("/users/:userId", (req, res) => {
  const userId = parseInt(req.params.userId);
  const userIndex = users.findIndex((user) => user.id === userId);

  if (userIndex === -1) {
    return res.status(404).json({ message: "User not found" });
  }

  users.splice(userIndex, 1);

  res.status(204).send();
});

// start the server
app.listen(3000, () => {
  console.log("UserApiServer is running on port 3000");
});
