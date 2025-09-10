/**
 * Date 객체를 "YYYY/MM/DD HH:mm:ss" 형식의 문자열로 변환합니다.
 * @param date 변환할 Date 객체
 * @returns 형식화된 날짜 문자열
 */
export function formatDateWithTime(date: Date): string {
  if (!date || !(date instanceof Date) || isNaN(date.getTime())) {
    return 'Invalid Date';
  }

  const year = date.getFullYear();
  const month = (date.getMonth() + 1).toString().padStart(2, '0');
  const day = date.getDate().toString().padStart(2, '0');
  const hours = date.getHours().toString().padStart(2, '0');
  const minutes = date.getMinutes().toString().padStart(2, '0');
  const seconds = date.getSeconds().toString().padStart(2, '0');

  return `${year}/${month}/${day} ${hours}:${minutes}:${seconds}`;
}

/**
 * Date 객체를 "YYYY-MM-DD (요일)" 형식의 문자열로 변환합니다.
 * @param date 변환할 Date 객체
 * @returns 형식화된 날짜 문자열
 */
export function formatDateWithDay(date: Date): string {
  if (!date || !(date instanceof Date) || isNaN(date.getTime())) {
    return 'Invalid Date';
  }

  const year = date.getFullYear();
  const month = (date.getMonth() + 1).toString().padStart(2, '0');
  const day = date.getDate().toString().padStart(2, '0');

  const dayOfWeekMap = ['일', '월', '화', '수', '목', '금', '토'];
  const dayOfWeek = dayOfWeekMap[date.getDay()];

  return `${year}-${month}-${day} (${dayOfWeek})`;
}
