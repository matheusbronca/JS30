const longitude = navigator.geolocation.getCurrentPosition(
  (position) => position.longitude
);
const latitude = navigator.geolocation.getCurrentPosition(
  (position) => position.latitude
);

const mapLabel = document.querySelector('[city]');

const apiUrl = `http://www.7timer.info/bin/civillight.php?lon=${longitude}.2&lat=${latitude}.1&ac=0&unit=metric&output=json&tzshift=0`;
const mapApi = `https://freegeoip.app/json/143.255.196.81`;

fetch(apiUrl)
  .then((data) => data.json())
  .then((data) => setTemperature(data));

fetch(mapApi)
  .then((data) => data.json())
  .then((data) => setMap(data));

const setTemperature = (data) => {
 
  const {
    dataseries: [
      {
        temp2m: { max },
      },
      { weather },
    ],
  } = data

  const $tempMax = document.querySelector('[temp]');
  const $weather = document.querySelector('[temp-status]');

  $tempMax.innerHTML = `${max}°C`;
  $weather.innerHTML = weather;
};

const setMap = (mapPoint) => {
  const { city, region_code, country_name } = mapPoint;

  mapLabel.innerHTML = `${city}/${region_code} - ${country_name}`;
};

const runClock = () => {
  const date = new Date();

  const dateLabel = document.querySelector('[dateLabel]');
  const timeLabel = document.querySelector('[timeLabel]');

  const secHandle = document.querySelector('.sc');
  const minHandle = document.querySelector('.mn');
  const hourHandle = document.querySelector('.hr');

  const setDate = () => {
    Date.prototype.formatDate = function () {
      const months = [
        'Jan',
        'Feb',
        'Mar',
        'Apr',
        'May',
        'Jun',
        'Jul',
        'Aug',
        'Sep',
        'Oct',
        'Nov',
        'Dec',
      ];

      const day = () => {
        return this.getDate().toString().length > 1
          ? `${this.getDate()}`
          : `0${this.getDate()}`;
      };

      const month = () => {
        return months[this.getMonth()];
      };

      return `${day()} ${month()} <span>/${this.getFullYear()}`;
    };

    dateLabel.innerHTML = `${date.formatDate()}`;
  };

  const setTime = () => {
    
    const timeUnits = [];
    timeUnits.push(date.toLocaleTimeString().split(/:| /));

    const hr = timeUnits[0][0];
    const mn = timeUnits[0][1];
    const period = timeUnits[0][timeUnits[0].length -1];
    
    timeLabel.innerHTML = `${hr}:${mn}<span class="time-period">${period}<span>`;
  };

  const setHandles = () => {
    const handles = [secHandle, minHandle, hourHandle];

    handles.forEach((handle) => {
      if (handle.style.transform == 'translate(-50%, -100%) rotate(354deg)') {
        handle.classList.add('disable-css-transitions');
      } else {
        secHandle.style.transform = `translate(-50%, -100%) rotate(${
          (date.getSeconds() / 60) * 360
        }deg)`;
        minHandle.style.transform = `translate(-50%, -100%) rotate(${
          (date.getMinutes() / 60) * 360
        }deg)`;
        hourHandle.style.transform = `translate(-50%, -100%) rotate(${
          (date.getHours() / 12) * 360
        }deg)`;
      }
    });
  };

  setDate();
  setTime();
  setHandles();
  setTimeout(runClock, 1000);
};

runClock();
