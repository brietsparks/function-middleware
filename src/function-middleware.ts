// todo: Context should be a generic
// todo: middleware callback as a sync or async funcion
export type Context = any;
export type Handler<T> = (ctx: Context) => Promise<T>;
export type Middleware = <T = unknown>(ctx: Context, handler: Handler<T>) => Promise<T>;

export const compose = <T>(...middlewares: Middleware[]): Middleware => {
  return async function compositeMiddleware<U>(ctx: Context, handler: any) { // todo: replace `any`
    let index = -1;

    async function executeNext(): Promise<T> {
      index++;

      if (index === middlewares.length) {
        return await handler(ctx) as T;
      }

      const currentMiddleware = middlewares[index];

      return await currentMiddleware(ctx, executeNext) as T;
    }

    return await executeNext() as U;
  };
}
