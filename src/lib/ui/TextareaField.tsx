import React, { FC } from 'react';

interface InputProps {
	name?: string
	className?: string
	placeholder?: string
	requiredField?: boolean
	value: string
	onChange: (value: string) => void
}

const TextareaField: FC<InputProps> = ({ className, name, placeholder, requiredField, value, onChange }) => {
	return (
		<textarea
			name={name}
			className={className}
			placeholder={placeholder}
			value={value}
			onChange={(e) => onChange(e as any)}
			required={requiredField}
		/>
	);
};

export default TextareaField;