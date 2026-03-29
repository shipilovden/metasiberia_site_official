(function() {
  function closeMenu() {
    var burger = document.querySelector("#rec872696359 .t-menuburger");
    var panel = document.getElementById("nav872696359");
    var overlay = document.querySelector("#rec872696359 .t450__overlay");

    if (burger) {
      burger.classList.remove("is-open");
      burger.setAttribute("aria-expanded", "false");
    }

    if (panel) {
      panel.classList.remove("is-open");
      panel.setAttribute("aria-hidden", "true");
    }

    if (overlay) {
      overlay.hidden = true;
    }

    document.body.classList.remove("news-menu-open");
  }

  function openMenu() {
    var burger = document.querySelector("#rec872696359 .t-menuburger");
    var panel = document.getElementById("nav872696359");
    var overlay = document.querySelector("#rec872696359 .t450__overlay");

    if (burger) {
      burger.classList.add("is-open");
      burger.setAttribute("aria-expanded", "true");
    }

    if (panel) {
      panel.classList.add("is-open");
      panel.setAttribute("aria-hidden", "false");
    }

    if (overlay) {
      overlay.hidden = false;
    }

    document.body.classList.add("news-menu-open");
  }

  function bindMenu() {
    var burger = document.querySelector("#rec872696359 .t-menuburger");
    var closeButton = document.querySelector("#rec872696359 .t450__close-button");
    var overlay = document.querySelector("#rec872696359 .t450__overlay");

    if (!burger) {
      return;
    }

    burger.addEventListener("click", function() {
      if (burger.classList.contains("is-open")) {
        closeMenu();
        return;
      }

      openMenu();
    });

    if (closeButton) {
      closeButton.addEventListener("click", closeMenu);
    }

    if (overlay) {
      overlay.addEventListener("click", closeMenu);
    }

    document.querySelectorAll("#rec872696359 .t-menu__link-item").forEach(function(link) {
      link.addEventListener("click", closeMenu);
    });

    document.addEventListener("keydown", function(event) {
      if (event.key === "Escape") {
        closeMenu();
      }
    });
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", bindMenu);
  } else {
    bindMenu();
  }
})();
