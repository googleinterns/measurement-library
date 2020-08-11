describe('Test that the integration tests are running', () => {
  it(`creates a global setupMeasure function`, () => {
    expect(window.setupMeasure).toBeInstanceOf(Function);
  });

  it(`creates a global dataLayer array`, () => {
    expect(window.dataLayer).toBeInstanceOf(Array);
  });
});
