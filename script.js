'use strict';

const months = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
];

const form = document.querySelector('.form');
const containerWorkouts = document.querySelector('.workouts');
const inputType = document.querySelector('.form__input--type');
const inputDistance = document.querySelector('.form__input--distance');
const inputDuration = document.querySelector('.form__input--duration');
const inputCadence = document.querySelector('.form__input--cadence');
const inputElevation = document.querySelector('.form__input--elevation');

if (navigator.geolocation) {
  navigator.geolocation.getCurrentPosition(
    pos => {
      const { latitude } = pos.coords;
      const { longitude } = pos.coords;

      const coords = [latitude, longitude];

      const map = L.map('map').setView(coords, 14);

      L.tileLayer('https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png', {
        attribution:
          '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
      }).addTo(map);

      map.on('click', mapEvent => {
        const { lat, lng } = mapEvent.latlng;
        const coords = [lat, lng];
        L.marker(coords)
          .addTo(map)
          .bindPopup(
            L.popup({
              maxWidth: 50,
              maxHeight: 50,
              className: 'cycling-popup',
              autoClose: false,
              closeOnClick: false,
            })
          )
          .setPopupContent('WorkOut')
          .openPopup();
      });
    },
    () => {
      console.log("don't get position");
    }
  );
}
