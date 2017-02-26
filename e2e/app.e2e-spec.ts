import { NgNagiosWallboardPage } from './app.po';

describe('ng-nagios-wallboard App', () => {
  let page: NgNagiosWallboardPage;

  beforeEach(() => {
    page = new NgNagiosWallboardPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
