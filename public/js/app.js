'use strict';

/* global google:ignore mapStyles:ignore */

$(function () {

  // Store the #map div, and make it available to all functions
  var $map = $('#map');
  // Set a map variable that will hold our Google map, and is available to all functions
  var map = null;
  // Set infowindow as null to begin with, and make it available to all functions
  var infowindow = null;
  // If there is a #map div on the page, then initialise the Google map
  if ($map.length) initMap();

  function initMap() {
    map = new google.maps.Map($map.get(0), {
      zoom: 13,
      scrollwheel: false,
      // Map styles are stored in another .js file - which is required above the app.js and is available inside this file
      styles: mapStyles
    });

    getGroups();
  }

  function getGroups() {
    var events = $map.data('events');
    $.each(events, function (index, data) {
      addMarker(data);
    });
  }

  function addMarker(data) {
    var latLng = void 0;
    data.venue === undefined ? latLng = { lat: 0.000, lng: 0.000 } : latLng = { lat: data.venue.lat, lng: data.venue.lon };
    var marker = new google.maps.Marker({
      position: latLng,
      map: map,
      animation: google.maps.Animation.DROP
    });

    marker.addListener('click', function () {
      markerClick(marker, location);
    });
  }

  var infoWindow = new google.maps.Marker({
    map: map,
    animation: google.maps.Animation.DROP
  });

  // Try HTML5 geolocation.
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(function (position) {
      var pos = {
        lat: position.coords.latitude,
        lng: position.coords.longitude
      };

      infoWindow.setPosition(pos);
      map.setCenter(pos);
    }, function () {
      handleLocationError(true, infoWindow, map.getCenter());
    });
  } else {
    // Browser doesn't support Geolocation
    handleLocationError(false, infoWindow, map.getCenter());
  }

  function handleLocationError(browserHasGeolocation, infoWindow, pos) {
    infoWindow.setPosition(pos);
  }

  function markerClick(marker, location) {
    // If there is an open infowindow on the map, close it
    if (infowindow) infowindow.close();

    // Locate the data that we need from the individual bike object
    var name = location.name;
    var link = location.link;
    var members = location.members;

    // Update the infowindow variable to be a new Google InfoWindow
    infowindow = new google.maps.InfoWindow({
      content: '\n      <div class="infowindow">\n        <h4>' + name + '</h4>\n        <p>Members: ' + members + '</p>\n        <a class="btn" href="' + link + '" target="_blank">Become a Member</a>\n        <a id="specialBtn" class="btn" href="#">Save for later!</a>\n      </div>\n      '
    });

    // Finally, open the new InfoWindow
    infowindow.open(map, marker);
  }
});