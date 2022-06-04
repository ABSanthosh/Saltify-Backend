const fetch = require("node-fetch");

class Spotify {
  constructor(URI, type) {
    this.URI = URI;
    this.type = type;
    this.endpoint = `https://open.spotify.com/embed/${type}/${URI}?utm_source=oembed`;
  }

  getEndpoint(URI, type) {
    return `https://open.spotify.com/embed/${type}/${URI}?utm_source=oembed`;
  }

  async getMetaData(endpoint = this.endpoint) {
    const response = await fetch(endpoint);

    let data = await response.text();
    data = data
      .split('<script id="resource" type="application/json">')[1]
      .split("</script>")[0];
    data = decodeURIComponent(data);
    return data;
  }

  async getFlattenedData(endpoint = this.endpoint) {
    const Data = JSON.parse(await this.getMetaData(endpoint));

    const flattenedData = {
      title: Data.name,
      artist: Data.artists.map((artist) => artist.name),
      image: Data.album.images[0].url,
      preview: Data.preview_url,
      duration: Data.duration_ms,
      color: Data.dominantColor,
    };

    return flattenedData;
  }

  async parsePlaylist() {
    const Data = JSON.parse(await this.getMetaData());
    return Data;
  }

  async getFlattenedPlaylist() {
    const Data = await this.parsePlaylist();
    const flattenedData = {
      playlist_title: Data.name,
      playlist_image: Data.images[0].url,
      tracks: Data.tracks.items.map((track) => track.track.id),
    };
    return flattenedData;
  }
}

module.exports = Spotify;