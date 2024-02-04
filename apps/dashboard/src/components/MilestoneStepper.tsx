import React from "react";
import { CheckIcon } from "@heroicons/react/20/solid";
import { classNames } from "@/lib/utils";

export const steps = [
  { name: "Project Start", href: "#", status: "complete", dueOn: 'Dec 23, 20' },
  { name: "Milestone 2", href: "#", status: "complete", dueOn: 'Dec 23, 20' },
  { name: "Milestone 3", href: "#", status: "current", dueOn: 'Dec 23, 20' },
  { name: "Milestone 4", href: "#", status: "upcoming", dueOn: 'Dec 23, 20' },
  { name: "Milestone 5", href: "#", status: "upcoming", dueOn: 'Dec 23, 20' },
];
export function MilestoneStepper() {
  return (
    <nav aria-label="Progress" className="w-full">
      <ol role="list" className="flex items-center relative ">
        {steps.map((step, stepIdx) => (
          <li
            key={step.name}
            className={classNames(
              stepIdx !== steps.length - 1 ? "pr-9 sm:pr-20" : "",
              "relative"
            )}
          >
            {step.status === "complete" ? (
              <>
                {stepIdx !== steps.length - 1 ? (
                  <div
                    className="absolute inset-0 flex items-center"
                    aria-hidden="true"
                  >
                    <div className="h-0.5 w-full bg-secondary" />
                  </div>
                ) : null}
                <a href="#" className="group relative flex items-center">
                  <span className="flex h-8 items-center">
                    <span className="relative z-10 flex h-8 w-8 items-center justify-center rounded-full bg-primary group-hover:bg-secondary/90">
                      <CheckIcon
                        className="h-5 w-5 text-secondary group-hover:text-primary"
                        aria-hidden="true"
                      />
                    </span>
                  </span>
                  <span className="relative -left-[50%] -right-[50%] top-9 items-center flex min-w-0 flex-col">
                    <span className="text-sm font-medium">{step.name}</span>
                    <span className="text-sm text-gray-500">{step.name}</span>
                  </span>
                </a>
              </>
            ) : step.status === "current" ? (
              <>
                {stepIdx !== steps.length - 1 ? (
                  <div
                    className="absolute inset-0 flex items-center"
                    aria-hidden="true"
                  >
                    <div className="h-0.5 w-full bg-gray-200" />
                  </div>
                ) : null}
                <a
                  href="#"
                  className="group relative flex items-center"
                  aria-current="step"
                >
                  <span className="flex h-8 items-center">
                    <span className="relative flex h-8 w-8 items-center justify-center rounded-full border-2 border-secondary bg-white">
                      <span
                        className="h-2.5 w-2.5 rounded-full bg-secondary"
                        aria-hidden="true"
                      />
                    </span>
                  </span>
                  <span className="relative -left-[50%] -right-[50%] top-9 items-center flex min-w-0 flex-col">
                    <span className="text-sm font-medium">{step.name}</span>
                    <span className="text-sm text-gray-500">
                      {step.status ?? step.dueOn}
                    </span>
                  </span>
                </a>
              </>
            ) : (
              <>
                {stepIdx !== steps.length - 1 ? (
                  <div
                    className="absolute inset-0 flex items-center"
                    aria-hidden="true"
                  >
                    <div className="h-0.5 w-full bg-gray-200" />
                  </div>
                ) : null}
                <a href="#" className="relative group flex items-center">
                  <span className="h-8 flex items-center">
                    <span className="group relative flex h-8 w-8 items-center justify-center rounded-full border-2 border-gray-300 bg-white hover:border-gray-400">
                      <span
                        className="h-2.5 w-2.5 rounded-full bg-transparent group-hover:bg-gray-300"
                        aria-hidden="true"
                      />
                    </span>
                  </span>
                  <span className="relative -left-[50%] right-[50%] top-9 items-center flex min-w-0 flex-col">
                    <span className="text-sm font-medium">{step.name}</span>
                    <span className="text-sm text-gray-500">{step.name}</span>
                  </span>
                </a>
              </>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}
