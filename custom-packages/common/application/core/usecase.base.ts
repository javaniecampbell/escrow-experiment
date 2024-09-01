interface IUseCase<TInput, TResult> {
    execute(input: TInput): Promise<TResult>;
}

abstract class UseCase<TInput, TOutput> implements IUseCase<TInput, TOutput> {

    abstract execute(input: TInput): Promise<TOutput>
}

export { UseCase };
export type { IUseCase };