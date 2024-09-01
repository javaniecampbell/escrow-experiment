import e from "express";
import { Website } from "../dtos/website.dto";
import Specification from "./common";

class SecureWebsiteSpecification implements Specification<Website> {
    isSatisfiedBy(website: Website): boolean {
        return website.isSecure;
    }
}

export default SecureWebsiteSpecification;