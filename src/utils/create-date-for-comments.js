function addZero(num) {
  if (num < 10) return '0' + num;
  else return num
}

export default function createDateForComments(value) {
  let date = new Date(Date.parse(value));

  let day = addZero(date.getDate());
  let month = date.getMonth();
  let year = addZero(date.getFullYear());
  let hours = addZero(date.getHours());
  let minutes = addZero(date.getMinutes());

  switch(month.toString()) {
    case '0': 
      month = 'января'
      break;
    case '1': 
      month = 'февраля'
      break;
    case '2': 
      month = 'марта'
      break;
    case '3': 
      month = 'апреля'
      break;
    case '4': 
      month = 'мая'
      break;
    case '5': 
      month = 'июня'
      break;
    case '6': 
      month = 'июля'
      break;
    case '7': 
      month = 'августа'
      break;  
    case '8': 
      month = 'сентября'
      break;
    case '9': 
      month = 'октября'
      break;
    case '10': 
      month = 'ноября'
      break;
    case '11': 
      month = 'декабря'
      break;
  }

  return `${day} ${month} ${year} в ${hours}:${minutes}`
}