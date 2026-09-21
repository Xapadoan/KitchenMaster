import type { IResult } from "../interfaces/result.interface";

export class Result<T, E> implements IResult<T, E> {
	protected constructor(
		private readonly params: { ok?: T; err?: E },
		private readonly _isOk: boolean,
	) {}

	static ok<T>(value: T): Result<T, never> {
		return new Result({ ok: value }, true);
	}

	static err<E>(error: E): Result<never, E> {
		return new Result({ err: error }, false);
	}

	isOk(): boolean {
		return this._isOk;
	}

	isErr(): boolean {
		return !this._isOk;
	}

	unwrap(): T {
		if (!this.params.ok) {
			throw new Error("An OkResult has no ok value");
		}
		return this.params.ok;
	}

	unwrapErr(): E {
		if (!this.params.err) {
			throw new Error("An OkResult has no ok value");
		}
		return this.params.err;
	}
}
