// Import required packages
const express = require("express");
const mongoose = require("mongoose");

// Initialize Express app
const app = express();
app.use(express.json());

// Connect to MongoDB

// mongoose.connect("mongodb+srv://Lakshay:<password>@hackathon.uz3duhd.mongodb.net/", {
  mongoose.connect("mongodb+srv://shubhamdhanda7:<password>@cluster0.lqjzrcp.mongodb.net/?retryWrites=true&w=majority", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  user: "shubhamdhanda7",
  pass: "Shubham@2001"
});
const db = mongoose.connection;
db.on("error", console.error.bind(console, "MongoDB connection error:"));
db.once("open", () => {
  console.log("Connected to MongoDB");
});

// Define Candidate schema
const candidateSchema = new mongoose.Schema({
  name: String,
  email: String,
  resume: String,
  status: String,
  // Add more fields as per your requirements
});
const Candidate = mongoose.model("Candidate", candidateSchema);

// Define Availability schema
const availabilitySchema = new mongoose.Schema({
  interviewerId: String,
  round: Number,
  unavailableTimes: [Date],
  // Add more fields as per your requirements
});
const Availability = mongoose.model("Availability", availabilitySchema);

// Define Interview schema
const interviewSchema = new mongoose.Schema({
  candidateId: String,
  interviewerId: String,
  round: Number,
  // Add more fields as per your requirements
});
const Interview = mongoose.model("Interview", interviewSchema);

// Define Feedback schema
const feedbackSchema = new mongoose.Schema({
  candidateId: String,
  interviewerId: String,
  round: Number,
  rating: Number,
  comments: String,
  // Add more fields as per your requirements
});
const Feedback = mongoose.model("Feedback", feedbackSchema);

app.get("/",(req,res) =>{
  res.send("Hello World");
})


// Schedule interviews randomly with available interviewers
app.post("/schedule", async (req, res) => {
  try {
    const { round } = req.body;
    //Schedule Intrviews here

    // // Get available interviewers for the specific round
    // const availableInterviewers = await Availability.find({ round });

    // // Get available candidates
    // const availableCandidates = await Candidate.find({});

    // // Shuffle the available interviewers and candidates arrays randomly
    // const shuffledInterviewers = shuffleArray(availableInterviewers);
    // const shuffledCandidates = shuffleArray(availableCandidates);

    // // Schedule interviews randomly
    // const interviews = [];
    // for (let i = 0; i < shuffledCandidates.length; i++) {
    //   const interviewerIndex = i % shuffledInterviewers.length;
    //   const interviewerId =
    //     shuffledInterviewers[interviewerIndex].interviewerId;
    //   const candidateId = shuffledCandidates[i]._id;

    //   const interview = await Interview.create({
    //     candidateId,
    //     interviewerId,
    //     round,
    //   });

    //   interviews.push(interview);
    // }

    res.json(interviews);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to schedule interviews" });
  }
});
app.post("/candidates", async (req, res) => {
  try {
    const { name, email, resume, status } = req.body;

    // Create a new candidate document
    const candidate = await Candidate.create({
      name,
      email,
      resume,
      status,
    });

    res.json(candidate);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to add candidate" });
  }
});

// Add a new endpoint to get all candidate details
app.get("/candidates", async (req, res) => {
    try {
      // Retrieve all candidate documents from the database
      const candidates = await Candidate.find({});
  
      res.json(candidates);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Failed to fetch candidate details" });
    }
  });

  const interviewerSchema = new mongoose.Schema({
    name: String,
    email: String,
    // Add more fields as per your requirements
  });
  const Interviewer = mongoose.model("Interviewer", interviewerSchema);

  // Add a new endpoint to add an interviewer
app.post("/interviewers", async (req, res) => {
  try {
    const { name, email } = req.body;

    // Create a new interviewer document
    const interviewer = await Interviewer.create({
      name,
      email,
    });

    res.json(interviewer);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to add interviewer" });
  }
});

// Add a new endpoint to get all interviewers
app.get("/interviewers", async (req, res) => {
  try {
    // Retrieve all interviewer documents from the database
    const interviewers = await Interviewer.find({});

    res.json(interviewers);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to fetch interviewers" });
  }
});

// Add a new endpoint for updating the candidate status
app.put("/candidates/:id/status", async (req, res) => {
    try {
      const { status } = req.body;
      const candidateId = req.params.id;
  
      // Update the candidate's status
      await Candidate.findByIdAndUpdate(candidateId, { status });
  
      res.json({ success: true });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Failed to update candidate status" });
    }
  });

  // Add a new endpoint to get all information of an interviewer
app.get("/interviewers/:id", async (req, res) => {
    try {
      const interviewerId = req.params.id;
  
      // Retrieve the interviewer document from the database
      const interviewer = await Interviewer.findById(interviewerId);
  
      if (!interviewer) {
        return res.status(404).json({ error: "Interviewer not found" });
      }
  
      // Retrieve the interviews for the specific interviewer
      const interviews = await Interview.find({ interviewerId });
  
      const interviewerWithInterviews = {
        interviewer,
        interviews,
      };
  
      res.json(interviewerWithInterviews);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Failed to fetch interviewer information" });
    }
  });
  

// Utility function to shuffle an array randomly
function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

// Start the server
app.listen(9000, () => {
  console.log("Server started on port 9000");
});
