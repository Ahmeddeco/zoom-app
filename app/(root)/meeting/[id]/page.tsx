export default function MeetingPage({ params }: { params: { id: string } }) {
	return <h1>Welcome to Meeting page! {params.id}</h1>
}
