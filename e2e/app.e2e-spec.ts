import { FreegroceriesPage } from './app.po';

describe('freegroceries App', function() {
  let page: FreegroceriesPage;

  beforeEach(() => {
    page = new FreegroceriesPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
