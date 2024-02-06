import React from "react";

/**
 * Renders a panel header with a title, optional close button, and child content.
 *
 * @param title - The title to display in the header
 * @param children - Child content to display under the title
 * @param onClick - Callback when the close button is clicked
 */
export function PanelHeader({
  title,
  children,
  onClick,
}: {
  readonly title: string;
  readonly children: React.ReactNode;
  readonly onClick: () => void;
}) {
  return (
    <header className="space-y-1 py-6 px-4 bg-indigo-700">
      <div className="flex items-center justify-between">
        <h2 className="text-lg leading-7 font-medium text-white">{title}</h2>
        {/* <span dangerouslySetInnerHTML={{ __html: buttonTemplate }} /> */}
        <button
          type="button"
          aria-label="Close panel"
          className="text-indigo-200 hover:text-white"
          onClick={onClick}
        >
          <svg
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M6 18L18 6M6 6l12 12"
            ></path>
          </svg>
        </button>
      </div>
      <div>
        <p className="text-sm leading-5 text-indigo-300 ">{children}</p>
      </div>
    </header>
  );
}
