import { faker } from '@faker-js/faker';
import * as path from 'path';
import { test, expect } from '@playwright/test';
import { IncidentReportPage } from '../pages/incident-report-page';

test.beforeEach(async ({ page }) => {
  await page.goto('https://workspace.stage.vatix.com/publicSubmission/731ff348-c742-4f5a-8fee-58013ccaecfe/');
});

test('As a reporter, I can report an incident with all fields filled', async ({ page }) => {
  const incidentReportPage = new IncidentReportPage(page)
  const name = faker.person.fullName();
  const description = faker.lorem.lines({ min: 1, max: 3 });
  const comment = faker.string.alphanumeric({length: { min: 5, max: 15}});
  const testFileName = 'test1.png';
  
  await incidentReportPage.selectDateAndTime(1, 0, 0);
  await incidentReportPage.selectLocation('A2 Offices')
  await incidentReportPage.selectType('Environmental Event')
  await incidentReportPage.fillDescription(description);
  await incidentReportPage.fillPersonInvolved(name);
  await incidentReportPage.selectPersonCategory('Contractor')
  await incidentReportPage.addComment(comment);
  await incidentReportPage.assertComment(comment);
  await incidentReportPage.attachFile(path.join(__dirname, 'test-files', testFileName), testFileName);
  await incidentReportPage.sendForm();
  await expect(page.locator('//h1[text()="Incident reported successfully!"]')).toBeVisible();

  /*
  TODO:
  It's required to check if report was really created - basing on UI message it's not enough.
  It can be done via UI by using some admin panel with all reports or by GET request to API.
  */
});

