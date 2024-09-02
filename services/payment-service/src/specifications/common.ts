// Specification interface
export abstract class Specification<T> implements ISpecification<T> {
    abstract isSatisfiedBy(candidate: T): boolean | Promise<boolean>;

    and(other: Specification<T>): Specification<T> {
        return new AndSpecification(this, other);
    }

    andNot(other: Specification<T>): Specification<T> {
        return new AndNotSpecification(this, other);
    }

    or(other: Specification<T>): Specification<T> {
        return new OrSpecification(this, other);
    }

    orNot(other: Specification<T>): Specification<T> {
        return new OrNotSpecification(this, other);
    }

    not(): Specification<T> {
        return new NotSpecification(this);
    }
}
export interface ISpecification<T> {
    isSatisfiedBy(candidate: T): boolean | Promise<boolean>;
    and(other: ISpecification<T>): ISpecification<T>;
    andNot(other: ISpecification<T>): ISpecification<T>;
    or(other: ISpecification<T>): ISpecification<T>;
    orNot(other: ISpecification<T>): ISpecification<T>;
    not(): ISpecification<T>;
}

export abstract class CompositeSpecification<T> implements ISpecification<T> {
    abstract isSatisfiedBy(candidate: T): boolean | Promise<boolean>;

    and(other: ISpecification<T>): ISpecification<T> {
        return new AndSpecification(this, other);
    }

    andNot(other: ISpecification<T>): ISpecification<T> {
        return new AndNotSpecification(this, other);
    }

    or(other: ISpecification<T>): ISpecification<T> {
        return new OrSpecification(this, other);
    }

    orNot(other: ISpecification<T>): ISpecification<T> {
        return new OrNotSpecification(this, other);
    }

    not(): ISpecification<T> {
        return new NotSpecification(this);
    }

    abstract toExpression(): (candidate: T) => boolean | Promise<boolean>;
}

export class AndSpecification<T> extends CompositeSpecification<T> {
    constructor(private leftCondition: ISpecification<T>, private rightCondition: ISpecification<T>) {
        super();
    }

    isSatisfiedBy(candidate: T): boolean | Promise<boolean> {
        return this.leftCondition.isSatisfiedBy(candidate) && this.rightCondition.isSatisfiedBy(candidate);
    }

    toExpression(): (candidate: T) => boolean | Promise<boolean> {
        const leftExpression = (this.leftCondition as CompositeSpecification<T>).toExpression();
        const rightExpression = (this.rightCondition as CompositeSpecification<T>).toExpression();

        return (candidate: T) => leftExpression(candidate) && rightExpression(candidate);
    }
}

export class AndNotSpecification<T> extends CompositeSpecification<T> {
    constructor(private leftCondition: ISpecification<T>, private rightCondition: ISpecification<T>) {
        super();
    }

    isSatisfiedBy(candidate: T): boolean | Promise<boolean> {
        return this.leftCondition.isSatisfiedBy(candidate) && !this.rightCondition.isSatisfiedBy(candidate);
    }

    toExpression(): (candidate: T) => boolean | Promise<boolean> {
        const leftExpression = (this.leftCondition as CompositeSpecification<T>).toExpression();
        const rightExpression = (this.rightCondition as CompositeSpecification<T>).toExpression();

        return (candidate: T) => leftExpression(candidate) && !rightExpression(candidate);
    }
}

export class OrSpecification<T> extends CompositeSpecification<T> {
    constructor(private leftCondition: ISpecification<T>, private rightCondition: ISpecification<T>) {
        super();
    }

    isSatisfiedBy(candidate: T): boolean | Promise<boolean> {
        return this.leftCondition.isSatisfiedBy(candidate) || this.rightCondition.isSatisfiedBy(candidate);
    }

    toExpression(): (candidate: T) => boolean | Promise<boolean> {
        const leftExpression = (this.leftCondition as CompositeSpecification<T>).toExpression();
        const rightExpression = (this.rightCondition as CompositeSpecification<T>).toExpression();

        return (candidate: T) => leftExpression(candidate) || rightExpression(candidate);
    }
}

export class OrNotSpecification<T> extends CompositeSpecification<T> {
    constructor(private leftCondition: ISpecification<T>, private rightCondition: ISpecification<T>) {
        super();
    }

    isSatisfiedBy(candidate: T): boolean | Promise<boolean> {
        return this.leftCondition.isSatisfiedBy(candidate) || !this.rightCondition.isSatisfiedBy(candidate);
    }

    toExpression(): (candidate: T) => boolean | Promise<boolean> {
        const leftExpression = (this.leftCondition as CompositeSpecification<T>).toExpression();
        const rightExpression = (this.rightCondition as CompositeSpecification<T>).toExpression();

        return (candidate: T) => leftExpression(candidate) || !rightExpression(candidate);
    }
}

export class NotSpecification<T> extends CompositeSpecification<T> {
    constructor(private wrapped: ISpecification<T>) {
        super();
    }

    isSatisfiedBy(candidate: T): boolean | Promise<boolean> {
        return !this.wrapped.isSatisfiedBy(candidate);
    }

    toExpression(): (candidate: T) => boolean | Promise<boolean> {
        const wrappedExpression = (this.wrapped as CompositeSpecification<T>).toExpression();

        return (candidate: T) => !wrappedExpression(candidate);
    }
}


export default Specification;