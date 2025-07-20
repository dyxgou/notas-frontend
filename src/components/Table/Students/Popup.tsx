import { Fragment, type FunctionalComponent } from "preact";
import type { TargetedEvent } from "preact/compat";
import { useRef } from "preact/hooks";
import ChangeStudentInfo from "./ChangeStudentInfo";
import type { StudentProps } from "./Student";

const Popup: FunctionalComponent<StudentProps> = (student) => {
  const dialogRef = useRef<HTMLDialogElement>(null);

  const handleOpenDialog = (e: TargetedEvent<HTMLButtonElement>) => {
    e.preventDefault();

    if (dialogRef.current) {
      dialogRef.current.showModal();
    }
  };

  const handleCloseDialog = (e: TargetedEvent<HTMLButtonElement>) => {
    e.preventDefault();

    if (dialogRef.current) {
      dialogRef.current.close();
    }
  };

  return (
    <Fragment>
      <button
        className="p-2 text-black hover:text-blue-600 text-sm bg-white transition-colors duration-300 hover:bg-gray-100 font-bold rounded-lg cursor-pointer"
        onClick={handleOpenDialog}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1}
          stroke="currentColor"
          className="size-4"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M13.5 6H5.25A2.25 2.25 0 0 0 3 8.25v10.5A2.25 2.25 0 0 0 5.25 21h10.5A2.25 2.25 0 0 0 18 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25"
          />
        </svg>
      </button>

      <dialog
        className="m-auto bg-white rounded-xl p-6 w-full max-w-md"
        closedby="any"
        ref={dialogRef}
      >
        <div class="flex items-center justify-between mb-4">
          <h3 class="text-lg font-semibold text-gray-900">
            Información del Estudiante
          </h3>
          <button
            class="text-gray-400 hover:text-gray-600"
            id="close-add-student"
            onClick={handleCloseDialog}
          >
            <svg
              class="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M6 18L18 6M6 6l12 12"
              ></path>
            </svg>
          </button>
        </div>

        <ChangeStudentInfo {...student} dialogRef={dialogRef} />
      </dialog>
    </Fragment>
  );
};
export default Popup;
