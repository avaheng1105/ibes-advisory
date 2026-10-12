(function () {
  var header = document.querySelector(".site-header");
  function onScroll() {
    if (header) header.classList.toggle("scrolled", window.scrollY > 20);
  }
  onScroll();
  window.addEventListener("scroll", onScroll, { passive: true });

  // Mobile menu
  var toggle = document.querySelector(".menu-toggle");
  if (toggle) {
    toggle.addEventListener("click", function () {
      var open = document.body.classList.toggle("menu-open");
      toggle.setAttribute("aria-expanded", open ? "true" : "false");
    });
    document.querySelectorAll(".menu a").forEach(function (a) {
      a.addEventListener("click", function () { document.body.classList.remove("menu-open"); });
    });
  }

  // Reveal on scroll
  var items = document.querySelectorAll(".reveal");
  if ("IntersectionObserver" in window) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) { e.target.classList.add("in"); io.unobserve(e.target); }
      });
    }, { threshold: 0.12, rootMargin: "0px 0px -40px 0px" });
    items.forEach(function (el) { io.observe(el); });
  } else {
    items.forEach(function (el) { el.classList.add("in"); });
  }

  // Spotlight on service tiles
  document.querySelectorAll(".svc").forEach(function (card) {
    card.addEventListener("mousemove", function (e) {
      var r = card.getBoundingClientRect();
      card.style.setProperty("--mx", (e.clientX - r.left) + "px");
      card.style.setProperty("--my", (e.clientY - r.top) + "px");
    });
  });

  // Footer year
  var yr = document.getElementById("yr");
  if (yr) yr.textContent = new Date().getFullYear();

  // Contact form: opens the visitor's email app with the enquiry filled in
  var form = document.getElementById("enquiry");
  if (form) {
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      var required = ["name", "email", "phone", "message"];
      var ok = true;
      required.forEach(function (id) {
        var el = document.getElementById(id);
        var bad = !el.value.trim() || (id === "email" && !/^\S+@\S+\.\S+$/.test(el.value));
        el.classList.toggle("err", bad);
        if (bad) ok = false;
      });
      if (!ok) return;
      var v = function (id) { return document.getElementById(id).value.trim(); };
      var body =
        "Name: " + v("name") + "\n" +
        "Company: " + (v("company") || "-") + "\n" +
        "Email: " + v("email") + "\n" +
        "Contact no.: " + v("phone") + "\n\n" +
        v("message");
      var subject = "Website enquiry" + (v("company") ? " - " + v("company") : " - " + v("name"));
      window.location.href = "mailto:ir@ibes-advisory.com?subject=" +
        encodeURIComponent(subject) + "&body=" + encodeURIComponent(body);
    });
  }
})();
