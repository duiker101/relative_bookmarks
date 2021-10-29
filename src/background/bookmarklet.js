function relative_mark_101(datab) {
	const data = JSON.parse(atob(datab));

	const newUrl = new URL(window.location.origin);
	newUrl.pathname = data.path;
	newUrl.hash = data.hash;
	newUrl.search = data.query;

	console.log(newUrl)
	window.location.assign(newUrl.toString());
}
