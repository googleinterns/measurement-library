/*
 * TODO: Replace this test file with real tests
 */
describe('Test that the tests are running', () => {
  let three;
  beforeEach(() => {
    three = 3;
  });

  it('should expect 3 to be close to 3.01', () => {
    expect(three).toBeCloseTo(3.01, 1);
  });

  it('should not expect [1,2,3] to contain 4', () => {
    expect([1,2,3]).not.toContain(4);
  });

})
