const item=document.querySelectorAll(".corpo")


item.forEach( itens => {
  itens.addEventListener("click", () =>{
    const elemento= itens.parentElement

    elemento.classList.toggle("active")
  })
})