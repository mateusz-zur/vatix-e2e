import { expect, type Page } from '@playwright/test';

export class IncidentReportPage {
  constructor(private page: Page) {}

  public calendar = this.page.getByPlaceholder('DD/MM/YYYY hh:mm');
  public location = this.page.getByTestId('Location');
  public type = this.page.getByTestId('Type');
  public description = this.page.getByPlaceholder('Description');
  public personInvolved = this.page.getByPlaceholder('Name of person involved');
  public personCategory = this.page.getByTestId('Person category');
  public additionals = this.page.locator('xpath=//p[@data-placeholder="Add any additional notes, pictures or files"]');
  public addedComment = this.page.locator('#comment-created-by-logged-in-user');
  public submit = this.page.getByRole('button', { name: 'Submit' });

  async selectDateAndTime(day: number, hour: number, minute: number) {
    await this.calendar.click();
    await this.page.getByRole('gridcell', { name: day.toString(), exact: true }).click();
    await this.page.getByLabel(`${hour.toString()} hours`, { exact: true }).click();
    await this.page.getByLabel(`${minute.toString()} minutes`, { exact: true }).click();
  }

  async selectLocation(location: string) {
    await this.location.click();
    await this.page.getByRole('option', { name: location }).click();
  }

  async selectType(type: string) { 
    await this.type.click();
    await this.page.getByRole('option', { name: type }).click();
  }

  async fillDescription(desc: string) { 
    await this.description.fill(desc);
  }

  async fillPersonInvolved(name: string) { 
    await this.personInvolved.fill(name);
  }

  async selectPersonCategory(category: string) { 
    await this.personCategory.click();
    await this.page.getByRole('option', { name: category }).click();
  }

  async addComment(comment: string) {
    await this.additionals.fill(comment);
    await this.page.keyboard.press('Enter');
  }

  async assertComment(expectedComment: string) {
    await expect(this.addedComment).toContainText(expectedComment);
  }

  async attachFile(filePath: string, expectedFileName: string) {
    const fileChooserPromise = this.page.waitForEvent('filechooser');
    // TODO: Ugly selector below. It's required to add e.g. data-testid for that icon.
    await this.page.locator('svg:nth-last-of-type(2)').click();
    const fileChooser = await fileChooserPromise;
    await fileChooser.setFiles(filePath);
    await expect(this.page.locator('#activity-file-thumbnail-name')).toContainText(expectedFileName);
  }

  async sendForm() {
    await this.submit.click();
  }
  
}