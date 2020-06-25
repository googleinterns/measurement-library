/*
 * TODO: Replace this test file with real tests
 */
describe('Test that the tests are running', function(){
  let three;
  beforeEach(function(){
    three = 3;
  });

  it('should expect 3 to be close to 3.01', function(){
    expect(three).toBeCloseTo(3.01, 1);
  });

  it('should not expect [1,2,3] to contain 4', function(){
    expect([1,2,3]).not.toContain(4);
  });

})
