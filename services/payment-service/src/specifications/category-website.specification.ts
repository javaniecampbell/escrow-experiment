import { Website } from "../dtos/website.dto";
import Specification from "./common";

class CategoryWebsiteSpecification extends Specification<Website> {
    constructor(private category: string) {
        super();
    }

    isSatisfiedBy(website: Website): boolean {
        return website.category === this.category;
    }
}

export default CategoryWebsiteSpecification;