type SelectFieldProps = {
  label: string;
  name: string;
  options: { value: string; label: string }[];
  register: any; // You can replace 'any' with the correct type from react-hook-form if desired
};

const SelectField = ({ label, name, options, register }: SelectFieldProps) => (
  <div className="mb-4">
    <label className="block text-sm font-semibold text-gray-700 mb-2">
      {label}
    </label>
    <select {...register(name)} className="w-full p-2 border rounded">
      {options.map((option) => (
        <option key={option.value} value={option.value}>
          {option.label}
        </option>
      ))}
    </select>
  </div>
);

export default SelectField;
