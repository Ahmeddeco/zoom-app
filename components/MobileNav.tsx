'use client'

import {
	Sheet,
	SheetClose,
	SheetContent,
	SheetTrigger,
} from '@/components/ui/sheet'
import { sidebarLinks } from '@/constants'
import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

const MobileNav = () => {
	const pathname = usePathname()

	return (
		<section className='w-full max-w-[264px] text-white '>
			<Sheet>
				<SheetTrigger asChild>
					<Image
						src='/icons/hamburger.svg'
						alt='hamburger icon'
						width={36}
						height={36}
						className='cursor-pointer sm:hidden '
					/>
				</SheetTrigger>
				<SheetContent className=' border-none bg-dark-1' side={'left'}>
					<Link href='/' className='flex items-center gap-1 '>
						<Image
							src={'/icons/logo.svg'}
							alt={'yoom logo'}
							width={32}
							height={32}
							className='max-sm:size-10'
						/>
						<p className='text-4xl font-extrabold text-white '>yoom</p>
					</Link>
					<nav className='h-[calc(100vh-72px)] flex flex-col justify-between overflow-y-auto'>
						<SheetClose asChild />
						<section className='flex h-full flex-col gap-6 pt-60 text-white'>
							{sidebarLinks.map(({ imgURL, label, route }) => {
								return (
									<SheetClose asChild key={route}>
										<Link
											href={route}
											className={`flex gap-4 items-center p-4 rounded-lg w-full ${
												pathname === route || pathname.startsWith(route, 1)
													? 'bg-blue-1'
													: ''
											}`}
										>
											<Image src={imgURL} alt={label} width={20} height={20} />
											<p className=' font-semibold '>{label}</p>
										</Link>
									</SheetClose>
								)
							})}
						</section>
					</nav>
				</SheetContent>
			</Sheet>
		</section>
	)
}

export default MobileNav
