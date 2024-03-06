import express from "express";
import router from "./app/Routes/model";

const app = express();

app.use(express.json());

const PORT = process.env.PORT || 8080;

app.listen(PORT, () => console.log(`Server is listening on port ${PORT}`));

// routes
app.use("/api", router);

// Server Metrics
app.get("/metrics", (request, response) => {
  response.sendStatus(200);
});
