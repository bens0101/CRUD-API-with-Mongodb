# s2024-assignments

MAD9124 class assignments repo

## Task:

This is the first of three take home assignments in this course that will be related, with later assignments building on the functionality of earlier ones. You are going to build the back end web services to support a simple golf score application called golfR.

For this assignment, you will build the base for the golfR RESTful API using Node.js and the Express framework.

## 1. Using the Express.js framework, the API will expose a full set of CRUD routes (six, including both `put` and `patch`) for **Round** resource:. All API resource paths must begin with `/api`:

```
const express = require("express");

const roundsRouter = require("./routers/rounds");

const app = express();

// middleware
app.use(express.json());

app.get("/", (_req, res) => {
  res.send("Server running 🚀🚀🚀");
});

app.use("/api/rounds", roundsRouter);

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`App running on port ${PORT}`);
});
```

## 2. Resource collections will be stored as in memory arrays stored in a separate module:

```
const rounds = [
  {
    id: 1,
    course: "emerald links",
    username: "steve",
    scores: [6, 4, 3, 5, 5, 6, 3, 5, 5, 4, 5, 5, 6, 4, 3, 4, 4, 3],
  },
  {
    id: 2,
    course: "the marshes",
    username: "adam",
    scores: [6, 5, 6, 4, 4, 6, 3, 4, 3, 3, 5, 3, 5, 5, 6, 3, 3, 3],
  },
  {
    id: 3,
    course: "the marshes",
    username: "vincent",
    scores: [6, 6, 6, 3, 4, 3, 3, 4, 6, 3, 4, 4, 5, 6, 5, 3, 5, 3],
  },
  {
    id: 4,
    course: "greensmere",
    username: "diego",
    scores: [6, 5, 5, 4, 5, 3, 5, 3, 5, 3, 4, 5, 3, 6, 5, 6, 3, 6],
  },
  {
    id: 5,
    course: "manderley on the green",
    username: "adesh",
    scores: [3, 6, 6, 5, 5, 5, 5, 3, 6, 6, 3, 3, 4, 4, 4, 3, 3, 4],
  },
  {
    id: 6,
    course: "emerald links",
    username: "adam",
    scores: [6, 3, 4, 5, 3, 5, 5, 3, 5, 3, 3, 5, 3, 6, 5, 4, 4, 6],
  },
  {
    id: 7,
    course: "stittesville golf club",
    username: "diego",
    scores: [5, 3, 5, 3, 4, 4, 5, 3, 4, 6, 4, 6, 4, 4, 5, 6, 4, 6],
  },
  {
    id: 8,
    course: "greensmere",
    username: "adesh",
    scores: [5, 5, 5, 4, 4, 5, 6, 4, 4, 3, 6, 5, 3, 4, 5, 6, 4, 5],
  },
  {
    id: 9,
    course: "emerald links",
    username: "tim",
    scores: [5, 5, 3, 6, 5, 3, 5, 5, 4, 6, 6, 4, 4, 3, 3, 4, 4, 3],
  },
  {
    id: 10,
    course: "gatineau golf club",
    username: "steve",
    scores: [4, 5, 5, 6, 4, 4, 5, 5, 5, 3, 3, 3, 3, 4, 4, 6, 4, 6],
  },
  {
    id: 11,
    course: "greensmere",
    username: "tim",
    scores: [6, 3, 6, 6, 5, 3, 4, 5, 6, 4, 5, 3, 6, 5, 5, 6, 6, 6],
  },
  {
    id: 12,
    course: "gatineau golf club",
    username: "steve",
    scores: [3, 3, 6, 4, 6, 6, 3, 5, 3, 5, 5, 3, 3, 4, 4, 5, 5, 4],
  },
  {
    id: 13,
    course: "gatineau golf club",
    username: "tim",
    scores: [4, 5, 3, 4, 5, 6, 6, 4, 4, 4, 6, 4, 4, 5, 6, 4, 6, 5],
  },
  {
    id: 14,
    course: "stittesville golf club",
    username: "vincent",
    scores: [4, 4, 3, 3, 5, 4, 6, 5, 5, 3, 6, 5, 4, 5, 3, 5, 6, 3],
  },
  {
    id: 15,
    course: "the marshes",
    username: "adesh",
    scores: [6, 3, 6, 4, 6, 6, 3, 4, 6, 4, 5, 3, 3, 4, 4, 3, 3, 5],
  },
  {
    id: 16,
    course: "manderley on the green",
    username: "adam",
    scores: [4, 6, 5, 3, 5, 3, 5, 4, 5, 3, 4, 6, 5, 6, 4, 4, 6, 3],
  },
  {
    id: 17,
    course: "cedarhill",
    username: "adam",
    scores: [5, 5, 4, 6, 4, 4, 5, 6, 6, 6, 4, 3, 5, 4, 4, 4, 5, 6],
  },
  {
    id: 18,
    course: "emerald links",
    username: "adam",
    scores: [6, 3, 6, 3, 3, 4, 3, 5, 4, 5, 3, 3, 5, 5, 6, 6, 5, 5],
  },
  {
    id: 19,
    course: "greensmere",
    username: "steve",
    scores: [3, 6, 5, 4, 3, 3, 5, 4, 6, 6, 5, 6, 5, 3, 6, 5, 6, 6],
  },
  {
    id: 20,
    course: "greensmere",
    username: "adam",
    scores: [4, 4, 6, 4, 3, 5, 4, 3, 5, 6, 6, 5, 5, 6, 6, 3, 4, 3],
  },
];

module.exports = rounds;




```

## 3 . Routes related to individual members of a resource collection should have validation for the `id` and return a properly formatted 404 response with an error message if not found:

```
  if (!course || !username || !Array.isArray(scores) || scores.length !== 18) {
    return res.status(400).json({ error: "Invalid data" });
  }
```

## 4. More robust data validation will be implemented in the next assignment, but for now ensure that only expected resource properties are stored for each member of the collection:

```
{
  "course": "manderley on the green",
  "username": "tim",
  "scores": [6, 5, 5, 4, 5, 3, 5, 3, 5, 3, 4, 5, 3, 6, 5, 6, 3, 6],
  "script": "rm -f /my-computer" // this line should not save
}
```
