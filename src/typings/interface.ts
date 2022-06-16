/* eslint-disable @typescript-eslint/no-explicit-any */
export type ActionToPropsInput = {
  [index: string]: (...args: any) => any;
};

export type ActionToProps<T extends ActionToPropsInput> = {
  [K in keyof T]: (...args: Parameters<T[K]>) => ReturnType<ReturnType<T[K]>>;
};

export type ConnectProps<
  S extends (...arg: any) => { [key: string]: any },
  A extends { [key: string]: any },
> = ReturnType<S> & ActionToProps<A>;

export type SomeKeyOfObject<T> = {
  [key in keyof T]?: T[key];
};
