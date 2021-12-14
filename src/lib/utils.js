/******************************************************************************
 * * formatNumber
 *
 * format a number (like a float) according to the local formatting rules
 * (e.g. 1234.567 => "1,234.567")
 *****************************************************************************/
const locale = 'en-US';
export const formatNumber = (value, decimals = 0) =>
  Intl.NumberFormat(locale, {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  }).format(value);
/******************************************************************************
 * * formatFloatPrice
 *
 * format a number to a ZAR currency string,
 * (e.g. 1234.567 => "R 1,234.57")
 *****************************************************************************/
export const formatFloatPrice = (price, cents = true) => {
  const priceFloat = parseFloat(price);
  if (Number.isNaN(priceFloat)) {
    return '';
  }
  const priceToFormat = cents ? priceFloat.toFixed(2) : price;
  const decimals = cents ? 2 : 0;
  return `R ${formatNumber(priceToFormat, decimals, locale)}`;
};
/******************************************************************************
 * * convertCentToRand
 *
 * Get Rand string from provided cents
 *
 * input cents = 1234567
 * returns: "R 12,345.67"
 *****************************************************************************/
export const convertCentToRand = (cents) => {
  cents = strToInt(cents);
  if (!cents) {
    return 'R 0.00';
  }
  const negative_symbol = cents < 0 ? '- ' : '';
  if (negative_symbol) {
    cents *= -1;
  }
  const rands = parseInt(cents / 100);
  const rands_formatted = formatNumber(rands);
  const cent_rem = cents % 100;
  const cent_formatted = `${cent_rem}`.padStart(2, '0');
  return `${negative_symbol}R ${rands_formatted}.${cent_formatted}`;
};
/******************************************************************************
 * * isNumber
 *
 * Test if the input string is a valid number
 *****************************************************************************/
export const isNumber = (strOrNumber) => !isNaN(parseInt(strOrNumber));
/******************************************************************************
 * * strToInt
 *
 * convert input to Int
 * can take string or number input
 * returns the integer on success or false on fail
 *****************************************************************************/
export const strToInt = (strOrNumber) => {
  const parsed = parseInt(strOrNumber);
  return isNaN(parsed) ? false : parsed;
};
/******************************************************************************
 * * getTimestampStats
 *
 * Get stats from a provided timestamp.
 *
 * returns: [
 *   0: elapsed time string,
 *   1: timestamp as string
 * ]
 *****************************************************************************/
export const getTimestampStats = (timestamp) => {
  let timestampStr = 'unknown';
  let timeElapsed = '';

  if (timestamp) {
    const timestampParsed = Date.parse(timestamp);
    const timestampObj = new Date(timestampParsed);
    timestampStr = timestampObj.toLocaleString('en-ZA');
    const currentTimeObj = new Date();
    const timeDiff = currentTimeObj - timestampObj;
    const diffSeconds = Math.ceil(timeDiff / 1000);
    const diffMinutes = Math.floor(diffSeconds / 60);
    const diffHours = Math.floor(diffMinutes / 60);
    const diffDays = Math.floor(diffHours / 24);
    const diffMonths = Math.floor(diffDays / 30);
    const diffYears = Math.floor(diffDays / 365);
    const timeList = [
      [diffYears, 'year'],
      [diffMonths, 'month'],
      [diffDays, 'day'],
      [diffHours, 'hour'],
      [diffMinutes, 'minute'],
      [diffSeconds, 'second'],
    ];
    for (const [value, division] of timeList) {
      if (value) {
        timeElapsed = `${value} ${division}${value <= 1 ? '' : 's'} ago`;
        break;
      }
    }
  }

  return { timeElapsed, timestampStr };
};
/******************************************************************************
 * * arraysAreEqual
 *
 * Test if arrays are equal
 *****************************************************************************/
export const arraysAreEqual = (arr1, arr2) => {
  if (arr1?.length && arr1?.length === arr2?.length) {
    for (let i = 0; i < arr1.length; i++) {
      if (arr1[i] !== arr2[i]) {
        // return early because of element mismatch
        return false;
      }
    }
    // return true here because false wasn't returned earlier
    return true;
  }
  // return false as fallback
  return false;
};
/******************************************************************************
 * * sleep
 *
 * Sleep for the specified amount of miliseconds
 *****************************************************************************/
export const sleep = (ms) => {
  return new Promise((resolve) => setTimeout(resolve, ms));
};
/******************************************************************************
 * * insertIntoArrayInPlace
 *
 * Inserts the value into the provided array at the specified index.
 * The insert value can be either an item or an array
 * The array is modified in place, but a reference is also returned
 *
 * e.g.
 *
 * const a = [1, 2, 3, 4, 5, 6]
 * insertIntoArrayInPlace(a, 3, 99)
 * a -> [1, 2, 3, 99, 4, 5, 6]
 *
 * const a = [1, 2, 3, 4, 5, 6]
 * insertIntoArrayInPlace(a, 3, [88, 99])
 * a -> [1, 2, 3, 88, 99, 4, 5, 6]
 *****************************************************************************/
export const insertIntoArrayInPlace = (array, index, value) => {
  if (!Array.isArray(value)) {
    value = [value];
  }
  Array.prototype.splice.apply(array, [index, 0].concat(value));
  return array;
};
/******************************************************************************
 * * JSONcopy
 *
 * Uses JSON.stringify to convert an object to string then converts that string
 * back to an object by parsing the string with JSON.parse
 *
 * This converts invalid numbers like infinity and NaN to null and removes any
 * undefined fields
 *
 * e.g.
 * const start     = {a: 1, b: 2, c: undefined, d: Infinity, e: NaN}
 * JSONcopy(start) = {a: 1, b: 2,               d: null,     e: null}
 *****************************************************************************/
export const JSONcopy = (obj) => JSON.parse(JSON.stringify(obj));
/******************************************************************************
 * * convertSecsToHoursAndMins
 *
 * convertes seconds to Hours:Minutes string

 * e.g.
 * secs: 5400
 * return: 1:30
 *****************************************************************************/
export const convertSecsToHoursAndMins = (secs) => {
  let hours = parseInt(secs / 3600);
  let minutes = `${Math.round((secs % 3600) / 60)}`.padStart(2, '0');
  return `${hours}:${minutes}`;
};
