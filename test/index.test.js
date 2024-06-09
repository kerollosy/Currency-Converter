const request = require("supertest");
const app = require("../app");

describe("GET /api/rates", () => {
    it("should return 400 if base currency is not provided", async () => {
        const res = await request(app)
            .get("/api/rates")
            .query({ to: "USD" });
        expect(res.status).toBe(400);
        expect(res.body.error).toBe("Base currency is required");
    });

    it("should return 400 if target currency is not provided", async () => {
        const res = await request(app)
            .get("/api/rates")
            .query({ from: "EUR" });
        expect(res.status).toBe(400);
        expect(res.body.error).toBe("Target currency is required");
    });

    it("should return 404 if base currency is not found", async () => {
        const res = await request(app)
            .get("/api/rates")
            .query({ from: "XYZ", to: "USD" });
        expect(res.status).toBe(404);
        expect(res.body.error).toBe("Base currency not found");
    });

    it("should return 404 if target currency is not found", async () => {
        const res = await request(app)
            .get("/api/rates")
            .query({ from: "USD", to: "XYZ" });
        expect(res.status).toBe(404);
        expect(res.body.error).toBe("Target currency not found");
    });

    it("should return the exchange rate if both currencies are valid", async () => {
        const res = await request(app)
            .get("/api/rates")
            .query({ from: "EUR", to: "USD" });
        expect(res.status).toBe(200);
        expect(res.body.result).toBe("success");
        expect(res.body.rate).toBeDefined();
    });
    
    it("should return cached exchange rate if available", async () => {
        // Make a request to populate cache
        await request(app)
            .get("/api/rates")
            .query({ from: "EUR", to: "USD" });
        
        // Make a second request to check if rate is served from cache
        const res = await request(app)
            .get("/api/rates")
            .query({ from: "EUR", to: "USD" });
        expect(res.status).toBe(200);
        expect(res.body.result).toBe("success");
        expect(res.body.cached).toBe(true);
        expect(res.body.rate).toBeDefined();
    });
})


