import React, { FC } from 'react';

interface InputProps {
	name?: string,
	className?: string
	type: string
	placeholder?: string
	requiredField?: boolean
	value: string
	onChange: (value: string) => void
}

const InputField: FC<InputProps> = ({ className, type, name, placeholder, requiredField, value, onChange }) => {

	return (
		<input
			name={name}
			className={className}
			type={type}
			placeholder={placeholder}
			value={value}
			onChange={(e) => onChange(e as any)}
			required={requiredField}
		/>
	);
};

export default InputField;