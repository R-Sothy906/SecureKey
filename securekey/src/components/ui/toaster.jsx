import {
	Toast,
	ToastClose,
	ToastDescription,
	ToastProvider,
	ToastTitle,
	ToastViewport,
} from '@/components/ui/toast';
import { useToast } from '@/components/ui/use-toast';
import { Button } from './button';
import React from 'react';

export function Toaster() {
	const { toasts, dismiss } = useToast();

	return (
		<ToastProvider duration={4000}>
			{toasts.map(({ id, title, description, action, ...props }) => {
				return (
					<Toast key={id} {...props}>
						<div className="grid gap-1">
							{title && <ToastTitle>{title}</ToastTitle>}
							{description && (
								<ToastDescription>{description}</ToastDescription>
							)}
						</div>
                        <div className="flex gap-2 items-center">
						    {action}
                            <Button 
                                variant="ghost" 
                                size="sm" 
                                className="h-6 text-[10px] px-2 text-slate-500 hover:text-slate-900 border border-slate-200" 
                                onClick={() => dismiss(id)}
                            >
                                Dismiss
                            </Button>
                        </div>
						<ToastClose />
					</Toast>
				);
			})}
			<ToastViewport />
		</ToastProvider>
	);
}