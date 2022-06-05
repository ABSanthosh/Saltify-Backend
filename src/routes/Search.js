const Spotify = require("../Helpers/spotify.js");
const Youtube = require("../Helpers/youtube.js");

async function Search(app, options) {
  app.get("/search/:uri", async (req, res) => {
    const uri = req.params.uri;
    const spotify = new Spotify(uri, "track");
    const metadata = await spotify.getFlattenedData();

    const yt = new Youtube(
      `("${metadata.title}" "${metadata.artist}") {official | audio}`
    );
    const youtubeData = await yt.getVideoId();

    res.send(youtubeData);
  });
}

module.exports = Search;
