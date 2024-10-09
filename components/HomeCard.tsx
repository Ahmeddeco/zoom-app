import Image from 'next/image'

type HomeCardProps = {
	className: string
	handleClick: () => void
	description: string
	title: string
	img: string
}

const HomeCard = ({
	className,
	handleClick,
	description,
	title,
	img,
}: HomeCardProps) => {
	return (
		<div
			className={`${className} px-4 py-6 flex flex-col justify-between w-full xl:max-w-[270px] min-h-[260px] rounded-3xl cursor-pointer`}
			onClick={handleClick}
		>
			<div className='flex-center glassmorphism size-12 rounded-xl'>
				<Image src={img} alt={'meeting'} width={27} height={27} />
			</div>
			<div className='flex flex-col gap-2'>
				<h1 className='text-2xl font-bold  capitalize'>{title}</h1>
				<p className='text-lg font-normal'>{description}</p>
			</div>
		</div>
	)
}

export default HomeCard
