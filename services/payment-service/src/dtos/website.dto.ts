// Website model
export class Website {
    constructor(public name: string, public category: string, public isSecure: boolean) { }
}

// Example websites
export const websites: Website[] = [
    new Website('LinkedIn', 'Social Media', true),
    new Website('Wikipedia', 'Encyclopedia', true),
    new Website('YouTube', 'Video', true),
    new Website('Example.com', 'Example', false),
];

// const secureWebsites = websites.filter((website) => new SecureWebsiteSpecification().isSatisfiedBy(website));

// const socialMediaWebsites = websites.filter((website) => new CategoryWebsiteSpecification('Social Media').isSatisfiedBy(website));

