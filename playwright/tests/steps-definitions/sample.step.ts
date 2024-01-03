import { Given, When, Then } from "@cucumber/cucumber";
import { ICustomWorld } from "./custom-world";
import { test, expect } from '@playwright/test';

Given("I am on the Google search page", async function (this: ICustomWorld) {
    await this.page?.goto("https://google.com");
});

When("I search for {string}", async function (this: ICustomWorld, text: string) {
    await this.page?.fill('input[name="q"]', text);
    await this.page?.press('input[name="q"]', "Enter");
});

Then("I should see {string} in the title", async function (this: ICustomWorld, text: string) {
    expect(await this.page?.title()).toContain(text);
});