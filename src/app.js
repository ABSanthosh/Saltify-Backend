// const app = require("fastify")();
import fastify from "fastify";
import Spotify from "./Helpers/spotify.js";
// const Spotify = require("./Helpers/spotify.js");

const app = fastify();

app.get("/", async (req, res) => {
  res.send({ hello: "world" });
});

app.get("/flat/:type/:uri", async (req, res) => {
  const uri = req.params.uri;
  const type = req.params.type;
  const spotify = new Spotify(uri, type);

  let response;

  if (type === "playlist") response = await spotify.getFlattenedPlaylist();
  else if (type === "track") response = await spotify.getFlattenedData();

  res.send(response);
});

app.get("/full/:type/:uri", async (req, res) => {
  const uri = req.params.uri;
  const type = req.params.type;
  const spotify = new Spotify(uri, type);

  let response;

  if (type === "playlist") response = await spotify.parsePlaylist();
  else if (type === "track") response = await spotify.getMetaData();

  res.send(response);
});

app.listen(1232, (err, addr) => {
  if (err) {
    console.error(err);
    process.exit(1);
  }
  console.log(`server listening on ${addr}`);
});

export default app;
