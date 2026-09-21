export interface IResult<T, E> {
	isOk(): boolean;
	isErr(): boolean;
	unwrap(): T;
	unwrapErr(): E;
}
