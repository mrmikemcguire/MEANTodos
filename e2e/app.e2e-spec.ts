import { MEANTodosPage } from './app.po';

describe('meantodos App', function() {
  let page: MEANTodosPage;

  beforeEach(() => {
    page = new MEANTodosPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
