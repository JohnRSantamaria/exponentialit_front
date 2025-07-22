import { cn } from '@/lib/utils';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import LoginForm from './forms/login-form';

export function Login({ className, ...props }: React.ComponentProps<'div'>) {
	return (
		<div
			className={cn('flex flex-col gap-6', className)}
			{...props}
		>
			<Card>
				<CardHeader>
					<CardTitle>Login to your account</CardTitle>
					<CardDescription>Enter your email below to login to your account</CardDescription>
				</CardHeader>
				<CardContent>
					<LoginForm />
				</CardContent>
			</Card>
		</div>
	);
}
