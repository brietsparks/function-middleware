import { compose, Middleware } from '../src/function-middleware';

// todo: better tests

const middleware1: Middleware = async (ctx, next) => {
  console.log('Middleware 1 Before');
  const result = await next(ctx);
  console.log('Middleware 1 After');
  return result;
};

const middleware2: Middleware = async (ctx, next) => {
  console.log('Middleware 2 Before');
  const result = await next(ctx);
  console.log('Middleware 2 After');
  return result;
};

describe('compose', () => {
  test('basic usage', async () => {
    const s = createSomething();
    const ctx = {
      token: 'mock-token '
    };
    const result = await compose(middleware1, middleware2)(ctx, async () => {
      return {
        id: 'mock-id',
      };
    });

    expect(result).toEqual({ id: 'mock-id' });
  });
});

function createSomething() {
  expect(1).toEqual(1);
  return {ok: 1}
}
