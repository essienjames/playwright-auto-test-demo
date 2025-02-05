import { APIRequestContext } from '@playwright/test';
import { validateSchema } from './schema-helpers';

/**
 * Create a new user
 * @param request - Playwright request context
 * @param baseURL - Base URL of the API
 * @param name - Name of the user
 * @param job - Job title of the user
 * @returns Created user response JSON
 */

export async function createUser(request: APIRequestContext, baseURL: string, name: string, job: string) {
    const response = await request.post(`${baseURL}/users`, {
        data: { name, job },
    });

    const responseBody = await response.json()

    // Validate response status
    if (response.status() !== 201) {
        throw new Error(`Failed to create user: ${responseBody}`)
    }

    // Validate response schema
    const isValid = validateSchema('user', responseBody);
    if (!isValid) {
        throw new Error(`Invalid response schema for user creation`);
    }

    return responseBody
}

/**
 * Create a user and return user ID
 * @param request - Playwright request context
 * @param baseURL - Base URL of the API
 * @returns Created user ID
 */
export async function createAndGetUserId(request: APIRequestContext, baseURL: string) {
    const responseBody = await createUser(request, baseURL, 'Test User', 'Tester');
    return responseBody.id;
}

/**
 * Update an existing user by ID
 * @param request - Playwright request context
 * @param baseURL - Base URL of the API
 * @param userId - ID of the user to update
 * @param name - New name of the user
 * @param job - New job title of the user
 * @returns Updated user response JSON
 */
export async function updateUser(request: APIRequestContext, baseURL: string, userId: string, name: string, job: string) {
    const response = await request.put(`${baseURL}/users/${userId}`, {
        data: { name, job }
    });

    const responseBody = await response.json();

    // Validate response status
    if (response.status() !== 200) {
        throw new Error(`Failed to update user: ${responseBody}`)
    }

    return responseBody;
}

/**
 * Delete an existing user
 * @param request - Playwright request context
 * @param baseURL - Base URL of the API
 * @param userId - ID of the user
 * @returns Deleted status code
 */

export async function deleteUser(request: APIRequestContext, baseURL: string, userId: string) {
    const response = await request.delete(`${baseURL}/users/${userId}`)
    if (response.status() !== 204) {
        throw new Error(`Failed to delete user with userId: ${userId}`)
    }
    return response.status()
}
