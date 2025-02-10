export interface FormInputProps {
  type?: 'text' | 'email';
  label: string;
  id: string;
  name: string;
  placeholder?: string;
  value: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  twcss: string;
  error: string;
}

const FormInput: React.FC<FormInputProps> = ({
  type,
  label,
  id,
  name,
  placeholder,
  value,
  onChange,
  twcss,
  error,
}) => {
  return (
    <div className='flex flex-col gap-0.5'>
      <label htmlFor='name'>{label}</label>
      <input
        type={type || 'text'}
        id={id}
        name={name}
        placeholder={placeholder || ''}
        value={value}
        onChange={onChange}
        className={`border rounded-sm border-gray-500 p-0.5 ${twcss}`}
      />
      <div className='h-2.5'>
        {error && <p className='text-sm text-red-500'>{error}</p>}
      </div>
    </div>
  );
};

export default FormInput;
