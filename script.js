// Endereço que recebe os pedidos do formulário de contacto.
const CONTACT_EMAIL = "geral@bianes.pt";

document.documentElement.classList.add("js");

// Ano no rodapé
document.getElementById("year").textContent = new Date().getFullYear();

// Navegação: sombra ao fazer scroll + menu móvel
const nav = document.querySelector(".nav");
const toggle = document.querySelector(".nav__toggle");
const menu = document.getElementById("menu");

const onScroll = () => nav.classList.toggle("is-scrolled", window.scrollY > 8);
onScroll();
window.addEventListener("scroll", onScroll, { passive: true });

const setMenu = (open) => {
  menu.classList.toggle("is-open", open);
  toggle.setAttribute("aria-expanded", String(open));
  toggle.setAttribute("aria-label", open ? "Fechar menu" : "Abrir menu");
};
toggle.addEventListener("click", () => setMenu(!menu.classList.contains("is-open")));
menu.querySelectorAll("a").forEach((a) => a.addEventListener("click", () => setMenu(false)));

// Revelar secções ao fazer scroll
const revealEls = document.querySelectorAll(".reveal");
if ("IntersectionObserver" in window) {
  const io = new IntersectionObserver(
    (entries) => entries.forEach((e) => {
      if (e.isIntersecting) {
        e.target.classList.add("is-visible");
        io.unobserve(e.target);
      }
    }),
    { threshold: 0.12, rootMargin: "0px 0px -40px 0px" }
  );
  revealEls.forEach((el) => io.observe(el));
} else {
  revealEls.forEach((el) => el.classList.add("is-visible"));
}

// Formulário de contacto: valida e abre o email do visitante já preenchido
const form = document.getElementById("contact-form");
const note = form.querySelector(".form__note");

form.addEventListener("submit", (event) => {
  event.preventDefault();
  let firstInvalid = null;
  form.querySelectorAll("[required]").forEach((field) => {
    const ok = field.checkValidity() && field.value.trim() !== "";
    field.classList.toggle("is-invalid", !ok);
    if (!ok && !firstInvalid) firstInvalid = field;
  });
  if (firstInvalid) {
    note.style.color = "#C2413A";
    note.textContent = "Preencha o nome, um email válido e a mensagem.";
    firstInvalid.focus();
    return;
  }

  const data = new FormData(form);
  const subject = `Novo projeto: ${data.get("tipo")} — ${data.get("nome")}`;
  const body = [
    `Nome: ${data.get("nome")}`,
    `Email: ${data.get("email")}`,
    `Empresa: ${data.get("empresa") || "—"}`,
    `Procura: ${data.get("tipo")}`,
    "",
    data.get("mensagem"),
  ].join("\n");

  window.location.href =
    `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  note.style.color = "";
  note.textContent = "A abrir o seu email para enviar a mensagem. Obrigado!";
});

form.addEventListener("input", (e) => {
  if (e.target.classList.contains("is-invalid") && e.target.checkValidity()) {
    e.target.classList.remove("is-invalid");
  }
});
