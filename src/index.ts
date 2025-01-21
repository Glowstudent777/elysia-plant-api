import { Elysia } from "elysia";
import { getByQuery, getPlant, getPlantByGenus, getPlants } from "./api";

const app = new Elysia();

app.get("/plants", getPlants);
app.get("/plant/search/:q", ({ params: { q } }) => getByQuery(q));
app.get("/plant/:genus", ({ params: { genus } }) => getPlantByGenus(genus));
app.get("/species/:plant", ({ params: { plant } }) => getPlant(plant));

app
  .onError(({ code }) => {
    if (code === "NOT_FOUND") return "Resource not found";
  })
  .listen(3000);

console.log(
  `🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`
);
