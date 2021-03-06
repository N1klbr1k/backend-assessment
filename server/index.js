const express = require("express");
const cors = require("cors");

const app = express();


app.use(cors());

app.use(express.json()); // When we want to be able to accept JSON.

const {getFortune, getAllSpells,deleteSpell,updateSpell,createSpell,getOneSpell} = require('./controller');

app.get("/api/compliment", (req, res) => {
  const compliments = ["Gee, you're a smart cookie!",
					 "Cool shirt!",
					 "Your Javascript skills are stellar.",
  ];

  // choose random compliment
  let randomIndex = Math.floor(Math.random() * compliments.length);
  let randomCompliment = compliments[randomIndex];

  res.status(200).send(randomCompliment);
  
});

app.get("/api/fortune", getFortune);
app.get("/api/spells/:id",getOneSpell)
app.get('/api/spells', getAllSpells);
app.delete('/api/spells/:id', deleteSpell);
app.put('/api/spells/:id', updateSpell);
app.post('/api/spells', createSpell);

app.listen(4000, () => console.log("Server running on 4000"));
