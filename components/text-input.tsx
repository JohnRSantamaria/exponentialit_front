import { useField } from 'formik';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

interface TextInputProps {
	name: string;
	label: string;
	type?: string;
	placeholder?: string;
}

const TextInput = ({ label, ...props }: TextInputProps) => {
	const [field, meta] = useField(props.name);

	return (
		<div className='grid gap-3'>
			{label && <Label htmlFor={props.name}>{label}</Label>}
			<Input
				{...field}
				{...props}
				autoComplete='off'
			/>
			{meta.touched && meta.error ? <p className='text-sm text-red-500'>{meta.error}</p> : null}
		</div>
	);
};

export default TextInput;
