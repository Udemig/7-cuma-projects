// Diğer js dosylarından çağırlanlar
import { categories } from './scripts/constants.js';
import { getDate } from './scripts/helpers.js';
import {
  renderCategories,
  ele,
  renderMails,
  toggleModal,
} from './scripts/ui.js';

// lokal'den verilere erişme
const strData = localStorage.getItem('MAILS');
let mailData = JSON.parse(strData);

// sayfanın yüklenme anını izleme
document.addEventListener('DOMContentLoaded', () => {
  renderCategories(categories, 'Gelen Kutusu');
  renderMails(mailData);
});

//! Kategori İşlemler
// kategoriler alanındaki tıklanma olyını izleme
ele.categoryList.addEventListener('click', (event) => {
  // seçilen kategoriyi belirleme
  const selected = event.target.dataset.id;
  // active olanı güncellemek için
  // kategorileri tekrardan ekrana bas
  renderCategories(categories, selected);
});

// hamburger menüye tıklanma olayı
ele.menu.addEventListener('click', (e) => {
  // eğerki hide class' yoksa ekler
  // varsa olan class'ı kaldırır
  ele.nav.classList.toggle('hide');
});

//! Modal İşlemler
// oluştura basınca modalı göster
ele.createBtn.addEventListener('click', () => toggleModal(true));

// x basınca modal'I kapat
ele.closeBtn.addEventListener('click', () => toggleModal(false));

// formun gönderilme olayını izle
ele.modalForm.addEventListener('submit', (e) => {
  e.preventDefault();

  // formdaki inputların verileirine erişme
  const reciever = e.target[1].value;
  const title = e.target[2].value;
  const message = e.target[3].value;

  if (!reciever || !title || !message) {
    alert('Lütfen bütün alanları doldurunuz..');
  } else {
    // diziye eklemek için mail objesi oluşturma
    const newMail = {
      id: new Date().getTime(),
      sender: 'Furkan',
      reciever,
      title,
      message,
      date: getDate(),
    };

    // mailleri diğer mailleri en başına ekle
    mailData.unshift(newMail);

    // yeni oluşan diziyi local storage'a kaydetme
    const strData = JSON.stringify(mailData);
    localStorage.setItem('MAILS', strData);

    // modal'ı kapatmak
    toggleModal(false);

    // güncel mailleri ekrana bas
    renderMails(mailData);
  }
});

//! Mail İşlemler

// maillere tıklanma olyınız izleme
ele.mailsArea.addEventListener('click', updateMail);

// maili hem ekrandan hem lokalden siler
function updateMail(e) {
  // güncellenicek mail'in id sine erişme
  const mail = e.target.parentElement;
  const id = mail.dataset.id;

  // tıklanılan eleman sil butonuysa ve
  // kullanıcı bildirimi onayladıysa:
  if (
    e.target.id === 'delete' &&
    window.confirm('Maili silmek istiyor musunuz?')
  ) {
    //  id'si silincek elemana eşit olamayanları alma
    const filtred = mailData.filter((i) => i.id !== Number(id));

    // lokal'i güncelleme
    localStorage.setItem('MAILS', JSON.stringify(filtred));

    // mail'i html'den kaldırma
    mail.remove();
  }

  // kullanıcı like butonuna tıkladıysa
  if (e.target.id === 'star') {
    const like_id = Number(mail.parentElement.dataset.id);

    // dizideki id'sini bildiğimiz elemana erişme
    const found = mailData.find((i) => i.id === like_id);

    // bulduğumuz elemanın yıldızlı değerini tersine çevir
    const updated = { ...found, starred: !found.starred };

    // dizideki eski eleman yerine güncel haline koy
    mailData = mailData.map((mail) =>
      mail.id === like_id ? updated : mail
    );

    // locale storage'ı güncelle
    localStorage.setItem('MAILS', JSON.stringify(mailData));

    // arayüzü güncelle
    renderMails(mailData);
  }
}
