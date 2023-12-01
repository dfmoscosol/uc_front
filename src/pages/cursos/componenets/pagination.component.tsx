type Props = {
	totalDocs: number;
	prevPage: number | null;
	hasPrevPage: boolean;
	total_pages: number;
	page: number;
	nextPage: number | null;
	hasNextPage: boolean;
	limit: number;
	fetchData: any;
};

const Pagination: React.FC<Props> = ({
	totalDocs,
	prevPage,
	hasPrevPage,
	total_pages,
	page,
	nextPage,
	hasNextPage,
	limit,
	fetchData,
}): JSX.Element => {
	return (
		<>
	
			{totalDocs > limit && (
				<ul className="pagination pagination-primary justify-content-center">
					<li className="page-item">
						<button
							onClick={(): void => fetchData(prevPage)}
							className={`page-link ${!hasPrevPage && "disabled"}`}
							disabled={!hasPrevPage}
						>
							Anterior
						</button>
					</li>
					{[...Array(total_pages).keys()].map((index): JSX.Element | null => {
						if (index === page - 1 || index === page || index === page + 1) {
							return (
								<li key={index} className={`page-item ${index + 1 === page && "active"}`}>
									<button onClick={(): void => fetchData(index + 1)} className="page-link" disabled={index + 1 === page}>
										{index + 1}
									</button>
								</li>
							);
						} else if (index === 0 || index === total_pages - 1) {
							// Mostrar la primera y última página siempre
							return (
								<li key={index} className={`page-item ${index + 1 === page && "active"}`}>
									<button onClick={(): void => fetchData(index + 1)} className="page-link" disabled={index + 1 === page}>
										{index + 1}
									</button>
								</li>
							);
						} else if (index === 1 || index === total_pages - 2) {
							// Mostrar puntos suspensivos (...) como indicador de más páginas disponibles
							return (
								<li key={index} className="page-item disabled">
									<span className="page-link">...</span>
								</li>
							);
						}
						return null; // Devolver nulo para ocultar otros números de página
					})}
					<li className="page-item">
						<button
							onClick={(): void => fetchData(nextPage)}
							className={`page-link ${!hasNextPage && "disabled"}`}
							disabled={!hasNextPage}
						>
							Siguiente
						</button>
					</li>
				</ul>
			)}

		</>
	);
};

export default Pagination;
