/**
 * react-select custom styles
 */
export const selectCustomStyles = {
	option: (provided: any, state: any): any => ({
		...provided,
		color: state.isFocused ? "white" : "black",
		backgroundColor: state.isFocused && "#0d6efd",
		padding: 5,
	}),
	multiValueRemove: (styles: any): any => ({
		...styles,
		color: "grey",
		":hover": {
			backgroundColor: "#dc3545",
			color: "white",
		},
	}),
};
