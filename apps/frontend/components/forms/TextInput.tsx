import { Field } from 'formik';
import React from 'react';

interface TextInputProps {
  name: string;
  label: string;
  type?: string;
  placeholder?: string;
  labelClassName?: string;
  hideErrorPlaceholder?: boolean;
  error?: string;
}

const TextInput = ({
  name,
  type = 'text',
  label,
  placeholder = '',
  labelClassName = '',
  hideErrorPlaceholder = false,
  error,
  ...rest
}: TextInputProps & React.HTMLProps<HTMLInputElement>) => {
  return (
    <>
      <label
        className={`block text-gray-700 text-sm font-normal mb-2 ${labelClassName}`}
        htmlFor={name}
      >
        {label}
      </label>
      <Field
        className={`${
          !hideErrorPlaceholder && error ? 'border-error' : ''
        } bg-field-background transition-colors duration-150 appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-1 leading-tight focus:outline-none focus:shadow-outline focus:border-primary`}
        type={type}
        placeholder={placeholder}
        name={name}
        required
        autoComplete={rest.autoComplete}
        {...rest}
      />
      {!hideErrorPlaceholder && <p className="mb-3 text-error text-sm h-3">{error}</p>}
    </>
  );
};

export default TextInput;
