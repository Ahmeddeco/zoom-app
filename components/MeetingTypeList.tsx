'use client'

import { useState } from 'react'
import HomeCard from './HomeCard'
import { useRouter } from 'next/navigation'
import MeetingModal from './MeetingModal'
import { useUser } from '@clerk/nextjs'
import { Call, useStreamVideoClient } from '@stream-io/video-react-sdk'
import { useToast } from '@/hooks/use-toast'

const MeetingTypeList = () => {
	const router = useRouter()
	const { user } = useUser()
	const client = useStreamVideoClient()
	const [values, setValues] = useState({
		dateTime: new Date(),
		description: '',
		link: '',
	})

	const [callDetails, setCallDetails] = useState<Call>()
	const { toast } = useToast()

	const createMeeting = async () => {
		if (!client || !user) return

		try {
			if (!values.dateTime) {
				toast({
					title: 'Please select a date and a time',
				})
				return
			}
			const id = crypto.randomUUID()
			const call = client.call('default', id)

			if (!call) throw new Error('Call not found')

			const startAt =
				values.dateTime.toISOString() || new Date(Date.now()).toISOString()
			const description = values.description || 'Instant meeting'

			await call.getOrCreate({
				data: { starts_at: startAt, custom: { description } },
			})

			setCallDetails(call)

			if (!values.description) {
				router.push(`/meeting/${call.id}`)
			}
			toast({
				title: 'Meeting created',
			})
		} catch (error) {
			console.log(error)
			toast({
				title: 'Failed to create meeting',
			})
		}
	}

	const [meetingState, setMeetingState] = useState<
		'isScheduleMeeting' | 'isJoiningMeeting' | 'isInstantMeeting' | undefined
	>()

	return (
		<section className='grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-4'>
			<HomeCard
				img='/icons/add-meeting.svg'
				title='new meeting'
				description='start an instant meeting'
				handleClick={() => setMeetingState('isInstantMeeting')}
				className='bg-orange-1'
			/>
			<HomeCard
				img='/icons/schedule.svg'
				title='schedule meeting'
				description='plan your meeting'
				handleClick={() => setMeetingState('isScheduleMeeting')}
				className='bg-blue-1'
			/>
			<HomeCard
				img='/icons/recordings.svg'
				title='view recordings'
				description='check out your recordings'
				handleClick={() => router.push('/recordings')}
				className='bg-purple-1'
			/>
			<HomeCard
				img='/icons/join-meeting.svg'
				title='join meeting'
				description='via invitation link'
				handleClick={() => setMeetingState('isJoiningMeeting')}
				className='bg-yellow-1'
			/>
			<MeetingModal
				isOpen={meetingState === 'isInstantMeeting'}
				onClose={() => setMeetingState(undefined)}
				title='start an instant meeting'
				className='text-center'
				buttonText='start meeting'
				handleClick={createMeeting}
			/>
		</section>
	)
}

export default MeetingTypeList
