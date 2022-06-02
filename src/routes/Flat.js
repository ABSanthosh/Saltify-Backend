import Spotify from "../Helpers/spotify.js";

export default async function FlatMetadata(app, options) {
  app.get("/flat/:type/:uri", async (req, res) => {
    const uri = req.params.uri;
    const type = req.params.type;
    const spotify = new Spotify(uri, type);
    let response;

    if (type === "playlist") response = await spotify.getFlattenedPlaylist();
    else if (type === "track") response = await spotify.getFlattenedData();

    res.send(response);
  });
}
