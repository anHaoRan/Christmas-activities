import moment from 'moment';

const PHONE_REG = /^1[3|5|7|8]\d{9}$/;

function toten(num) {
  return num > 9 ? ('' + num) : ('0' + num);
}

export function checkPhone(phone) {
  return PHONE_REG.test(phone);
}

export function time2str(timestamp) {
  if (!timestamp) {
    return '';
  }
  let date = new Date(timestamp);
  return date.getFullYear() + '-' + toten(date.getMonth() + 1) + '-' + toten(date.getDate()) + ' ' + toten(date.getHours()) + ':' + toten(date.getMinutes());
  // return timestamp ? moment(timestamp).format('YYYY-MM-DD hh:mm') : '';
}

// export function date2str(timestamp) {
//   return timestamp ? moment(timestamp).format('YYYY-MM-DD') : '';
// }

export function hasClass(el, className) {
  if (el.classList)
    return el.classList.contains(className)
  else
    return !!el.className.match(new RegExp('(\\s|^)' + className + '(\\s|$)'))
}

export function addClass(el, className) {
  if (el.classList)
    el.classList.add(className)
  else if (!hasClass(el, className)) el.className += " " + className
}

export function removeClass(el, className) {
  if (el.classList)
    el.classList.remove(className)
  else if (hasClass(el, className)) {
    var reg = new RegExp('(\\s|^)' + className + '(\\s|$)')
    el.className=el.className.replace(reg, ' ')
  }
}