// api'a göndermemiz greken bilgiler
const options = {
  headers: {
    'X-RapidAPI-Key':
      '75dc092df0msh3c03138e5cc1ea2p19035ejsn916bcc592247',
    'X-RapidAPI-Host': 'twitter-api45.p.rapidapi.com',
  },
};

export class API {
  // kullanıcı isminden hesap bilgilerine erişir
  static async getUser(username) {
    const res = await fetch(
      `https://twitter-api45.p.rapidapi.com/screenname.php?screenname=${username}`,
      options
    );
    //   veirlşeri işle
    const data = await res.json();

    //   verileri döndür
    return data;
  }
}
