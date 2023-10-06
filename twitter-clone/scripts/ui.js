export const ele = {
  user_name: document.getElementById('user-name'),
  user_tag: document.getElementById('user-tag'),
  pics: document.querySelectorAll('#profile-pic'),
  tweetsArea: document.querySelector('.tweets-area'),
  logoutBtn: document.querySelector('#logout-btn'),
  form: document.querySelector('aside form'),
  main: document.querySelector('main'),
};

// kullanıcı bilgilerini ekrna basar
export const renderUserInfo = (user) => {
  // kullanıcı resimlerini ekran bas
  ele.pics.forEach((img) => (img.src = user.avatar));

  // kullanıcı ismini ekrana bas
  ele.user_name.innerText = user.name;
  ele.user_tag.innerText = '@' + user.profile;
};

// yüklenme gifini ekrana basar
export const renderLoader = (outlet) => {
  outlet.innerHTML = `
    <div class="d-flex justify-content-center my-5">
     <div class="spinner-grow" role="status">
      <span class="visually-hidden">Loading...</span>
     </div>
   </div>
    `;
};

// tweet'in medyasına göre html oluşturur
export const getMedia = (media) => {
  if (media.photo) {
    // img etiketi oluştur
    return `<img src="${media.photo[0].media_url_https}"/> `;
  }

  if (media.video) {
    // video etiketi oluştur
    const mp4 = media.video[0].variants[0].url;
    return `
    <video controls>
       <source src="${mp4}" /> 
    </video>`;
  }

  return '';
};

// ekana tweetleri basıcak fonk
export const renderTimeline = (data, outlet) => {
  outlet.innerHTML = data.timeline
    .map(
      (i) => `
        <div class="tweet">
          <img id="user-img" src="${data.user.avatar}" />
          <div class="body">
            <div class="user">
              <div>
                <b>${data.user.name}</b>
                <p>@${data.user.profile}</p>
                <p>${moment(i.created_at).fromNow()}</p>
              </div>
              <i class="bi bi-three-dots"></i>
            </div>
            <div class="content">
              <p>${i.text}</p>
              ${getMedia(i.media)}
            </div>
            <div class="buttons">
              <button>
                <i class="bi bi-chat"></i>
                <span>${i.replies}</span>
              </button>
              <button>
                <i class="bi bi-recycle"></i>
                <span>${i.retweets}</span>
              </button>
              <button>
                <i class="bi bi-heart"></i>
                <span>${i.favorites}</span>
              </button>
              <button>
                <i class="bi bi-bookmark"></i>
                <span>${i.bookmarks}</span>
              </button>
            </div>
          </div>
        </div>
  `
    )
    .join('');
};

// ekana tweetleri basıcak fonk
export const renderResults = (data, outlet) => {
  outlet.innerHTML = data.timeline
    .map(
      (i) => `
        <div class="tweet">
          <img id="user-img" src="${i.user_info.avatar}" />
          <div class="body">
            <div class="user">
              <div>
                <b>${i.user_info.name}</b>
                <p>@${i.user_info.screen_name}</p>
                <p>${moment(i.created_at).fromNow()}</p>
              </div>
              <i class="bi bi-three-dots"></i>
            </div>
            <div class="content">
              <p>${i.text}</p>
              ${getMedia(i.media)}
            </div>
            <div class="buttons">
              <button>
                <i class="bi bi-chat"></i>
                <span>${i.replies}</span>
              </button>
              <button>
                <i class="bi bi-recycle"></i>
                <span>${i.retweets}</span>
              </button>
              <button>
                <i class="bi bi-heart"></i>
                <span>${i.favorites}</span>
              </button>
              <button>
                <i class="bi bi-bookmark"></i>
                <span>${i.bookmarks}</span>
              </button>
            </div>
          </div>
        </div>
  `
    )
    .join('');
};
