const InputArea = ({ label, holder, name, type }) => {
  return (
    <div>
      <label className="mb-2 text-sm font-medium" htmlFor={name}>
        {label}
      </label>
      <input
        id={name}
        placeholder={holder}
        name={name}
        className="w-full bg-gray-700 my-2 border border-gray-600 placeholder-gray-400 p-2.5 block rounded-lg focus:ring ring-blue-500"
        type={type}
        required
      />
    </div>
  );
};

export default InputArea;
