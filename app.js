const Joi = require("joi");
const express = require("express");
const app = express();

app.use(express.json());

const genres = [];

function validateGenre(genre) {
  const schema = {
    name: Joi.string().required(),
  };
  return Joi.validate(genre, schema);
}

app.get("/api/genres", (req, res) => {
  res.send(genres);
});

app.get("/api/genres/:id", (req, res) => {
  const genre = genres.find(({ id }) => id === parseInt(req.params.id));
  if (!genre)
    return res.status(404).send("The genre with the given id was not found.");

  res.send(genre);
});

app.post("/api/genres", (req, res) => {
  const { error } = validateGenre(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const genre = {
    id: genres.length + 1,
    name: req.body.name,
  };

  genres.push(genre);
  res.send(genre);
});

app.put("/api/genres/:id", (req, res) => {
  const genre = genres.find(({ id }) => id === parseInt(req.params.id));
  if (!genre)
    return res.status(404).send("The genre with the given id was not found.");

  const { error } = validateGenre(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  genre.name = req.body.name;
  res.send(genre);
});

app.delete("/api/genres/:id", (req, res) => {
  const genre = genres.find(({ id }) => id === parseInt(req.params.id));
  if (!genre)
    return res.status(404).send("The genre with the given id was not found.");

  const index = genres.indexOf(genre);
  genres.splice(index, 1);
  res.send(genre);
});

const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Listening on port ${port}...`));
