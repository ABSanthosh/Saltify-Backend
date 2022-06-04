const fastify = require("fastify");
const FlatMetadata = require("./routes/Flat.js");
const FullMetadata = require("./routes/Full.js");
const Search = require("./routes/Search.js");

const app = fastify();

app.get("/", async (req, res) => {
  res.send("Hello, world!");
});

app.register(FlatMetadata);
app.register(FullMetadata);
app.register(Search);

app.listen({ port: 1232 }, function (err, address) {
  if (err) {
    console.error(err);
    process.exit(1);
  }
});

module.exports = app;
