import { test, expect } from '@playwright/test'

test('can play pong game online', async ({ browser }) => {
  // host
  const hostContext = await browser.newContext()
  const hostPage = await hostContext.newPage()
  await hostPage.goto('http://localhost:3000/')
  await expect(hostPage.getByText('PONG')).toBeVisible()
  await hostPage.getByRole('button', { name: '🏓 PLAY 🏓' }).click()
  await expect(hostPage.getByText(/Waiting for player 2/i)).toBeVisible()
  const invitationLink = await hostPage.getByText('http://localhost:3000/?game=').innerText()

  // guest
  const guestContext = await browser.newContext()
  const guestPage = await guestContext.newPage()
  await guestPage.goto(invitationLink)
  await expect(guestPage.getByText('PONG')).toBeVisible()
  await expect(guestPage.getByText(/You are Player 2/)).toBeVisible()
  await guestPage.getByRole('button', { name: /JOIN/ }).click()
  await expect(guestPage.getByText(/loading/)).toBeVisible()

  // game starts
  await expect(hostPage.locator('#defaultCanvas0')).toBeVisible();
  await expect(guestPage.locator('#defaultCanvas0')).toBeVisible();
})
