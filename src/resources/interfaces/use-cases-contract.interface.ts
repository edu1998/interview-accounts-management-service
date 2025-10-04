export interface UseCases<T> {
  execute(...arg): T;
}
