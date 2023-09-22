import { month_tr } from './constants.js';

// tarihi gin ve ay ismi cinsinden geri döndürür ve
export function getDate() {
  const date = new Date();

  const day = date.getDate();
  const monthIndex = date.getMonth();

  //   fonksiyonun çağrıldığı yere döndürme
  return day + ' ' + month_tr[monthIndex];
}
