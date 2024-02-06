import React, { Fragment } from "react";
import { Transition } from "@headlessui/react";
import { Button } from "../formfields";
import { PanelHeader } from "./PanelHeader";
import { classNames } from "../../helpers";

/**
 * Panel Component - This is the component that is used to create a side drawer panel
 * @param {string} title This is the title of the panel
 * @param {string} description This is the description of the panel
 * @param {boolean} isOpen This is the state of the panel
 * @param {Event} onClose This is the function to close the panel
 * @param {Event} onCancel This is the function to cancel the panel
 * @param {Event} onContinue This is the function to continue the panel
 * @param {string} width This is the classes for the width of the panel
 * @param {string} targetForm This is the target form of the panel
 * @param {string} continueButtonLabel This is the label of the continue button
 * @returns {JSX.Element} This is the panel component containing the header, body and footer
 */
const Panel = ({
  title,
  description,
  isOpen,
  onClose,
  onCancel,
  onContinue,
  children,
  width,
  targetForm,
  continueButtonLabel
}: {
  title: string;
  description: string;
  isOpen: boolean;
  onClose: () => void;
  onCancel: () => void;
  onContinue: () => void;
  children: React.ReactNode;
  width?: string;
  targetForm?: string;
  continueButtonLabel?: string;
}) => {

  return (
    <Transition show={isOpen} as={Fragment}>
      <div className="relative z-40">
        <div
          className="fixed inset-0 overflow-auto "
          aria-labelledby="slide-over-title"
          role="dialog"
          aria-modal="true"
        >
          {/* Panel */}
          <section className={`absolute inset-0`}>
            <Transition.Child
              as={Fragment}
              enter="transition ease-in-out duration-500 transform"
              enterFrom="translate-x-full"
              enterTo="translate-x-0"
              leave="transition ease-out duration-500 transform"
              leaveFrom="translate-x-0"
              leaveTo="translate-x-full"
            >
              <div className="max-x-full fixed inset-y-0 right-0 flex pl-10">
                <div
                  className={classNames(
                    width !== undefined ? width : `max-w-xs`,
                    `flex h-full flex-col bg-white shadow-xl`
                  )}
                >
                  {/* Sidebar Panel Header */}
                  <div className="h-0 flex-1 overflow-y-auto">
                    <PanelHeader onClick={onClose} title={title ?? ""}>
                      {description ?? ""}
                    </PanelHeader>
                    {/* End Sidebar Panel Header */}
                    <div className="relative flex flex-1 flex-col justify-between">
                      <div className="divide-y divide-gray-200">
                        {/* Form Content */}
                        <div className="divide-y divide-gray-200 px-4">
                          <div className="space-y-6 pt-6 pb-5">{children}</div>
                          {/* Footer */}
                          <div className="space-y-4 pt-4 pb-6">
                            <div className="flex text-sm leading-5">
                              <a
                                href="#/"
                                className="inline-flex items-center space-x-2 font-medium text-indigo-600"
                              >
                                <svg
                                  className="h-5 w-5 text-indigo-500"
                                  fill="none"
                                  viewBox="0 0 24 24"
                                  stroke="currentColor"
                                >
                                  <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1"
                                  ></path>
                                </svg>
                                <span>Copy link</span>
                              </a>
                            </div>
                            <div className="flex text-sm leading-5">
                              <a
                                href="#/"
                                className="inline-flex items-center space-x-2 text-gray-500"
                              >
                                <svg
                                  className="h-5 w-5 text-gray-400"
                                  fill="none"
                                  viewBox="0 0 24 24"
                                  stroke="currentColor"
                                >
                                  <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                                  ></path>
                                </svg>
                                <span>Learn more about sharing</span>
                              </a>
                            </div>
                          </div>
                          {/* End Footer */}
                        </div>
                        {/* End Form Content */}
                      </div>
                    </div>
                  </div>
                  <div className="flex flex-shrink-0 justify-end space-x-4 px-4 py-4">
                    <Button type="button" onClick={onCancel}>
                      Cancel
                    </Button>
                    <Button
                      primary
                      type="submit"
                      form={targetForm}
                      onClick={onContinue}
                    >
                      {continueButtonLabel ?? "Continue"}
                    </Button>
                  </div>
                </div>
              </div>
            </Transition.Child>
          </section>
        </div>
      </div>
    </Transition>
  );
};

export default Panel;
