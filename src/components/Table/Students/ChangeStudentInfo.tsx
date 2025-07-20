import type { FunctionalComponent, RefObject } from "preact";
import type { StudentProps } from "./Student";
import TelephoneInput from "./TelephoneInput";
import { useLayoutEffect, useState, type TargetedEvent } from "preact/compat";
import { fetchStudentParentPhone } from "@/utils/fetchStudent";
import { actions } from "astro:actions";
import { updateStudentName } from "@/store/student";

type ChangeStudentProps = StudentProps & {
  dialogRef: RefObject<HTMLDialogElement>;
  index: number;
};

const ChangeStudentInfo: FunctionalComponent<ChangeStudentProps> = ({
  id,
  index,
  name,
  dialogRef,
}) => {
  const [msg, setMsg] = useState<string>("");
  const [isMsgError, setIsMsgError] = useState<boolean>(false);
  const [parentPhone, setParentPhone] = useState<string>("");

  useLayoutEffect(() => {
    const getParentPhone = async () => {
      const { data, error } = await fetchStudentParentPhone(id);

      if (error) {
        setMsg(error.message);
        setIsMsgError(true);
        return;
      }

      setParentPhone(data.parent_phone);
    };

    dialogRef.current!.onclose = () => {
      setMsg("");
    };

    getParentPhone();
  }, []);

  const handleSubmit = async (e: TargetedEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);

    if (name !== formData.get("name")) {
      const newName = formData.get("name")!.toString();

      const { error } = await actions.student.changeName({
        id,
        name: newName,
      });

      if (error) {
        setMsg(error.message);
        setIsMsgError(true);
        return;
      }

      updateStudentName(index, newName);
      setMsg("La información del estudiante ha sido cambiada correctamente.");
    }

    if (parentPhone !== formData.get("parent_phone")) {
      console.log("Cambiando número");
      const newParentPhone = formData.get("parent_phone")!.toString();

      const { error } = await actions.student.changeParentPhone({
        id,
        parent_phone: newParentPhone,
      });

      if (error) {
        setMsg(error.message);
        setIsMsgError(true);
        return;
      }

      setMsg("La información del estudiante ha sido cambiada correctamente.");
    }
  };

  return (
    <form
      method="dialog"
      id="add-student-form"
      class="flex flex-col gap-3"
      onSubmit={handleSubmit}
      aria-describedby="form-message"
    >
      <figure className="relative">
        <p className="flex gap-3 text-lg items-center text-blue-500">
          <svg
            aria-hidden="true"
            class="starlight-aside__icon astro-lq7oo3uf"
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="currentColor"
            style="--sl-icon-size: 1em;"
          >
            <path d="M12 11a1 1 0 0 0-1 1v4a1 1 0 0 0 2 0v-4a1 1 0 0 0-1-1Zm.38-3.92a1 1 0 0 0-.76 0 1 1 0 0 0-.33.21 1.15 1.15 0 0 0-.21.33 1 1 0 0 0 .21 1.09c.097.088.209.16.33.21A1 1 0 0 0 13 8a1.05 1.05 0 0 0-.29-.71 1 1 0 0 0-.33-.21ZM12 2a10 10 0 1 0 0 20 10 10 0 0 0 0-20Zm0 18a8 8 0 1 1 0-16.001A8 8 0 0 1 12 20Z"></path>
          </svg>
          Recuerda
        </p>

        <p className="text-gray-700 mb-4">
          Puedes editar el nombre y número del acudiente de este estudiante.
        </p>
      </figure>

      <label for="name" class="block text-sm font-medium text-gray-700">
        Nombre del Estudiante
      </label>

      <input
        type="text"
        name="name"
        placeholder={name}
        value={name}
        required
        minlength={4}
        maxlength={30}
        class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
      />

      <label for="parent_phone" class="block text-sm font-medium text-gray-700">
        Teléfono del Acudiente
      </label>

      <TelephoneInput parentPhone={parentPhone} />

      <input type="hidden" value={id} name="id" />

      <p
        id="form-student-message"
        data-failed={isMsgError}
        class="text-center font-medium text-blue-600 data-[failed=true]:text-rose-600"
      >
        {msg}
      </p>

      <div className="flex items-center gap-3">
        <button
          type="button"
          onClick={() => {
            dialogRef.current?.close();
          }}
          className="mt-4 px-4 py-2 text-sm w-full font-medium text-white bg-gray-500 rounded-md transition-colors duration-300 hover:bg-gray-600 cursor-pointer"
        >
          Cancelar
        </button>
        <button
          class="mt-4 px-4 py-2 text-sm w-full font-medium text-white bg-blue-500 transition-colors duration-300 rounded-md hover:bg-blue-600 cursor-pointer"
          type="submit"
        >
          Actualizar Estudiante
        </button>
      </div>
    </form>
  );
};

export default ChangeStudentInfo;
