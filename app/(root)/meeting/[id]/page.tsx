export default async function MeetingPage({
	params,
}: {
	params: { id: string }
}) {
	const { id } = await params
	return <h1>Welcome to Meeting page! {id}</h1>
}
