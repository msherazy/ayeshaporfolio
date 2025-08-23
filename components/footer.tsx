export function Footer() {
	const currentYear = new Date().getFullYear();

	return (
		<footer className='py-4'>
			<div className='container mx-auto'>
				<div className='text-center text-white/70'>
					<p>&copy; {currentYear} Ayesha Fayyaz. All rights reserved.</p>
				</div>
			</div>
		</footer>
	);
}
