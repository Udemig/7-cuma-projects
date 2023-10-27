import { ele } from './ui.js';

export class Recipe {
  constructor() {
    //  like'lanalar dizisi
    this.likes = JSON.parse(localStorage.getItem('LIKES')) || [];

    // tarif hakınndaki bilgiler
    this.info = {};

    // tarifin malzemeleri
    this.ingredients = [];

    // başlangıçta like'lanan eleman varsa listele
    this.renderLikes();
  }

  // api'den tarif bilgilerini alaan method
  async getRecipe(id) {
    const res = await fetch(
      `https://forkify-api.herokuapp.com/api/get?rId=${id}`
    );
    // verileri işleme
    const data = await res.json();

    // bilgileri class'a tanımalama
    this.info = data.recipe;
    this.ingredients = data.recipe.ingredients;
  }

  // tarifin adımları içerien bir li elemanı döndürür
  createIngredient() {
    return this.ingredients
      .map(
        (i) => `
          <li>
              <i class="bi bi-check-circle"></i>
              <p>${i}</p>
          </li>
       `
      )
      .join(' ');
  }

  // tarif detayını ekrana basar
  renderRecipe(r) {
    ele.recipeArea.innerHTML = `
        <!-- resim alanı -->
        <figure>
          <img
            src="${r.image_url}"
          />
          <h1>${r.title}</h1>

          <p class="like-area">
            <i id="like-btn" class="bi ${
              this.isRecipeLiked() ? 'bi-heart-fill' : 'bi-heart'
            }"></i>
          </p>
        </figure>
        <!-- tarif -->
        <div class="ingredients">
          <ul>
            ${this.createIngredient()}
          </ul>
          <button id="add-to-cart" class="CartBtn">
            <span class="IconContainer">
              <i class="bi bi-cart-fill"></i>
            </span>
            <p class="text">Sepete Ekle</p>
          </button>
        </div>

        <!-- nasıl pişirilir -->
        <div class="directions">
          <h2>Nasıl Pişirilir?</h2>
          <p>
            Bu tarif dikkatlice <span>${r.publisher}</span> tarafından
            hazırlanmış ve test edilmiştir. Diğer detaylara onların
            websitesi üzerinden erişebilirsiniz.
          </p>

          <a href="${r.publisher_url}" target="_blank">Yönerge</a>
        </div>
    `;
  }

  // tarif like'lanmış mı kontrol eder
  isRecipeLiked() {
    // dizideyse elemanı, değilse undefined dödürür
    return this.likes.find((i) => i.id === this.info.recipe_id);
  }

  // like durumana göre aksiyon alır
  controlLike() {
    // ihticamız olan değerleri alma
    const newObject = {
      id: this.info.recipe_id,
      img: this.info.image_url,
      title: this.info.title,
    };

    if (this.isRecipeLiked()) {
      // eklenmişse > tarifi diziden kaldır
      this.likes = this.likes.filter((i) => i.id !== newObject.id);
    } else {
      // eklenemişse > tarifi dizye ekle
      this.likes.push(newObject);
    }

    // local storage'ı güncelle
    localStorage.setItem('LIKES', JSON.stringify(this.likes));

    // detay arayüzü'nu güncelle
    this.renderRecipe(this.info);

    //like listesini güncelle
    this.renderLikes();
  }

  // like'lanna lemeanları ekran basar
  renderLikes() {
    ele.like_list.innerHTML = this.likes
      .map(
        (i) => `
          <a href="#${i.id}">
              <img
                src="${i.img}"
              />
              <span>${i.title}</span>
            </a>
  `
      )
      .join(' ');
  }
}
