import { setupTest, get, createPage } from '@nuxt/test-utils';

describe('router module', () => {
  setupTest({
    server: true,
    browser: true,
  });

  it('should working in server', async () => {
    const { body } = await get('/home');
    expect(body).toContain('<h1>Hello world</h1>');
  });

  it('should working in client', async () => {
    const page = await createPage('/home');
    const html = await page.innerHTML('body');
    expect(html).toContain('<h1>Hello world</h1>');
  });

  it('should working with custom router configs', async () => {
    const { body } = await get('/home');
    expect(body).toContain('class="custom-exact-active custom-active"');
  });
});
