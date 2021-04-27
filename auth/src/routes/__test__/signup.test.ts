import request from "supertest";
import { app } from "../../app";

it("returns a 201 on successful signup", async () => {
  return request(app)
    .post("/api/users/signup")
    .send({
      email: "test@test.com",
      password: "password",
    })
    .expect(201);
});


it("returns a 400 for an invalid email", async () => {
  return request(app)
    .post("/api/users/signup")
    .send({
      email: "test@test",
      password: "password"
    })
    .expect(400);
})