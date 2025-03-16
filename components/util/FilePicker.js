export default function FilePicker({ label, name, type }) {
  return (
    <>
      <label
        htmlFor={name}
        className="mb-0.5 block text-sm uppercase text-form-label"
      >
        {label}
      </label>
      <input
        className="text-form-text bg-white border-tableBorder-dgray file:text-base file:text-form-text"
        multiple
        type={type}
        id={name}
        name={name}
      />
    </>
  );
}
