const HASH_SEPARATOR = "#";
const EN_LANG = "en";
const AR_LANG = "ar";

$(document).ready(function () {
  let lang = resolveLanguage();
  showTextInLanguage(lang);
  let $langSelector = $("#lang-selector");
  $langSelector.on("change", function (e) {
    let selectedLang = $langSelector.val();
    showTextInLanguage(selectedLang);
  });

  initScroll();
});

function initScroll() {
  let controller = new ScrollMagic.Controller();

  new ScrollMagic.Scene({
    duration: "100%"
  })
    .setPin(".parallax")
    .addTo(controller);
}

function showTextInLanguage(lang) {
  setLanguageInUrl(lang);
  $(".txt").each((_, e) => {
    if (e.id) {
      if (lang === EN_LANG || lang === AR_LANG) {
        let obj = eval(lang);
        let translation = obj[e.id];
        if (translation) {
          e.innerHTML = translation;
          if (lang === AR_LANG) {
            e.classList.add(AR_LANG + "-txt");
          } else {
            e.classList.remove(AR_LANG + "-txt");
          }
        }
      }
    }
  });
}

function resolveLanguage() {
  let url = $(location).attr("href");
  let index = url.indexOf(HASH_SEPARATOR);
  if (index > 0) {
    let lang = url.substring(index + 1);
    if (lang === AR_LANG) {
      return AR_LANG;
    }
  }
  return EN_LANG; // default
}

function setLanguageInUrl(lang) {
  let url = $(location).attr("href");
  let base;
  let index = url.indexOf(HASH_SEPARATOR);
  if (index > 0) {
    base = url.substring(0, index);
  } else {
    base = url;
  }
  $(location).attr("href", base + HASH_SEPARATOR + lang);
}
