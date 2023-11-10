class Loading {
  $loading = null;
  data = null;

  constructor({ $target }) {
    // 컴포넌트 상태를 통한 제어 방법

    const $loading = document.createElement("div");
    this.$loading = $loading;
    $target.appendChild(this.$loading);

    this.data = { show: false };

    this.render();
  }
  show() {
    this.setState({
      show: true,
    });
  }

  hide() {
    this.setState({
      show: false,
    });
  }

  setState(nextData) {
    this.data = nextData;
    this.render();
  }

  render() {
    if (this.data.show) {
      this.$loading.innerHTML = `
              <div class="Loading"><p>😸로딩중😸</p><div>
              `;
    } else {
      this.$loading.innerHTML = ``;
    }
  }
}
