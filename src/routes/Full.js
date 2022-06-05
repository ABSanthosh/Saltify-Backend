const Spotify = require("../Helpers/spotify");

async function FullMetadata(app, options) {
  app.get("/full/:type/:uri", async (req, res) => {
    const uri = req.params.uri;
    const type = req.params.type;
    const spotify = new Spotify(uri, type);
    let response;

    if (type === "playlist") response = await spotify.parsePlaylist();
    else if (type === "track") response = await spotify.getMetaData();

    res.send(response);
  });
}

module.exports = FullMetadata;
