class DarkModeToggle {
  isDarkMode = null;

  constructor({ $target }) {
    const $wrapper = document.createElement("section");
    const $DarkModeToggle = document.createElement("input");
    this.$DarkModeToggle = $DarkModeToggle;
    this.$DarkModeToggle.type = "checkbox";

    $DarkModeToggle.className = "DarkModeToggle";
    $wrapper.appendChild($DarkModeToggle);
    $target.appendChild($wrapper);

    $DarkModeToggle.addEventListener("change", (e) => {
      this.setColorMode(e.target.checked);
    });

    this.initColorMode();
  }
  /* 초기화 */
  initColorMode() {
    // 현재 브라우저 모드의   상태를 확인할 수 있다.
    // isDarkMode state를 초기화
    // console.log(window.matchMedia("(prefer-color-scheme:dark)").matches);
    this.isDarkMode = window.matchMedia("(prefer-color-scheme:dark)").matches;
    // checked 박스 상태 초기화
    this.$DarkModeToggle.checked = this.isDarkMode;
    // console.log(this.isDarkMode);
    this.setColorMode(this.isDarkMode);
  }

  setColorMode(isDarkMode) {
    document.documentElement.setAttribute(
      "color-mode",
      isDarkMode ? "dark" : "light"
    );
  }
}
