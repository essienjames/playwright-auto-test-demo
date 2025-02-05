import { test, expect } from "@playwright/test";
import { createAndGetUserId, createUser, deleteUser, updateUser } from "../../utils/api-helpers";

test.describe('User API Tests', () => {

    let userId: string;
    const invalidUserId = "999999";

    test.beforeAll(async ({ request, baseURL }) => {
        userId = await createAndGetUserId(request, baseURL); // Store user ID for other tests
    });

    test('should create a new user - POST /users', async ({ request, baseURL }) => {
        const responseBody = await createUser(request, baseURL, "Roboute Gulliman", "Primarch");

        expect(responseBody).toHaveProperty("id");
        expect(responseBody.name).toBe("Roboute Gulliman")
        expect(responseBody.job).toBe("Primarch")
        expect(responseBody).toHaveProperty("createdAt");
    });

    test.skip("should not create a user without required fields POST /users", async ({ request, baseURL }) => {
        test.info().annotations.push({ type: 'skip', description: 'Bug: API allows user creation without required fields' });

        const response = await request.post(`${baseURL}/users`, {
            data: {}
        });

        /* todo Report bug! Expected 400 (Bad Request), but API allows user creation. */
        expect(response.status()).toBe(400);
    })


    test('should update an existing user - PUT /users/{id}', async ({ request, baseURL }) => {
        const responseBody = await updateUser(request, baseURL, userId, "Lion El'Jonson", "Primarch");

        // Validate response
        expect(responseBody).toMatchObject({
            name: "Lion El'Jonson",
            job: "Primarch",
        });
        expect(responseBody).toHaveProperty("updatedAt");
    });

    test.skip('should return 404 for updating a non-existent user - PUT /users/{invalidId}', async ({ request, baseURL }) => {
        test.info().annotations.push({ type: 'skip', description: 'Bug: API incorrectly allows updates to non-existent users' });

        const response = await request.put(`${baseURL}/users/${invalidUserId}`, {
            data: { name: "Test", job: "Unknown" }
        });

        /* todo Report bug! Expected 404 (Not Found), but API still allows updates. */
        expect(response.status()).toBe(404);
    });


    test('should partially update an existing user - PATCH /user/{id}', async ({ request, baseURL }) => {
        const response = await request.patch(`${baseURL}/users/${userId}`, {
            data: {
                job: "Primarch of the Dark Angels",
            }
        });

        // Validate response status
        expect(response.status()).toBe(200);

        // Validate response body
        const responseBody = await response.json();
        expect(responseBody).toMatchObject({
            job: "Primarch of the Dark Angels",
        });
        expect(responseBody).toHaveProperty("updatedAt");
    });

    test('should delete user - DELETE /users/{id}', async ({ request, baseURL }) => {
        const status = await deleteUser(request, baseURL, userId)

        // Validate response status
        expect(status).toBe(204);
    })

    test.skip("should return 404 for deleting a non-existent user - DELETE /users/{invalidId}", async ({ request, baseURL }) => {
        test.info().annotations.push({ type: 'skip', description: 'Bug: API incorrectly reports success when deleting a non-existent user' });

        const response = await request.delete(`${baseURL}/users/${invalidUserId}`);

        /* todo report bug!
        * Expected 404 (Not Found), but API still allows deletions.
        */
        expect(response.status()).toBe(404);
    });
});
