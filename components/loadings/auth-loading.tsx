import { Skeleton } from '@/components/ui/skeleton';
import { Label } from '@/components/ui/label';

const LoadingForm = () => {
	return (
		<div className='flex flex-col gap-6'>
			<div className='grid gap-3'>
				<Label htmlFor='password'>Email</Label>
				<Skeleton className='h-10 w-full rounded-md' />
			</div>
			<div className='grid gap-3'>
				<div className='flex items-center'>
					<Label htmlFor='password'>Password</Label>
					<p className='ml-auto inline-block text-sm underline-offset-4 text-slate-400 select-none'>
						Forgot your password?
					</p>
				</div>
				<Skeleton className='h-10 w-full rounded-md' />
			</div>
			<Skeleton className='h-10 w-full rounded-md' />
		</div>
	);
};

export default LoadingForm;
