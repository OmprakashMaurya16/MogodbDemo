const express = require("express");
const mongoose = require("mongoose");
const path = require("path");
const Chat = require("./models/chat.js");
const methodOverride = require("method-override");

const app = express();
const PORT = 8080;

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"));

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

//edit message
app.get("/chats/:id/edit", async (req, res) => {
  let { id } = req.params;
  let chat = await Chat.findById(id);
  res.render("edit.ejs", { chat });
});

//update message
app.put("/chats/:id", async (req, res) => {
  let { id } = req.params;
  let { message: newMessage } = req.body;
  let updateMessage = await Chat.findByIdAndUpdate(
    id,
    { message: newMessage },
    { runValidators: true, new: true }
  );
  res.redirect("/Chats");
});

//DELETE ROUTE
app.delete("/chats/:id", async (req, res) => {
  let { id } = req.params;
  let deletedChat = await Chat.findByIdAndDelete(id);
  console.log(deletedChat);
  res.redirect("/Chats");
});

app.listen(PORT, () => {
  console.log(`Server is running on PORT ${PORT}`);
});
