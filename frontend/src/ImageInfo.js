class ImageInfo {
  $imageInfo = null;
  data = null;

  constructor({ $target, data }) {
    const $imageInfo = document.createElement("div");
    $imageInfo.className = "ImageInfo";
    this.$imageInfo = $imageInfo;
    $target.appendChild($imageInfo);

    this.data = data;

    this.render();
  }

  setState(nextData) {
    this.data = nextData;
    this.render();
  }

  showDetail(data) {
    console.log(data);
    api.fetchCatDetail(data.cat.id).then(({ data }) => {
      this.setState({
        visible: true,
        cat: data,
      });
    });
  }

  /* 모달창 닫기 메소드 */
  closeImageInfo() {
    this.setState({
      visible: false,
      cat: undefined,
    });
  }

  render() {
    if (this.data.visible) {
      const { name, url, temperament, origin } = this.data.cat;

      this.$imageInfo.innerHTML = `
        <div class="content-wrapper">
          <div class="title">
            <span>${name}</span>
            <div class="close">x</div>
          </div>
          <img src="${url}" alt="${name}"/>        
          <div class="description">
            <div>성격: ${temperament}</div>
            <div>태생: ${origin}</div>
          </div>
        </div>`;
      this.$imageInfo.style.display = "block";

      // this.$imageInfo.querySelector(".close").addEventListener("click", (e) => {
      //   this.closeImageInfo();
      // });

      /* Esc 키보드 이벤트 사용한 모달창 닫기 */
      document.addEventListener("keydown", (e) => {
        console.log(e.key);
        if (e.key === "Escape") {
          this.closeImageInfo();
        }
      });

      /* click 이벤트 사용한 모달창 닫기 */
      this.$imageInfo.addEventListener("click", (e) => {
        console.log(e.target.className);
        if (e.target.className === "ImageInfo" || "close") {
          this.closeImageInfo();
        }
      });
    } else {
      this.$imageInfo.style.display = "none";
    }
  }
}
