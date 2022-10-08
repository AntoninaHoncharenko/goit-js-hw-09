import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import { Notify } from 'notiflix/build/notiflix-notify-aio';

const refs = {
  btn: document.querySelector('[data-start]'),
  timer: document.querySelector('.timer'),
  days: document.querySelector('[data-days]'),
  hours: document.querySelector('[data-hours]'),
  minutes: document.querySelector('[data-minutes]'),
  seconds: document.querySelector('[data-seconds]'),
};

refs.btn.disabled = true;
let dataSelected = null;

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    console.log(selectedDates[0]);
    dataSelected = selectedDates[0];

    const delta = dataSelected.getTime() - Date.now();

    if (delta <= 0) {
      Notify.failure('Please choose a date in the future', {
        position: 'center-center',
        backOverlay: 'true',
        clickToClose: true,
      });
    } else {
      refs.btn.disabled = false;
    }
  },
};

flatpickr('#datetime-picker', options);

function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = Math.floor(ms / day);
  // Remaining hours
  const hours = Math.floor((ms % day) / hour);
  // Remaining minutes
  const minutes = Math.floor(((ms % day) % hour) / minute);
  // Remaining seconds
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}

// console.log(convertMs(2000)); // {days: 0, hours: 0, minutes: 0, seconds: 2}
// console.log(convertMs(140000)); // {days: 0, hours: 0, minutes: 2, seconds: 20}
// console.log(convertMs(24140000)); // {days: 0, hours: 6 minutes: 42, seconds: 20}

const DEADLINE = new Date(2022, 9, 8, 16, 50);

refs.btn.addEventListener('click', onStartBtnClick);

function onStartBtnClick() {
  start(DEADLINE);
}

function start(deadline) {
  const delta = deadline.getTime() - Date.now();

  intervalId = setInterval(() => {
    const delta = deadline.getTime() - Date.now();
    if (delta <= 1000) {
      console.log('ДЕДЛАЙН');
      clearInterval(intervalId);
      Notify.success('Deadline!', {
        position: 'center-center',
        backOverlay: 'true',
        clickToClose: true,
      });
      return;
    }
    const data = convertMs(delta);

    refs.days.textContent = addLeadingZero(data.days);
    refs.hours.textContent = addLeadingZero(data.hours);
    refs.minutes.textContent = addLeadingZero(data.minutes);
    refs.seconds.textContent = addLeadingZero(data.seconds);
  }, 1000);
}

function addLeadingZero(value) {
  return String(value).padStart(2, '0');
}