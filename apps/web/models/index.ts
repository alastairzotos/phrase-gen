export type FetchStatus = 'fetching' | 'success' | 'failure';

export interface InjectedState<T> {
  getState: () => T;
}
