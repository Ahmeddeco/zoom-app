import { SignIn } from '@clerk/nextjs'

export default async function SignInPage() {
	return (
		<main className='flex h-screen w-full items-center justify-center'>
			<SignIn />
		</main>
	)
}
