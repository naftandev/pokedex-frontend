export interface IUseStoreParams<T, F> {
  store: (callback: (state: T) => unknown) => unknown
  callback: (state: T) => F
}
