import { useRef, useState, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(ScrollTrigger);

// Team members organized by category
const teamCategories = [
	{
		id: 'founders',
		title: 'FOUNDERS',
		members: [
			{ id: 1, name: 'Santosh', image: '/img/team/1.jpeg', position: 'Co-Founder & CEO', linkedin: 'https://www.linkedin.com/in/meflux/' },
			{ id: 2, name: 'Samanth', image: '/img/team/2.jpeg', position: 'Co-Founder & CTO', linkedin: 'https://www.linkedin.com/in/samanth-abbur-9bb54026b/' },
			{ id: 3, name: 'Tushar', image: '/img/team/3.jpeg', position: 'Co-Founder & CMO', linkedin: 'https://www.linkedin.com/in/tushar-satish-8b1bab195/' },
			{ id: 4, name: 'Harshith', image: '/img/team/4.jpeg', position: 'Co-Founder & Jt. CTO', linkedin: 'https://www.linkedin.com/in/harshith-p-s-1a21202a8/' },
		]
	},
	{
		id: 'developers',
		title: 'R&D AND ENGINEERING',
		members: [
			{ id: 5, name: 'Dhanyashree', image: '/img/team/5.jpeg', position: 'Developer', linkedin: 'https://www.linkedin.com/in/dhanyashree-k/' },
			{ id: 6, name: 'Sinchana', image: '/img/team/6.jpeg', position: 'QA Tester', linkedin: 'https://www.linkedin.com/in/sinchana-navarathna-899935305/' },
			{ id: 11, name: 'Tanushree', image: '/img/team/11.jpeg', position: 'Developer', linkedin: 'https://www.linkedin.com/in/tanushree-b-sindagi/' },
			{ id: 12, name: 'Guna', image: '/img/team/12.jpeg', position: 'Hardware Developer', linkedin: 'https://www.linkedin.com/in/-guna-m/' },
		]
	},
	{
		id: 'design',
		title: 'GROWTH AND DESIGN',
		members: [
			{ id: 7, name: 'Oviya', image: '/img/team/7.jpeg', position: 'Digital Marketing Head', linkedin: 'https://www.linkedin.com/in/duggirala-oviya-95144231a/' },
			{ id: 8, name: 'Advaith', image: '/img/team/8.jpeg', position: 'Design', linkedin: 'https://www.linkedin.com/in/n-sai-advaith-58b9a42a7/' },
			{ id: 9, name: 'Indushree', image: '/img/team/9.jpeg', position: 'Content & Design', linkedin: 'https://www.linkedin.com/in/indu-shree-3599972a7/' },
			{ id: 10, name: 'Ruthu', image: '/img/team/10.jpeg', position: 'Media & Design', linkedin: 'https://www.linkedin.com/in/tangirala-ruthu-639a28338/' },
		]
	}
];

// Member Card Component
const MemberCard = ({ member, isExpanded }) => {
	const cardRef = useRef(null);
	const [isHovered, setIsHovered] = useState(false);

	return (
		<a
			ref={cardRef}
			href={member.linkedin}
			target="_blank"
			rel="noopener noreferrer"
			className="block group"
			onMouseEnter={() => setIsHovered(true)}
			onMouseLeave={() => setIsHovered(false)}
		>
			<div className="relative overflow-hidden">
				{/* Image */}
				<div 
					className="aspect-square overflow-hidden rounded-lg bg-white/5"
					style={{
						transform: isHovered ? 'scale(1.02)' : 'scale(1)',
						transition: 'transform 0.4s ease'
					}}
				>
					<img
						src={member.image}
						alt={member.name}
						className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500"
					/>
				</div>

				{/* Info Overlay */}
				<div className="mt-4">
					<h4 className="text-sm md:text-base font-zentry font-bold text-white uppercase tracking-wide">
						{member.name}
					</h4>
					<div className="flex items-center justify-between mt-1">
						<span className="text-[10px] md:text-xs font-general uppercase text-white/50 tracking-wider">
							{member.position}
						</span>
						<span className="text-[10px] md:text-xs font-robert-regular text-white/40 group-hover:text-white transition-colors flex items-center gap-1">
							LINKEDIN <span className="text-sm">→</span>
						</span>
					</div>
				</div>
			</div>
		</a>
	);
};

// Category Row Component
const CategoryRow = ({ category, isExpanded, onToggle }) => {
	const contentRef = useRef(null);

	useEffect(() => {
		if (contentRef.current) {
			gsap.to(contentRef.current, {
				height: isExpanded ? 'auto' : 0,
				opacity: isExpanded ? 1 : 0,
				duration: 0.5,
				ease: 'power3.out'
			});
		}
	}, [isExpanded]);

	return (
		<div className="border-t border-white/10">
			{/* Category Header */}
			<button
				onClick={onToggle}
				className="w-full py-6 flex items-center justify-between group hover:bg-white/[0.02] transition-colors px-4 md:px-8"
			>
				<span className="text-lg md:text-xl font-zentry font-bold text-white tracking-wide">
					{category.title}
				</span>
				<div className="flex items-center gap-4">
					<span className="text-sm font-robert-regular text-white/40">
						{category.members.length} MEMBERS
					</span>
					<span 
						className="text-2xl text-white/60 group-hover:text-white transition-all duration-300"
						style={{
							transform: isExpanded ? 'rotate(45deg)' : 'rotate(0deg)',
							transition: 'transform 0.3s ease'
						}}
					>
						+
					</span>
				</div>
			</button>

			{/* Members Grid */}
			<div 
				ref={contentRef}
				className="overflow-hidden"
				style={{ height: 0, opacity: 0 }}
			>
				<div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 px-4 md:px-8 pb-8">
					{category.members.map((member) => (
						<MemberCard 
							key={member.id} 
							member={member} 
							isExpanded={isExpanded}
						/>
					))}
				</div>
			</div>
		</div>
	);
};

const TeamSection = () => {
	const sectionRef = useRef(null);
	const titleRef = useRef(null);
	const [expandedCategory, setExpandedCategory] = useState('founders'); // Open founders by default

	// Title animation
	useGSAP(() => {
		gsap.fromTo(
			titleRef.current,
			{ y: 80, opacity: 0 },
			{ 
				y: 0, 
				opacity: 1, 
				duration: 1.2, 
				ease: 'power4.out',
				scrollTrigger: {
					trigger: sectionRef.current,
					start: 'top 70%',
					once: true
				}
			}
		);
	}, []);

	const handleToggle = (categoryId) => {
		setExpandedCategory(prev => prev === categoryId ? null : categoryId);
	};

	return (
		<section
			ref={sectionRef}
			className="w-full min-h-screen bg-black py-20"
		>
			{/* Header */}
			<div className="max-w-6xl mx-auto px-4 md:px-8 mb-12">
				<h2 
					ref={titleRef}
					className="special-font hero-heading text-white text-center md:text-left"
				>
					THE SQU<b>A</b>D
				</h2>
				<p className="font-robert-regular text-lg text-white/50 mt-4 max-w-xl text-center md:text-left">
					Meet the minds behind Cogniwire — a diverse team of innovators, engineers, and dreamers.
				</p>
			</div>

			{/* Categories */}
			<div className="max-w-6xl mx-auto">
				{teamCategories.map((category) => (
					<CategoryRow
						key={category.id}
						category={category}
						isExpanded={expandedCategory === category.id}
						onToggle={() => handleToggle(category.id)}
					/>
				))}
			</div>

			{/* Bottom border */}
			<div className="max-w-6xl mx-auto border-t border-white/10 mt-0" />
		</section>
	);
};

export default TeamSection;
