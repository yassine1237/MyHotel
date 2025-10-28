import { useState } from "react"
import "react-date-range/dist/styles.css"
import "react-date-range/dist/theme/default.css"
import { DateRangePicker } from "react-date-range"

const DateSlider = ({ onDateChange, onFilterChange }) => {
	const [dateRange, setDateRange] = useState({
		startDate: undefined,
		endDate: undefined,
		key: "selection"
	})

	const handleSelect = (ranges) => {
		setDateRange(ranges.selection)
		onDateChange(ranges.selection.startDate, ranges.selection.endDate)
		onFilterChange(ranges.selection.startDate, ranges.selection.endDate)
	}

	const handleReset = () => {
		setDateRange({
			startDate: undefined,
			endDate: undefined,
			key: "selection"
		})
		onDateChange(null, null)
		onFilterChange(null, null)
	}

	return (
		<div className="date-slider-container mt-4">
			<h5 className="fw-semibold mb-3">Search by date range</h5>
			<DateRangePicker
				ranges={[dateRange]}
				onChange={handleSelect}
				moveRangeOnFirstSelection={false}
				className="mb-3 shadow-sm rounded"
			/>
			<button className="btn btn-outline-secondary btn-sm" onClick={handleReset}>
				Reset Dates
			</button>
		</div>
	)
}

export default DateSlider
