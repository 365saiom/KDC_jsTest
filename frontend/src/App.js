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
          this.Loading.hide();
          // 로딩 hide
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
  }

  setState(nextData) {
    // console.log(this);
    this.data = nextData;
    this.searchResult.setState(nextData);
  }
}
