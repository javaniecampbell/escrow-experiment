import { classNames } from "@/lib/utils";
import { ExclamationCircleIcon } from "@heroicons/react/20/solid";
import Link from "next/link";
import React from "react";

function ServiceAgreementPage() {
  const hasError = () => {
    return false;
  };
  const errorMessage = () => {
    return "Error message";
  };
  return (
    <form
      className="flex flex-col space-y-6 container"
      action="http://localhost:3000/api/payments/create-checkout-session"
      method="POST"
    >
      <h2 className="text-2xl font-semibold mb-4">Service Agreement</h2>
      <div>
        <label
          htmlFor="name"
          className="block text-sm font-medium leading-6 text-gray-900"
        >
          Project Name
        </label>
        <div className="relative mt-2 rounded-md shadow-sm">
          <input
            type="name"
            name="name"
            id="name"
            required
            className={classNames(
              "block w-full rounded-md border-0 py-1.5 pl-2 pr-10",
              !hasError()
                ? "text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600"
                : "text-red-900 ring-1 ring-inset ring-red-300 placeholder:text-red-300 focus:ring-2 focus:ring-inset focus:ring-red-500",
              "sm:text-sm sm:leading-6"
            )}
            placeholder="Project name 1"
            defaultValue="ddd"
            aria-invalid="true"
            aria-describedby="name-error"
          />
          {hasError() ? (
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
              <ExclamationCircleIcon
                className="h-5 w-5 text-red-500"
                aria-hidden="true"
              />
            </div>
          ) : null}
        </div>
        {hasError() ? (
          <p className="mt-2 text-sm text-red-600" id="name-error">
            Not a valid project name.
          </p>
        ) : null}
      </div>
      <div>
        <label
          htmlFor="amount"
          className="block text-sm font-medium leading-6 text-gray-900"
        >
          Project Budget
        </label>
        <div className="relative mt-2 rounded-md shadow-sm">
          <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
            <span className="text-gray-500 sm:text-sm">$</span>
          </div>
          <input
            type="text"
            name="amount"
            id="amount"
            required
            className={classNames(
              "block w-full rounded-md border-0 py-1.5 pl-7 pr-20",
              !hasError()
                ? "text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600"
                : "text-red-900 ring-1 ring-inset ring-red-300 placeholder:text-red-300 focus:ring-2 focus:ring-inset focus:ring-red-500",
              "sm:text-sm sm:leading-6"
            )}
            placeholder="0.00"
            aria-invalid="true"
            aria-describedby="amount-error"
          />
          <div className="absolute inset-y-0 right-0 flex items-center">
            <label htmlFor="currency" className="sr-only">
              Currency
            </label>
            <select
              id="currency"
              name="currency"
              className="h-full rounded-md border-0 bg-transparent py-0 pl-2 pr-7 text-gray-500 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm"
            >
              <option>USD</option>
              <option>CAD</option>
              <option>EUR</option>
            </select>
          </div>
        </div>
        {hasError() ? (
          <p className="mt-2 text-sm text-red-600" id="amount-error">
            Not a valid amount.
          </p>
        ) : null}
      </div>
      <div className="relative flex items-start">
        <div className="flex h-6 items-center">
          <input
            id="toc"
            aria-describedby="toc-description"
            name="toc"
            required
            type="checkbox"
            className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"
          />
        </div>
        <div className="ml-3 text-sm leading-6">
          <label htmlFor="toc" className="font-medium text-gray-900">
            Terms &amp; Conditions
          </label>
          <p id="toc-description" className="text-gray-500">
            <span className="">I have accepted the following</span>{" "}
            <Link href="" className="text-blue-500">
              terms and conditions.
            </Link>
          </p>
        </div>
      </div>
      <button type="submit" className="bg-blue-500 text-white p-2">
        Proceed to Payment
      </button>
    </form>
  );
}

export default ServiceAgreementPage;
