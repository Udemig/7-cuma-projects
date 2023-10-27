export class Search {
  constructor() {
    // sonuçlar
    this.results = [];
  }

  async fetchResults(query) {
    try {
      const res = await fetch(
        `https://forkify-api.herokuapp.com/api/search?q=${query}`
      );

      // veriy işleme
      const data = await res.json();

      // sınıf yardımıyla oluşturdğumuz değişkene gönderme
      this.results = data;
    } catch (err) {
      console.log(err);
    }
  }
}
