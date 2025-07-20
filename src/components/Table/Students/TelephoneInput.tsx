import { type FunctionalComponent } from "preact";

type TelephoneInputProps = {
  parentPhone: string;
};

const TelephoneInput: FunctionalComponent<TelephoneInputProps> = ({
  parentPhone,
}) => {
  return (
    <input
      type="tel"
      name="parent_phone"
      value={parentPhone}
      placeholder={parentPhone}
      class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
    />
  );
};

export default TelephoneInput;
