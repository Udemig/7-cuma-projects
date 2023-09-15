// arayüzü ilgelendiren değişken ve fonksiyonlar burada yer alıcak
//! HTML'Den çağrılanlar
export const ele = {
  categoryList: document.querySelector('.categories'),
  menu: document.querySelector('#menu'),
  nav: document.querySelector('nav'),
};

//! ekrana kategorileri basar
// data: ekrana basılacak verileri
// active: seçili kategori
export function renderCategories(data, active) {
  // daha önce eklenen kategorileri temizle
  ele.categoryList.innerHTML = '';

  //  dizideki her bir kategori için fonksiyon çalıştırma
  data.forEach((category) => {
    // göndermek istediğimiz elementi oluşturma
    const categoryItem = document.createElement('li');

    // elemana hangi olduğunu ekliyecez
    categoryItem.dataset.id = category.id;

    // eğerki eleman seçilmiş ise active class'ı ver
    categoryItem.classList = category.id == active && 'active';

    // elementin içeriğini belirleme
    categoryItem.innerHTML = `
    <i class="${category.icon}"></i>
    <span>${category.title}</span>
    `;

    // oluiurduğumuz elementi html'e gönderme
    ele.categoryList.appendChild(categoryItem);
  });
}
