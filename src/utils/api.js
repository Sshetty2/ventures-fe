export const fetchData = async (path, method, data = null) => {
	let options;
	switch (method) {
		case "DELETE":
			options = {method};
			break;
		case "GET":
			options = data;
			break;
		default:
			options = {
				method,
				body: JSON.stringify(data),
				headers: {
					"Content-type": "application/json"
				}
			};
	}
	//hardcoded url fork ss 5/5/19
	const url = "https://ventures-be.herokuapp.com/api/v1" + path;
	// const url = process.env.REACT_APP_BACKEND_URL + '/api/v1' + path;
	const response = await fetch(url, options);

	if (response.status === 204) return "success";

	const json = await response.json();
	if (response.ok) {
		return json;
	} else {
		throw Error(json);
	}
};
