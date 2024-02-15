import * as React from "react";

export default function MaintenanceModal() {
  return (
    <>
      <div
        id="popup-modal"
        tabIndex={-1}
        className="fixed inset-x-0 mx-auto z-50 p-4 overflow-x-hidden overflow-y-auto md:inset-0 h-modal md:h-full"
      >
        <div className="relative flex items-center justify-center w-full h-full">
          <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
            <div className="p-6 text-center">
              <svg
                aria-hidden="true"
                className="mx-auto mb-4 text-gray-400 w-14 h-14 dark:text-gray-200"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                ></path>
              </svg>
              <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
                This site is in maintenance mode
              </h3>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
