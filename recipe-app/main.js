import { categories } from './scripts/constant.js';
import {
  ele,
  renderBasketItems,
  renderLoader,
  renderResults,
} from './scripts/ui.js';
import { Search } from './scripts/search.js';
import { Recipe } from './scripts/recipe.js';
import { v4 } from 'https://jspm.dev//uuid';

// class'ın örneğini alma
const search = new Search();
const recipe = new Recipe();

//! Olay İzleyicileri
document.addEventListener('DOMContentLoaded', () => {
  const index = Math.floor(Math.random() * categories.length);
  getResults(categories[index]);
});

ele.recipeArea.addEventListener('click', handleClick);

ele.form.addEventListener('submit', (e) => {
  e.preventDefault();
  const query = e.target[0].value;
  getResults(query);
});

// url'deki #'in değişme olayı
window.addEventListener('load', getRecipe);
window.addEventListener('hashchange', getRecipe);

//! Fonksiyonlar
//* arama sonuçlarını çekip ekrana basar
async function getResults(query) {
  // form boşsa uyarı ver
  if (!query) {
    Toastify({
      text: 'Lütfen formu doldurun',
      duration: 3000,
      close: true,
      gravity: 'bottom',
      stopOnFocus: true,
      style: {
        background: 'linear-gradient(to right, #fbda61, #ff5acd)',
        textShadow: '0 0 30px black',
      },
    }).showToast();

    return;
  }
  // form doluysa
  // loader bas
  renderLoader(ele.result_list);

  // 1 saniye bekletme
  // await new Promise((resolve) => setTimeout(resolve, 1000));

  try {
    // api'ye istek at
    await search.fetchResults(query);

    // sonuçları ekrana bas
    renderResults(search.results.recipes);
  } catch (err) {
    Toastify({
      text: 'Aradığınız kriterlere uygun ürün bulunamadı.',
      duration: 3000,
      close: true,
      gravity: 'bottom',
      stopOnFocus: true,
      style: {
        background: 'linear-gradient(to right, #fbda61, #ff5acd)',
        textShadow: '0 0 30px black',
      },
    }).showToast();

    // loader'ı sil
    ele.result_list.innerHTML = '';
  }
}

// tarif detayını getirir
async function getRecipe() {
  const id = location.hash.slice(1);
  if (id) {
    renderLoader(ele.recipeArea);

    try {
      // tarif bilgileini al
      await recipe.getRecipe(id);

      // ekrana tarif bilgilerini bas
      recipe.renderRecipe(recipe.info);

      // tarif alanına scroll'la
      ele.recipeArea.scrollIntoView({ behavior: 'smooth' });
    } catch {
      // hata olursa
      Toastify({
        text: 'Ürün detayları alınamadı.',
        duration: 3000,
        close: true,
        gravity: 'bottom',
        stopOnFocus: true,
        style: {
          background: 'red',
          textShadow: '0 0 30px black',
        },
      }).showToast();
    }
  }
}

//! sepet alanı
let basket = JSON.parse(localStorage.getItem('BASKET')) || [];

document.addEventListener('DOMContentLoaded', () =>
  renderBasketItems(basket)
);

// tarif alanlarındaki tıklamada çalışır
function handleClick(e) {
  if (e.target.id === 'like-btn') {
    recipe.controlLike();
  }

  if (e.target.id === 'add-to-cart') {
    // her bir tarifi id ekleme
    recipe.ingredients.forEach((title) => {
      // her bir tarif için obje olşturduk ve id ekleme
      const newItem = {
        id: v4(),
        title,
      };

      // yeni tarifi sepete ekle
      basket.push(newItem);
    });

    // lokal'i güncelle
    localStorage.setItem('BASKET', JSON.stringify(basket));

    // ekrana sepet elemanlarını basma
    renderBasketItems(basket);
  }
}

// sepeti sıfırlama
ele.clear.addEventListener('click', () => {
  const res = confirm('Sepeti temzilenicek emin misiniz?');

  if (res) {
    // local'i temizle
    localStorage.removeItem('BASKET');
    // sepet dizisini sıfırla
    basket = [];
    // arayüzü temizle
    ele.basket_list.innerHTML = '';
  }
});

// tek tek silme

ele.basket_list.addEventListener('click', (e) => {
  if (e.target.id === 'delete-item') {
    const parent = e.target.parentElement;
    const delete_id = parent.dataset.id;

    basket = basket.filter((i) => i.id !== delete_id);
    localStorage.setItem('BASKET', JSON.stringify(basket));

    parent.remove();
  }
});
