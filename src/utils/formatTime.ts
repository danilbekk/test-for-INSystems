export const formatTime = (timestamp: number):string =>  {
  const currentTime: number = Date.now();
  const difference: number = currentTime - timestamp;

  if (difference < 60000) {
    const seconds: number = Math.floor(difference / 1000);
    return `${seconds} ${pluralize(seconds, 'секунда', 'секунды', 'секунд')} назад`;
  } else if (difference < 3600000) {
    const minutes: number = Math.floor(difference / 60000);
    return `${minutes} ${pluralize(minutes, 'минута', 'минуты', 'минут')} назад`;
  } else if (difference < 86400000) {
    const hours: number = Math.floor(difference / 3600000);
    return `${hours} ${pluralize(hours, 'час', 'часа', 'часов')} назад`;
  } else {
    const days: number = Math.floor(difference / 86400000);
    return `${days} ${pluralize(days, 'день', 'дня', 'дней')} назад`;
  }
}

function pluralize(number: number, one: string, few: string, many: string): string {
  if (number % 10 === 1 && number % 100 !== 11) {
    return one;
  } else if (number % 10 >= 2 && number % 10 <= 4 && (number % 100 < 10 || number % 100 >= 20)) {
    return few;
  } else {
    return many;
  }
}