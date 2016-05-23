export class MedymologyPage {
  navigateTo() {
    return browser.get('/');
  }

  getParagraphText() {
    return element(by.css('medymology-app h1')).getText();
  }
}
