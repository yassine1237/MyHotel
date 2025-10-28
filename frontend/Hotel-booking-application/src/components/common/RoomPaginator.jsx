

const RoomPaginator = ({ currentPage, totalPages, onPageChange }) => {
	if (totalPages <= 1) return null // no pagination if only 1 page

	const pageNumbers = Array.from({ length: totalPages }, (_, i) => i + 1)

	return (
		<nav aria-label="Room list pagination">
			<ul className="pagination justify-content-center mt-4">
				<li className={`page-item ${currentPage === 1 ? "disabled" : ""}`}>
					<button
						className="page-link"
						onClick={() => onPageChange(currentPage - 1)}
						aria-label="Previous"
					>
						&laquo;
					</button>
				</li>

				{pageNumbers.map((pageNumber) => (
					<li
						key={pageNumber}
						className={`page-item ${currentPage === pageNumber ? "active" : ""}`}
					>
						<button
							onClick={() => onPageChange(pageNumber)}
							className="page-link"
							style={{ cursor: "pointer" }}
						>
							{pageNumber}
						</button>
					</li>
				))}

				<li className={`page-item ${currentPage === totalPages ? "disabled" : ""}`}>
					<button
						className="page-link"
						onClick={() => onPageChange(currentPage + 1)}
						aria-label="Next"
					>
						&raquo;
					</button>
				</li>
			</ul>
		</nav>
	)
}

export default RoomPaginator
