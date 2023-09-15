// Diğer js dosylarından çağırlanlar
import { categories } from './scripts/constants.js';
import { renderCategories, ele } from './scripts/ui.js';

// sayfanın yüklenme anını izleme
document.addEventListener('DOMContentLoaded', () => {
  renderCategories(categories, 'Gelen Kutusu');
});

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
