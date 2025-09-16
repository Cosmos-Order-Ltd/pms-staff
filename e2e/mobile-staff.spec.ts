import { test, expect } from '@playwright/test';

test.describe('Staff Mobile App', () => {
  test('should display mobile staff interface', async ({ page }) => {
    await page.goto('/');

    // Check page title
    await expect(page).toHaveTitle(/PMS Staff Mobile/);

    // Check mobile header
    await expect(page.getByText('PMS Staff')).toBeVisible();

    // Check tab navigation
    await expect(page.getByText('Tasks')).toBeVisible();
    await expect(page.getByText('Rooms')).toBeVisible();
    await expect(page.getByText('Alerts')).toBeVisible();
  });

  test('should show task management', async ({ page }) => {
    await page.goto('/');

    // Check stats cards
    await expect(page.getByText('Pending Tasks')).toBeVisible();
    await expect(page.getByText('Completed Today')).toBeVisible();
    await expect(page.getByText('Urgent Items')).toBeVisible();

    // Check task list
    await expect(page.getByText('Fix AC Unit')).toBeVisible();
    await expect(page.getByText('Room Cleaning')).toBeVisible();
  });

  test('should handle task status updates', async ({ page }) => {
    await page.goto('/');

    // Click start task button
    await page.getByRole('button', { name: 'Start Task' }).first().click();

    // Should show success message
    await expect(page.getByText('marked as in progress')).toBeVisible();
  });

  test('should navigate between tabs', async ({ page }) => {
    await page.goto('/');

    // Click rooms tab
    await page.getByText('Rooms').click();

    // Should show room status
    await expect(page.getByText('Room 304')).toBeVisible();

    // Click alerts tab
    await page.getByText('Alerts').click();

    // Should show notifications
    await expect(page.getByText('Guest Complaint')).toBeVisible();
  });

  test('should show quick actions', async ({ page }) => {
    await page.goto('/');

    // Check quick actions are present
    await expect(page.getByText('Quick Actions')).toBeVisible();
    await expect(page.getByText('Scan QR')).toBeVisible();
    await expect(page.getByText('Photo')).toBeVisible();
    await expect(page.getByText('Call Manager')).toBeVisible();
  });
});

test.describe('Mobile Interactions', () => {
  test('should handle quick actions', async ({ page }) => {
    await page.goto('/');

    // Test QR scanner
    await page.getByText('Scan QR').click();
    await expect(page.getByText('QR Scanner opened')).toBeVisible();

    // Test photo capture
    await page.getByText('Photo').click();
    await expect(page.getByText('Camera opened')).toBeVisible();
  });

  test('should filter tasks', async ({ page }) => {
    await page.goto('/');

    // Click pending filter
    await page.getByText('Pending').click();

    // Should show filtered tasks
    const taskCards = page.locator('[data-testid="task-card"]');
    await expect(taskCards.first()).toBeVisible();
  });

  test('should show mobile sidebar', async ({ page }) => {
    await page.goto('/');

    // Open sidebar
    await page.locator('button[aria-label="Open menu"]').click();

    // Check sidebar content
    await expect(page.getByText('Staff Menu')).toBeVisible();
    await expect(page.getByText('My Profile')).toBeVisible();
    await expect(page.getByText('Settings')).toBeVisible();
  });
});