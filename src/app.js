const app = require("fastify")();

app.get("/", async (req, res) => {
  res.send({ hello: "world" });
});

app.listen(1232, (err, addr) => {
    if (err) {
        console.error(err);
        process.exit(1);
    }
    console.log(`server listening on ${addr}`);
});
// export 'app'
module.exports = app;
