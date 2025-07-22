'use client';

import { LoaderCircle } from 'lucide-react';
import React from 'react';

export function SessionLoader() {
	return (
		<div className='w-full h-dvh flex flex-col items-center justify-center gap-4 p-8 border'>
			<LoaderCircle className='h-10 w-10 animate-spin text-slate-600' />
		</div>
	);
}
