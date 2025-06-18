type InputFieldProps = {
  label: string;
  name: string;
  type?: string;
  register: any; // You can replace 'any' with the correct type from react-hook-form if desired
  placeholder?: string;
};

const InputField = ({
  label,
  name,
  type = "text",
  register,
  placeholder,
}: InputFieldProps) => {
  return (
    <div className="mb-4">
      <label className="block text-sm font-semibold text-gray-700">
        {label}
      </label>
      <input
        type={type}
        {...register(name, { required: true })}
        className=" p-2 border w-full rounded-md focus:outline-none focus:ring focus:border-blue-300"
        placeholder={placeholder}
      />
    </div>
  );
};

export default InputField;
