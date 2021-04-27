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
      password: "password",
    })
    .expect(400);
});

it("returns a 400 for an invalid password", async () => {
  // return is optional if you are awaiting for the request
  return request(app)
    .post("/api/users/signup")
    .send({
      email: "test@test",
      password: "pas",
    })
    .expect(400);
});

it("returns a 400 for an invalid input / missing fields", async () => {
  await request(app)
    .post("/api/users/signup")
    .send({ email: "test@test.com" })
    .expect(400);

  await request(app)
    .post("/api/users/signup")
    .send({ passowrd: "gg" })
    .expect(400);
});

it("returns a 400 for duplicate email", async () => {
  await request(app)
    .post("/api/users/signup")
    .send({ email: "test@test.com", password: "password" })
    .expect(201);

  await request(app)
    .post("/api/users/signup")
    .send({ email: "test@test.com", password: "password" })
    .expect(400);
});

it("checks for a cookie after successful signup", async () => {
  const response = await request(app)
    .post("/api/users/signup")
    .send({
      email: "test@test.com",
      password: "password",
    })
    .expect(201);
    
  // Fails by default cuz jwt session is set to true (only works for https)
  
  expect(response.get("Set-Cookie")).toBeDefined();
});
