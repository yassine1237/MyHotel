

const Header = ({ title, subtitle }) => {
	return (
		<header className="app-header text-center py-5 position-relative bg-dark text-light">
			<div className="overlay position-absolute w-100 h-100" style={{ opacity: 0.4, background: "#000" }}></div>
			<div className="container position-relative">
				<h1 className="display-5 fw-bold">{title}</h1>
				{subtitle && <p className="lead mt-2">{subtitle}</p>}
			</div>
		</header>
	)
}

export default Header
