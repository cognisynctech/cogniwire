import { useRef, useState, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(ScrollTrigger);

const teamMembers = [
	{ id: 1, name: 'Santosh', image: '/img/team/1.jpeg', position: 'Co-Founder & CEO' },
	{ id: 2, name: 'Samanth', image: '/img/team/2.jpeg', position: 'Co-Founder & CTO' },
	{ id: 3, name: 'Tushar', image: '/img/team/3.jpeg', position: 'Co-Founder & CMO' },
	{ id: 4, name: 'Harshith', image: '/img/team/4.jpeg', position: 'Co-Founder & Jt. CTO' },
	{ id: 5, name: 'Dhanyashree', image: '/img/team/5.jpeg', position: 'Developer' },
	{ id: 6, name: 'Sinchana', image: '/img/team/6.jpeg', position: 'Developer' },
	{ id: 7, name: 'Oviya', image: '/img/team/7.jpeg', position: 'Design & Finance' },
	{ id: 8, name: 'Advaith', image: '/img/team/8.jpeg', position: 'Design' },
	{ id: 9, name: 'Indushree', image: '/img/team/9.jpeg', position: 'Developer' },
	{ id: 10, name: 'Ruthu', image: '/img/team/10.jpeg', position: 'Media & Design ' }
];

const TeamSection = () => {
	const sectionRef = useRef(null);
	const textRef = useRef(null);
	const posRef = useRef(null);
	const [hoveredMember, setHoveredMember] = useState(null);
	const [isDesktop, setIsDesktop] = useState(window.matchMedia('(min-width: 640px)').matches);

	useEffect(() => {
		const mediaQuery = window.matchMedia('(min-width: 640px)');
		const handler = (e) => setIsDesktop(e.matches);
		mediaQuery.addEventListener('change', handler);
		return () => mediaQuery.removeEventListener('change', handler);
	}, []);

	// Animate the main text on mount and on hover change
	useGSAP(() => {
		if (!hoveredMember) {
			// THE SQUAD animation: scale and fade in on scroll
			gsap.fromTo(
				textRef.current,				{ y: 80, opacity: 0, scale: 0.92, letterSpacing: '-0.04em' },
				{ y: 0, opacity: 1, scale: 1, letterSpacing: '0.01em', duration: 1.2, ease: 'power4.out',
					scrollTrigger: {
						trigger: sectionRef.current,
						start: 'top 70%',
						once: true
					}
				}
			);
		} else {
			// Name animation: pop and slide up
			gsap.fromTo(
				textRef.current,				{ y: 60, opacity: 0, scale: 0.95, letterSpacing: '-0.04em' },
				{ y: 0, opacity: 1, scale: 1.04, letterSpacing: '0.01em', duration: 0.7, ease: 'power3.out' }
			);
			gsap.to(textRef.current, {
				scale: 1,
				duration: 0.3,
				delay: 0.7,
				ease: 'power1.out'
			});
		}
	}, [hoveredMember]);

	// Animate the position text when it appears
	useGSAP(() => {
		if (hoveredMember && posRef.current) {
			gsap.fromTo(
				posRef.current,
				{ y: 30, opacity: 0 },
				{ y: 0, opacity: 1, duration: 0.6, ease: 'power2.out', delay: 0.15 }
			);
		}
	}, [hoveredMember]);

	return (
		<section
			ref={sectionRef}
			className="w-full min-h-screen bg-black flex flex-col items-center justify-center relative overflow-hidden"
			style={{ background: '#111' }}
		>
			{/* Images row */}			<div className="flex flex-row flex-wrap items-center justify-center gap-3 sm:gap-1 mt-8 sm:mt-12 mb-8 sm:mb-10 px-4 max-w-[320px] sm:max-w-none mx-auto">
				{teamMembers.map((member, idx) => {
					// LinkedIn links as per user order
					const links = [
						'https://www.linkedin.com/in/meflux/',
						'https://www.linkedin.com/in/samanth-abbur-9bb54026b/',
						'https://www.linkedin.com/in/tushar-satish-8b1bab195/',
						'https://www.linkedin.com/in/harshith-p-s-1a21202a8/',
						'https://www.linkedin.com/in/dhanyashree-k/',
						'https://www.linkedin.com/in/sinchana-navarathna-899935305/', 
						'https://www.linkedin.com/in/duggirala-oviya-95144231a/',
						'https://www.linkedin.com/in/n-sai-advaith-58b9a42a7/',
						'https://www.linkedin.com/in/indu-shree-3599972a7/',
						'https://www.linkedin.com/in/tangirala-ruthu-639a28338/'
					];
					const link = links[idx];
					const imageDiv = (
						<div
							key={member.id}
							ref={el => {
								if (!el) return;
								// Attach GSAP hover effect
								el.onmouseenter = () => {
									gsap.to(el, { scale: 1.16, boxShadow: '0 8px 32px #ff2d2d44', zIndex: 10, duration: 0.35, ease: 'power2.out' });
								};
								el.onmouseleave = () => {
									gsap.to(el, { scale: 1, boxShadow: '0 0px 0px #0000', zIndex: 1, duration: 0.35, ease: 'power2.inOut' });
								};
							}}
							className={`transition-all duration-200 rounded-[18%] overflow-hidden cursor-pointer ${
								hoveredMember && hoveredMember.id === member.id
									? 'z-10'
									: hoveredMember
									? 'opacity-60'
									: ''
							}`}							style={{ 
								width: 'clamp(56px, 18vw, 84px)', 
								height: 'clamp(56px, 18vw, 84px)', 
								background: '#222',
								transition: 'transform 0.3s ease-out, opacity 0.3s ease-out' 
							}}
							onMouseEnter={() => setHoveredMember(member)}
							onMouseLeave={() => setHoveredMember(null)}
						>
							<img
								src={member.image}
								alt={member.name}
								className="w-full h-full object-cover object-center"
								draggable={false}
							/>
						</div>
					);
					
					return isDesktop && link ? (
						<a
							key={member.id}
							href={link}
							target="_blank"
							rel="noopener noreferrer"
							style={{ display: 'block', borderRadius: '18%' }}
							tabIndex={0}
							aria-label={member.name + ' LinkedIn'}
						>
							{imageDiv}
						</a>
					) : (
						imageDiv
					);
				})}
			</div>			{/* Big animated text below images */}
			<div className="w-full flex flex-col items-center justify-center select-none">
				<h2
					ref={textRef}
					className={`special-font hero-heading ${
						hoveredMember ? 'text-[#ff2d2d]' : 'text-white'
					}`}
					style={{
						fontSize: 'clamp(2rem, 8vw, 10rem)',
						marginTop: 0,
						marginBottom: 0,
						letterSpacing: '0.01em',
						transition: 'color 0.3s cubic-bezier(.4,2,.6,1)'
					}}
				>
					{hoveredMember ? hoveredMember.name.toUpperCase() : 'THE SQUAD'}
				</h2>
				{hoveredMember && (
					<span
						ref={posRef}
						className="hidden sm:block text-center mt-2 text-base md:text-lg text-white/80"
						style={{
							textShadow: '0 2px 8px #0008'
						}}
					>
						{hoveredMember.position}
					</span>
				)}
			</div>
		</section>
	);
};

export default TeamSection;
