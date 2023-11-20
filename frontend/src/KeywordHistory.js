class KeywordHistory {
  $keywordHistory = null;
  data = null;

  constructor({ $target, onSearch }) {
    const $keywordHistory = document.createElement("ul");
    this.$keywordHistory = $keywordHistory;
    this.$keywordHistory.className = "KeywordHistory";
    $target.appendChild($keywordHistory);

    this.onSearch = onSearch;
    this.init();
    this.render();
  }

  init() {
    let data = this.getHistory();
    this.setState(data);
  }

  addKeyword(keyword) {
    let keywordHistory = this.getHistory();
    keywordHistory.unshift(keyword);
    keywordHistory = keywordHistory.slice(0, 5);
    localStorage.setItem("keywordHistory", keywordHistory.join(","));
    this.init();
  }

  getHistory() {
    return localStorage.getItem("keywordHistory") === null
      ? []
      : localStorage.getItem("keywordHistory").split(",");
  }

  setState(nextData) {
    this.data = nextData;
    this.render();
  }

  render() {
    this.$keywordHistory.innerHTML = this.data
      .map((keyword) => `<li><button>${keyword}</button></li>`)
      .join(""); // html 태그는 join을 해줘야 한다.

    this.$keywordHistory
      .querySelectorAll("li button")
      .forEach(($data, index) => {
        $data.addEventListener("click", () => {
          console.log(this.data[index]);
          this.onSearch(this.data[index]);
        });
      });
  }
}
