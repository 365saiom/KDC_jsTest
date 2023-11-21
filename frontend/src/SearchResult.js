class SearchResult {
  $searchResult = null;
  data = null;
  onClick = null;

  constructor({ $target, initialData, onClick, onNextPage }) {
    const $wrapper = document.createElement("sections");
    this.$searchResult = document.createElement("ul");
    this.$searchResult.className = "SearchResult";
    $wrapper.appendChild(this.$searchResult);
    $target.appendChild($wrapper);

    this.data = initialData;
    this.onClick = onClick;
    this.onNextPage = onNextPage;

    this.render();
  }

  setState(nextData) {
    this.data = nextData;
    this.render();
  }
  // 요소가 화면에 보이는 지를 감지하는 메소드
  isElementInViewport(el) {
    // rect = 좌표 정보이며, 각 요소 이미지의 왼쪽 상단의 꼭지점이 좌표 기준이 된다.
    var rect = el.getBoundingClientRect();
    return (
      rect.top >= 0 &&
      rect.left >= 0 &&
      rect.bottom <=
        (window.innerHeight || document.documentElement.clientHeight) &&
      rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
  }

  applyEventToElement = (items) => {
    document.addEventListener("scroll", () => {
      items.forEach((el, index) => {
        console.log(items.length);
        console.log(index);
        if (this.isElementInViewport(el) && items.length - 1 === index) {
          this.onNextPage();
        }
      });
    });
  };

  render() {
    this.$searchResult.innerHTML = this.data
      .map(
        (cat) => `
          <li class="item">
            <img src=${cat.url} alt=${cat.name} />
          </li>
        `
      )
      .join("");

    this.$searchResult.querySelectorAll(".item").forEach(($item, index) => {
      $item.addEventListener("click", () => {
        this.onClick(this.data[index]);
      });
    });

    let listItems = this.$searchResult.querySelectorAll(".item");
    this.applyEventToElement(listItems);
  }
}
