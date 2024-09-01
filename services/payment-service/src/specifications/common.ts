// Specification interface
export interface Specification<T> {
    isSatisfiedBy(item: T): boolean;
}

export interface ISpecification {
    isSatisfiedBy(candidate: unknown): boolean;
    and(other: ISpecification): ISpecification;
    andNot(other: ISpecification): ISpecification;
    or(other: ISpecification): ISpecification;
    orNot(other: ISpecification): ISpecification;
    not(): ISpecification;
  }
  

export default Specification;