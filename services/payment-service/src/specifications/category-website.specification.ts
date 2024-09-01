import { Website } from "../dtos/website.dto";
import Specification from "./common";

class CategoryWebsiteSpecification implements Specification<Website> {
    constructor(private category: string) { }

    isSatisfiedBy(website: Website): boolean {
        return website.category === this.category;
    }
}

export default CategoryWebsiteSpecification;