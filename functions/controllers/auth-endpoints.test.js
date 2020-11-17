const request = require("supertest");

describe("Cloud Functions", () => {
  it("should sign in user and receive a token", async () => {
    const result = await request(
      "http://localhost:5000/whitelabel-website-7d72b/europe-west2/app"
    )
      .post(`/admin`)
      .send({
        email: "test@test.com",
        password: "test1234",
      });

    expect(result.body).toEqual(
      expect.objectContaining({ token: expect.any(String) })
    );
  });

  it("should return correct error it user does not exist", async () => {
    const userNotFound = await request(
      "http://localhost:5000/whitelabel-website-7d72b/europe-west2/app"
    )
      .post(`/admin`)
      .send({
        email: "test@test.co",
        password: "test1234",
      });

    expect(userNotFound.status).toEqual(404);
    expect(userNotFound.body).toEqual(
      expect.objectContaining({ error: "User not found" })
    );
  });

  it("should return correct error if user enters wrong password", async () => {
    const userPasswordError = await request(
      "http://localhost:5000/whitelabel-website-7d72b/europe-west2/app"
    )
      .post(`/admin`)
      .send({
        email: "test@test.com",
        password: "test123",
      });

    expect(userPasswordError.status).toEqual(401);
    expect(userPasswordError.body).toEqual(
      expect.objectContaining({ error: "Invalid password" })
    );
  });

  it("should return correct error if route does not exist", async () => {
    const result = await request(
      "http://localhost:5000/whitelabel-website-7d72b/europe-west2/app"
    )
      .post(`/not-a-route`)
      .send({
        email: "test@test.com",
        password: "test1234",
      });
    -expect(result.body).toEqual(
      expect.objectContaining({ message: "Path does not exist" })
    );
  });
});
