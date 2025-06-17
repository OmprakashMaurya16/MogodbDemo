const express = require("express");
const mongoose = require("mongoose");
const path = require("path");
const Chat = require("./models/chat.js");

const app = express();
const PORT = 8080;

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded({ extended: true }));

main()
  .then(() => console.log("Connection Successful"))
  .catch((err) => console.log(err));

async function main() {
  await mongoose.connect("mongodb://localhost:27017/MongodbDemo");
}

app.get("/", (req, res) => {
  res.send("Server is running");
});

// Show All chats route
app.get("/chats", async (req, res) => {
  let chats = await Chat.find({});
  console.log(chats);
  res.render("chats.ejs", { chats });
});

//add new chat contain
app.get("/chats/new", (req, res) => {
  res.render("new.ejs");
});

//add new chat to db
app.post("/chats", (req, res) => {
  let { from, message, to } = req.body;
  let newChat = new Chat({
    from: from,
    message: message,
    to: to,
    created_at: new Date(),
  });

  newChat
    .save()
    .then((res) => console.log(res))
    .catch((err) => console.log(err));

  res.redirect("/Chats");
});

app.listen(PORT, () => {
  console.log(`Server is running on PORT ${PORT}`);
});
