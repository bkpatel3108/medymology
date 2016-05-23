import { MedymologyPage } from './app.po';

describe('medymology App', function() {
  let page: MedymologyPage;

  beforeEach(() => {
    page = new MedymologyPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('medymology works!');
  });
});
