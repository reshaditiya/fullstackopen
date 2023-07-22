export default function Notification({ notification }) {
	const colorStyle = notification.error ? "red" : "green"

	return (
		<div
			style={{
				border: "1px solid black",
				borderColor: colorStyle,
				color: colorStyle,
				padding: "0.5rem",
			}}
		>
			{notification.message}
		</div>
	)
}
