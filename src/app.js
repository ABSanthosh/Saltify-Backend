import fastify from "fastify";
import FlatMetadata from "./routes/Flat.js";
import FullMetadata from "./routes/Full.js";
import Search from "./routes/Search.js";

const app = fastify();

app.register(FlatMetadata);
app.register(FullMetadata);
app.register(Search);

app.listen({ port: 1232 }, function (err, address) {
  if (err) {
    console.error(err);
    process.exit(1);
  }
});

export default app;
