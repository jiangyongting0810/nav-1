const $siteList = $(".siteList");
const $lastLi = $siteList.find("li.last");
const x = localStorage.getItem("x");
const xObject = JSON.parse(x);
const hashMap = xObject || [
  { logo: "B", url: "https://www.bilibili.com" },
  { logo: "Y", url: "https://www.youtube.com" },
];

const simplifyUrl = (url) => {
  return url
    .replace("http://", "")
    .replace("https://", "")
    .replace(".com", "")
    .replace("www.", "")
    .replace(/\/.*/, "");
};

const render = () => {
  $siteList.find("li:not(.last)").remove();
  hashMap.forEach((Node, index) => {
    const $li = $(`<li>
        <div class="site">
            <div class="logo">
              ${Node.logo}
            </div>
            <div class="close">
              <svg class="icon">
                <use xlink:href="#icon-close"></use>
              </svg> 
            <div>
            <div class="link">${simplifyUrl(Node.url)}</div>
        </div>
  </li>`).insertBefore($lastLi);
    $li.on("click", () => {
      window.open(Node.url);
    });
    $li.on("click", ".close", (e) => {
      e.stopPropagation();
      hashMap.splice(index, 1);
      render();
    });
  });
};

render();
$(".addButton").on("click", () => {
  let url = window.prompt("请问你要添加的网址是？");
  if (url.indexOf("http") !== 0) {
    url = "http://" + url;
  }
  hashMap.push({
    logo: simplifyUrl(url)[0],
    url: url,
  });

  render();
});

window.onbeforeunload = () => {
  const string = JSON.stringify(hashMap);
  localStorage.setItem("x", string);
};
