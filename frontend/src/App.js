console.log("app is running!");

class App {
  $target = null;
  data = [];

  constructor($target) {
    this.$target = $target;

    this.Loading = new Loading({
      $target,
    });

    this.DarkModeToggle = new DarkModeToggle({
      $target,
    });

    this.searchInput = new SearchInput({
      $target,
      onSearch: (keyword) => {
        // 로딩 show
        // console.log("show");
        this.Loading.show();
        //fetchCate는 요청을 의미한다.
        api.fetchCats(keyword).then(({ data }) => {
          this.setState(data);
          // console.log("hide");
          // 로딩 hide
          this.Loading.hide();
          //로컬에 저장
          this.saveResult(data);
        });
      },
      onRandomSearch: () => {
        // 로딩 show
        // console.log("show");
        this.Loading.show();
        //fetchCate는 요청을 의미한다.
        api.fetchRandomCats().then(({ data }) => {
          this.setState(data);
          // console.log("hide");
          this.Loading.hide();
          // 로딩 hide
        });
      },
    });

    this.searchResult = new SearchResult({
      $target,
      initialData: this.data,
      onClick: (cat) => {
        this.imageInfo.showDetail({
          /* visible을 통해 모달창을 띄워준다. */
          visible: true,
          cat,
        });
      },
    });

    this.imageInfo = new ImageInfo({
      $target,
      data: {
        visible: false,
        image: null,
      },
    });
    this.init();
  }

  setState(nextData) {
    // console.log(this);
    this.data = nextData;
    this.searchResult.setState(nextData);
  }

  saveResult(result) {
    console.log(result);

    //JSON을 string으로 바꿀 때, stringfy사용
    localStorage.setItem("lastResult", JSON.stringify(result));
  }

  init() {
    //JSON에 저장된 것을 자바스크립트에서 사용할 수 있는 배열로 바꿀 때, parse 사용
    const lastResult =
      localStorage.getItem("lastResult") === null
        ? []
        : JSON.parse(localStorage.getItem("lastResult"));
    console.log(lastResult);
    this.setState(lastResult);
  }
}
