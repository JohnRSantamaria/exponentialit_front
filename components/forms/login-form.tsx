'use client';

import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import Link from 'next/link';
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import TextInput from '../text-input';
import LoadingForm from '../loadings/auth-loading';
import { useUserStore } from '@/stores/auth/auth-store';
import { toast } from 'sonner';

const LoginForm = () => {
	const [isLoading, setIsLoading] = useState(false);
	const router = useRouter();

	const initialValues = {
		email: '',
		password: '',
	};

	const validationSchema = Yup.object({
		email: Yup.string().email('Correo inválido').required('El correo es obligatorio'),
		password: Yup.string().required('La contraseña es obligatoria').min(6, 'Mínimo 6 caracteres'),
	});

	const handleSubmit = async (values: typeof initialValues, { resetForm }: { resetForm: () => void }) => {
		setIsLoading(true);

		try {
			const res = await fetch('http://127.0.0.1:8000/auth/login/', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				credentials: 'include',
				body: JSON.stringify(values),
			});

			if (!res.ok) throw new Error('Error en login');

			const meRes = await fetch('http://127.0.0.1:8000/auth/me/', {
				credentials: 'include',
			});

			if (!meRes.ok) throw new Error('Error validando sesión');

			const data = await meRes.json();

			const setUserData = useUserStore.getState().setUserData;
			setUserData(data.user_id, data.accounts);
			toast.success('Inicio de sesión exitoso');
			router.push('/');
		} catch (error) {
			console.error('Error en login:', error);
			toast.error('Error al iniciar sesión. Verifica tus credenciales.');
			setIsLoading(false);
		} finally {
			resetForm();
		}
	};

	return (
		<Formik
			initialValues={initialValues}
			validationSchema={validationSchema}
			onSubmit={handleSubmit}
		>
			{() => (
				<Form>
					{isLoading ? (
						<LoadingForm />
					) : (
						<div className='flex flex-col gap-6'>
							<TextInput
								name='email'
								type='email'
								label='Email'
								placeholder='m@example.com'
							/>

							<div className='grid gap-3'>
								<div className='flex items-center'>
									<Label htmlFor='password'>Password</Label>
									<Link
										href='/forgot-password'
										className='ml-auto inline-block text-sm underline-offset-4 hover:underline'
									>
										Forgot your password?
									</Link>
								</div>
								<TextInput
									name='password'
									type='password'
									label=''
								/>
							</div>

							<div className='flex flex-col gap-3'>
								<Button
									type='submit'
									className='w-full'
									disabled={isLoading}
								>
									Login
								</Button>
							</div>
						</div>
					)}

					<div className='mt-4 text-center text-sm'>
						Don&apos;t have an account?{' '}
						<Link
							href='/register'
							className='underline underline-offset-4'
						>
							Sign up
						</Link>
					</div>
				</Form>
			)}
		</Formik>
	);
};

export default LoginForm;
