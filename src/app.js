import fastify from "fastify";
import FlatMetadata from "./routes/Flat.js";
import FullMetadata from "./routes/Full.js";

const app = fastify();

app.register(FlatMetadata);
app.register(FullMetadata);

app.listen({ port: 1232 }, function (err, address) {
  if (err) {
    console.error(err);
    process.exit(1);
  }
  // Server is now listening on ${address}
});

export default app;
