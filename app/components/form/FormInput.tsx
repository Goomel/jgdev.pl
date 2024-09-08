import React from 'react';
import cn from 'classnames';
import { FormFieldProps } from '@/app/lib/types';
import FormErrorMessage from './FormErrorMessage';

const FormInput = ({ type, placeholder, name, register, error }: FormFieldProps) => {
  return (
    <div className="flex flex-col gap-2">
      <input
        autoComplete="off"
        type={type}
        placeholder={placeholder}
        {...register(name)}
        className={cn(
          error ? 'border-red-500' : 'border-black-300',
          'rounded border bg-black-400 px-1 py-2 text-gray-100 focus:outline-0 lg:p-3',
        )}
      />
      {error && <FormErrorMessage>{error.message}</FormErrorMessage>}
    </div>
  );
};

export default FormInput;