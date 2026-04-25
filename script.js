const itens = document.querySelectorAll(".corpo");

itens.forEach(item => {
  item.addEventListener("click", () => {
    document.querySelectorAll(".item").forEach(el => {
      el.classList.remove("active");
    });

    item.parentElement.classList.add("active");
  });
});