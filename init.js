const mongoose = require("mongoose");
const Chat = require("./models/chat.js");

main()
  .then(() => console.log("Connection Successful"))
  .catch((err) => console.log(err));

async function main() {
  await mongoose.connect("mongodb://localhost:27017/MongodbDemo");
}

let AllChats = [
  {
    to: "Swati Mane",
    from: "Omprakash Maurya",
    message: "Can you help me in mini project",
    created_at: new Date(),
  },
  {
    to: "Ravi Deshmukh",
    from: "Anjali Sharma",
    message: "Hey, can you review the latest module I submitted?",
    created_at: new Date(),
  },
  {
    to: "Priya Kulkarni",
    from: "Amit Verma",
    message: "Let’s finalize the presentation slides today.",
    created_at: new Date(),
  },
  {
    to: "Siddharth Mehra",
    from: "Neha Joshi",
    message: "I’ve added the login feature, please test it.",
    created_at: new Date(),
  },
  {
    to: "Karan Kapoor",
    from: "Divya Iyer",
    message: "Any updates on the backend API?",
    created_at: new Date(),
  },
  {
    to: "Meera Jain",
    from: "Rahul Singh",
    message: "Don’t forget the team meeting at 4 PM.",
    created_at: new Date(),
  },
  {
    to: "Nikhil Patil",
    from: "Sneha Reddy",
    message: "Let’s collaborate on the frontend styling.",
    created_at: new Date(),
  },
  {
    to: "Ishita Sen",
    from: "Manav Thakur",
    message: "Can you share the dataset again?",
    created_at: new Date(),
  },
  {
    to: "Tanya Bhatia",
    from: "Arjun Kulkarni",
    message: "Code looks good. Just add some comments.",
    created_at: new Date(),
  },
  {
    to: "Aniket Rao",
    from: "Riya D’Souza",
    message: "I’ll handle the deployment part tomorrow.",
    created_at: new Date(),
  },
];

Chat.insertMany(AllChats);
