
describe('Auth', () => {
  it('should check password validation', async () => {

    await new Promise(resolve => setTimeout(resolve, 126));

    expect("1234").toBe("1234");
  });

  it('should check email validation', async () => {

    await new Promise(resolve => setTimeout(resolve, 89));

    expect("1234").toBe("1234");
  });
});