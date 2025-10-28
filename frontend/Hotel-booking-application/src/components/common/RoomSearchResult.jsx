import { useState } from "react"
import RoomCard from "../room/RoomCard"
import { Button, Row } from "react-bootstrap"
import RoomPaginator from "./RoomPaginator"

const RoomSearchResults = ({ results, onClearSearch }) => {
	const [currentPage, setCurrentPage] = useState(1)
	const resultsPerPage = 3
	const totalPages = Math.ceil(results.length / resultsPerPage)

	const paginatedResults = results.slice(
		(currentPage - 1) * resultsPerPage,
		currentPage * resultsPerPage
	)

	return (
		<>
			<h5 className="text-center mt-5">Available Rooms</h5>
			<Row>
				{paginatedResults.map((room) => (
					<RoomCard key={room.id} room={room} />
				))}
			</Row>

			{results.length > resultsPerPage && (
				<RoomPaginator
					currentPage={currentPage}
					totalPages={totalPages}
					onPageChange={setCurrentPage}
				/>
			)}

			<div className="text-center mt-3">
				<Button variant="outline-secondary" size="sm" onClick={onClearSearch}>
					Clear Search
				</Button>
			</div>
		</>
	)
}

export default RoomSearchResults
