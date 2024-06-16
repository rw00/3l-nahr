const HASH_SEPARATOR = "#";
const EN_LANG = "en";
const AR_LANG = "ar";

$(document).ready(function () {
  initLanguage();

  initScroll();

  activateCollapseButtons();

  $("#more-info-list a").on("click", function (e) {
    e.preventDefault();
    $(this).tab("show");
  });
});

function initLanguage() {
  let lang = resolveLanguage();
  showTextInLanguage(lang);
  let $langSelector = $("#lang-selector");
  $langSelector.val(lang);
  $langSelector.on("change", function (e) {
    let selectedLang = $langSelector.val();
    showTextInLanguage(selectedLang);
    setLanguageInUrl(selectedLang);
  });
}

function initScroll() {
  let controller = new ScrollMagic.Controller();

  new ScrollMagic.Scene({
    duration: "100%"
  })
    .setPin(".parallax")
    .addTo(controller);
}

function activateCollapseButtons() {
  $(".collapse-content-btn").click(function (event) {
    this.classList.toggle("active");
    let collapsibleContent = this.nextElementSibling;
    if (collapsibleContent.classList.contains("collapsible-content-display")) {
      if (collapsibleContent.style.display === "none") {
        collapsibleContent.style.display = "block";
      } else {
        collapsibleContent.style.display = "none";
      }
    } else {
      if (collapsibleContent.style.maxHeight) {
        collapsibleContent.style.maxHeight = null;
      } else {
        collapsibleContent.style.maxHeight = collapsibleContent.scrollHeight + "px";
      }
    }
  });
}

function showTextInLanguage(lang) {
  if (lang === EN_LANG || lang === AR_LANG) {
    $(".txt").each((_, e) => {
      if (e.id) {
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
    });
  }
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
