'use client'

import Loader from '@/components/Loader'
import MeetingRoom from '@/components/MeetingRoom'
import MeetingSetup from '@/components/MeetingSetup'
import { useGetCallbyId } from '@/hooks/useGetCallbyId'
import { useUser } from '@clerk/nextjs'
import { StreamCall, StreamTheme } from '@stream-io/video-react-sdk'
import { useState } from 'react'

export default function MeetingPage({
	params: { id },
}: {
	params: { id: string }
}) {
	const { user, isLoaded } = useUser()
	const [isSetupComplete, setIsSetupComplete] = useState(false)
	const { call, isCallLoading } = useGetCallbyId(id)

	if (!isLoaded || isCallLoading) return <Loader />

	return (
		<main className='h-screen w-full'>
			<StreamCall call={call}>
				<StreamTheme>
					{!isSetupComplete ? <MeetingSetup /> : <MeetingRoom />}
				</StreamTheme>
			</StreamCall>
		</main>
	)
}
