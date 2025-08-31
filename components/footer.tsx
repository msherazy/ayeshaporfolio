import { Copyright } from 'lucide-react';

export function Footer() {
	const currentYear = new Date().getFullYear();

	return (
		<footer className='py-6 md:py-8 relative z-10'>
			{/* Footer Section - Deep Blue Theme */}
			<div className='absolute -top-20 -right-20 w-[400px] h-[400px] bg-gradient-to-br from-[#1d3557]/40 to-[#457b9d]/40 rounded-full blur-3xl opacity-50 z-0 animate-slow-spin'></div>
			<div className='absolute -bottom-20 -left-20 w-[450px] h-[450px] bg-gradient-to-tr from-[#a8dadc]/30 to-[#1d3557]/30 rounded-full blur-3xl opacity-40 z-0 animate-slow-spin-reverse'></div>
			
			<div className='container mx-auto px-4 md:px-6'>
				<div className='flex items-center justify-center'>
					<div className='flex items-center space-x-1 text-white/80 text-sm font-medium'>
						<Copyright className='h-4 w-4' />
						<span>{currentYear}</span>
						<span>-</span>
						<span>Ayesha Fayaz</span>
					</div>
				</div>
			</div>
		</footer>
	);
}
