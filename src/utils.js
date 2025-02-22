const propNames = new Set(['id', 'className', 'textContent', 'onclick']);

/**
 * Создание элемента со свойствами и вложенными элементами
 * @param name {String} Название HTML тега
 * @param props {Object} Свойства и атрибуты элемента
 * @param children {...Node} Вложенные элементы
 * @returns {HTMLElement}
 */
export function createElement(name, props = {}, ...children) {
  const element = document.createElement(name);

  // Назначение свойств и атрибутов
  for (const name of Object.keys(props)) {
    if (propNames.has(name)) {
      element[name] = props[name];
    } else {
      element.setAttribute(name, props[name]);
    }
  }

  // Вставка вложенных элементов
  for (const child of children) {
    element.append(child);
  }

  return element;
}

/**
 * Генерация id
 * @param startId {number} число, с которого начинается отсчет 
 * @returns {number}
 */
function createId(startId = 7) {
  if(!sessionStorage.getItem('lastId')) {
    sessionStorage.setItem('lastId', startId )
  } 

  let num = +sessionStorage.getItem('lastId');
  num++;
  sessionStorage.setItem('lastId', num);
  return num;
}
export {createId};

function createEnding(num, value, changedValue) {
  if (/1(?=[2|3|4]$)/.test(num)) return value;

  if (/([2|3|4]$)/.test(num)) return changedValue;
  else return value;
}
export {createEnding}