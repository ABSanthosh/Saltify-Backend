import Spotify from "../Helpers/spotify.js";
import Youtube from "../Helpers/youtube.js";

export default async function Search(app, options) {
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
