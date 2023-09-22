// arayüzü ilgelendiren değişken ve fonksiyonlar burada yer alıcak
//! HTML'Den çağrılanlar
export const ele = {
  categoryList: document.querySelector('.categories'),
  menu: document.querySelector('#menu'),
  nav: document.querySelector('nav'),
  mailsArea: document.querySelector('.mails'),
  createBtn: document.querySelector('.create'),
  closeBtn: document.querySelector('.close-modal'),
  modal: document.querySelector('.modal-wrapper'),
  modalForm: document.querySelector('.modal-wrapper form'),
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

//! ekrana mailleri basar
// mailData: maillerin verisi
export function renderMails(mailData) {
  // mail yoksa gonksiyonu çalıştırma
  if (!mailData) return;

  // maller dizisini dön >  herbir eleman
  // için bir tane mail html'i oluştur
  const html = mailData.map(
    (mail) => `
        <div data-id="${mail.id}" class="mail">
            <div class="info">
              <input type="checkbox" />
              <i id="star" class="bi ${
                mail.starred ? 'bi-star-fill' : 'bi-star'
              }"></i>
              <b>${mail.sender}</b>
            </div>
       
            <div class="content">
              <p class="title">${mail.title.slice(0, 30) + '...'}</p>
              <p class="text">${mail.message.slice(0, 35) + '...'}</p>
            </div>
       
            <p class="time">${mail.date}</p>
            
            <button id="delete">Sil</button>
          </div> 
  `
  );

  // ekrana bas
  ele.mailsArea.innerHTML = html.join(' ');
}

// modalı aç kapa yapar
// willOpen: modal'ın açık kapalı olucağını belirler
export function toggleModal(willOpen) {
  // will open değerinde göre display değerini değiştirme
  ele.modal.style.display = willOpen ? 'grid' : 'none';
}
