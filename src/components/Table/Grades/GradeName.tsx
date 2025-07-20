import useDebounce from "@/hooks/useDebounce";
import type { Grade } from "@/store/grade";
import { actions } from "astro:actions";
import type { FunctionalComponent } from "preact";
import { useEffect, useState } from "preact/hooks";

const GradeName: FunctionalComponent<Grade> = ({ id, name }) => {
  const [gradeName, setGradeName] = useState<string>(name);
  const newName = useDebounce(gradeName, 1000);

  useEffect(() => {
    const changeName = async () => {
      const { error } = await actions.grade.changeName({
        id,
        name: newName,
      });

      if (error) {
        console.log({ error });
      }
    };

    if (newName !== name) {
      changeName();
    }
  }, [newName]);

  return (
    <th
      key={id}
      className="py-4 text-center text-xs font-medium text-gray-500 uppercase tracking-wider min-w-[120px] border-r border-gray-300"
    >
      <input
        type="text"
        onInput={(e) => setGradeName(e.currentTarget.value)}
        className="bg-transparent border-none outline-none text-center font-sm text-gray-500 uppercase tracking-wider text-xs w-full"
        autocomplete="off"
        value={gradeName}
        minlength={3}
        maxlength={15}
      />
    </th>
  );
};
export default GradeName;
