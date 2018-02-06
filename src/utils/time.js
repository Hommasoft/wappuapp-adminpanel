import moment from 'moment';

function getTimeAgo(date) {
  if (!date) {
    return '';
  }

  const pastMoment = moment(date);
  const minutesInPast = moment().diff(pastMoment, 'minutes');
  if (minutesInPast <= 4) {
    return 'now';
  } else if (minutesInPast < 60) {
    return Math.round(minutesInPast) + 'm';
  } else if (minutesInPast / 60 < 24) {
    return Math.round(minutesInPast / 60) + 'h';
  } else {
    return Math.round(minutesInPast / 60 / 24) + 'd';
  }
}
export default {
  getTimeAgo
};
