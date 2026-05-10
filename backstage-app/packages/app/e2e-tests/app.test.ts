/*
 * Copyright 2020 The Backstage Authors
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import { test, expect } from '@playwright/test';

const aiRoutes = [
  {
    path: '/',
    navName: 'AI Backstage',
    expectedText:
      'One place to navigate models, communities, skills, repositories, and AI agents.',
  },
  {
    path: '/models',
    navName: 'AI Models',
    expectedText: 'Operational model matrix',
  },
  {
    path: '/skills',
    navName: 'AI Skills',
    expectedText: 'Internal skills',
  },
  {
    path: '/communities',
    navName: 'AI Communities',
    expectedText: 'AI communities and loops',
  },
  {
    path: '/agents',
    navName: 'AI Agents',
    expectedText: 'Managed agent assets',
  },
  {
    path: '/foundations',
    navName: 'AI Foundations',
    expectedText: 'Diagram support remains first-class',
  },
  {
    path: '/docs',
    navName: 'AI Docs',
    expectedText: 'Documentation sources',
  },
  {
    path: '/platform',
    navName: 'Backstage Platform',
    expectedText: 'What teams can do in this platform',
  },
  {
    path: '/showcase',
    navName: 'AI Showcase',
    expectedText: 'Design token map',
  },
] as const;

const assertNoVisibleErrors = async (page: import('@playwright/test').Page) => {
  const visibleErrorText = [
    'No data available',
    'AI Backstage data request failed',
    'PlantUML could not be rendered',
    'The diagram could not be rendered',
    'Page not found',
    'Unhandled Runtime Error',
  ];

  for (const text of visibleErrorText) {
    await expect(
      page.getByText(text, { exact: false }).first(),
    ).not.toBeVisible();
  }

  await expect(
    page
      .locator('[role="alert"], [class*="Error"], .MuiAlert-standardError')
      .filter({ hasText: /error|failed|could not/i }),
  ).toHaveCount(0);
};

test('Backstage shell renders the AI Backstage home route', async ({
  page,
}) => {
  await page.goto('/');
  await page.waitForLoadState('networkidle');

  const nav = page.getByRole('navigation');
  await expect(nav.getByRole('link', { name: 'Catalog' })).toBeVisible({
    timeout: 15000,
  });
  await expect(
    page.getByText(
      'One place to navigate models, communities, skills, repositories, and AI agents.',
    ),
  ).toBeVisible();
  await assertNoVisibleErrors(page);
});

test('AI Backstage sidebar navigates every product page without visible errors', async ({
  page,
}) => {
  const clientErrors: string[] = [];
  page.on('pageerror', error => clientErrors.push(error.message));

  await page.goto('/');
  await page.waitForLoadState('networkidle');

  for (const route of aiRoutes) {
    const link = page.getByRole('link', {
      name: route.navName,
      exact: true,
    });
    await expect(link).toBeVisible({ timeout: 15000 });
    await link.click();
    await page.waitForLoadState('networkidle');
    await expect(page).toHaveURL(
      new RegExp(`${route.path === '/' ? '/$' : `${route.path}$`}`),
    );
    await expect(
      page.getByText(route.expectedText, { exact: true }),
    ).toBeVisible({ timeout: 15000 });
    await assertNoVisibleErrors(page);
  }

  expect(clientErrors).toEqual([]);
});
