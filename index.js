const express = require("express");

const server = express();

server.use(express.json());

const projects = [];

function verificarId(req, res, next) {
  const { id } = req.params;

  if (!projects.find(x => x.id === id)) {
    return res.status(400).json({ error: "Id não encontrado!" });
  }

  return next();
}

server.get("/projects", (req, res) => {
  return res.json(projects);
});

server.post("/projects", (req, res) => {
  const { id, title } = req.body;

  projects.push({ id: id, title: title, tasks: [] });

  return res.json(projects);
});

server.put("/projects/:id", verificarId, (req, res) => {
  const { id } = req.params;
  const { title } = req.body;
  const idAtual = projects.findIndex(x => x.id === id);

  projects[idAtual].title = title;

  return res.json(projects);
});

server.delete("/projects/:id", verificarId, (req, res) => {
  const { id } = req.params;
  const idAtual = projects.findIndex(x => x.id === id);

  projects.splice(idAtual, 1);

  return res.json(projects);
});

server.post("/projects/:id/tasks", verificarId, (req, res) => {
  const { id } = req.params;
  const { title } = req.body;

  const idAtual = projects.findIndex(x => x.id === id);

  projects[idAtual].tasks.push(title);

  return res.json(projects);
});

vjgjhgj;
server.listen(3000);
