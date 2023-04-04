	mapboxgl.accessToken = mapToken;
	const map = new mapboxgl.Map({
		container: 'map',
		style: 'mapbox://styles/mapbox/streets-v11', //stylesheet location
		center: campground.geometry.coordinates, // starting point (log, lat)
		zoom: 4 // starting zoom
	});
	
map.addControl(new mapboxgl.NavigationControl());	

new mapboxgl.Marker()
	.setLngLat(campground.geometry.coordinates)
	.setPopup(
		new mapboxgl.Popup({ offset: 25 })
			.setHTML(
				`<h3>${campground.title}</h3><p>${campground.location}</p>`
				)
			)
	.addTo(map)