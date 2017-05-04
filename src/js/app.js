/* global google:ignore mapStyles:ignore */

$(() => {

  // Store the #map div, and make it available to all functions
  const $map = $('#map');
  // Set a map variable that will hold our Google map, and is available to all functions
  let map = null;
  // Set infowindow as null to begin with, and make it available to all functions
  let infowindow = null;
  // If there is a #map div on the page, then initialise the Google map
  if ($map.length) initMap();

  function initMap() {
    map = new google.maps.Map($map.get(0), {
      center: { lat: 51.512504, lng: -0.128914 },
      zoom: 13,
      scrollwheel: false,
      // Map styles are stored in another .js file - which is required above the app.js and is available inside this file
      styles: mapStyles
    });

    getGroups();
  }

  function getGroups() {
    const events = $map.data('events');
    $.each(events, (index, data) => {
      addMarker(data);
    });
  }

  function addMarker(data) {
    let latLng;
    (data.venue === undefined) ? latLng = {lat: 0.000, lng: 0.000} : latLng = { lat: data.venue.lat, lng: data.venue.lon };
    const marker = new google.maps.Marker({
      position: latLng,
      map: map,
      animation: google.maps.Animation.DROP,
      icon: '../assets/images/marker.png'
    });

    marker.addListener('click', () => {
      markerClick(marker, data);
    });
  }

  const infoWindow = new google.maps.Marker({
    map: map,
    animation: google.maps.Animation.DROP
  });

    // Try HTML5 geolocation.
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(function(position) {
      var pos = {
        lat: position.coords.latitude,
        lng: position.coords.longitude
      };

      infoWindow.setPosition(pos);
      map.setCenter(pos);
    }, function() {
      handleLocationError(true, infoWindow, map.getCenter());
    });
  } else {
    // Browser doesn't support Geolocation
    handleLocationError(false, infoWindow, map.getCenter());
  }

  function handleLocationError(browserHasGeolocation, infoWindow, pos) {
    infoWindow.setPosition(pos);
  }

  function markerClick(marker, data) {
    // If there is an open infowindow on the map, close it
    if(infowindow) infowindow.close();


    // Locate the data that we need from the individual bike object
    const name = data.group.name;
    const link = data.group.urlname;
    const eventurl = data.event_url;

    // Update the infowindow variable to be a new Google InfoWindow
    infowindow = new google.maps.InfoWindow({
      content: `
      <div class="infowindow">
        <h4>${name}</h4>
        <a class="btn" href="${eventurl}" target="_blank">See the Event</a>
        <a class="btn" href="https://www.meetup.com/${link}" target="_blank">Become a Member</a>
      </div>
      `
    });

    // Finally, open the new InfoWindow
    infowindow.open(map, marker);
  }

});
