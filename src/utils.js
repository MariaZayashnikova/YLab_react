/**
 * Плюрализация
 * Возвращает вариант с учётом правил множественного числа под указанную локаль
 * @param value {Number} Число, под которое выбирается вариант формы.
 * @param variants {Object<String>} Варианты форм множественного числа.
 * @example plural(5, {one: 'товар', few: 'товара', many: 'товаров'})
 * @param [locale] {String} Локаль (код языка)
 * @returns {String}
 */
export function plural(value, variants = {}, locale = 'ru-RU') {
  // Получаем фурму кодовой строкой: 'zero', 'one', 'two', 'few', 'many', 'other'
  // В русском языке 3 формы: 'one', 'few', 'many', и 'other' для дробных
  // В английском 2 формы: 'one', 'other'
  const key = new Intl.PluralRules(locale).select(value);
  // Возвращаем вариант по ключу, если он есть
  return variants[key] || '';
}

/**
 * Генератор чисел с шагом 1
 * @returns {Function}
 */
export function codeGenerator(start = 0) {
  return () => ++start;
}

/**
 * Форматирование разрядов числа
 * @param value {Number}
 * @param options {Object}
 * @returns {String}
 */
export function numberFormat(value, locale = 'ru-RU', options = {}) {
  return new Intl.NumberFormat(locale, options).format(value);
}

/**
 * Создание активных страниц 
 * @param currentPage {Number}
 * @param maxPage {Number}
 * @returns {Array}
 */
export function createActiveRoutes(currentPage, maxPage) {
  if (currentPage === 3) return [2, 3, 4, '...'];

  if (currentPage === maxPage || currentPage === maxPage - 1) {
    return ['...', maxPage - 2, maxPage - 1];
  }
  
  if (currentPage === maxPage - 2) {
    return ['...', maxPage - 3, maxPage - 2, maxPage - 1];
  }
  
  if (currentPage > 3 && currentPage !== maxPage && currentPage !== maxPage - 1) {
    return ['...', currentPage - 1, currentPage, currentPage + 1, '...'];
  }

  return [2, 3, '...'];
}