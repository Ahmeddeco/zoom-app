import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import MobileNav from './MobileNav'
import { SignedIn, SignedOut, SignInButton, UserButton } from '@clerk/nextjs'

const Navbar = () => {
	return (
		<header className='flex-between fixed z-50 w-full bg-dark-1 px-6 py-4 lg:px-10'>
			<Link href='/' className='flex items-center gap-1 '>
				<Image
					src={'/icons/logo.svg'}
					alt={'yoom logo'}
					width={32}
					height={32}
					className='max-sm:size-10'
				/>
				<p className='text-4xl font-extrabold text-white max-sm:hidden'>yoom</p>
			</Link>

			<nav className='flex-between gap-5 '>
				{/* Clerk - User Management */}
				<SignedIn>
					<UserButton />
				</SignedIn>
				<SignedOut>
					<SignInButton/>
				</SignedOut>
				<MobileNav />
			</nav>
		</header>
	)
}

export default Navbar
