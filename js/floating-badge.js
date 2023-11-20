const deleteButton = document.querySelector(".close-button");
const floatingBadge = document.querySelector(".floating-badge");

function deleteFloatingBadge() {
  floatingBadge.remove();
}

deleteButton.addEventListener("click", deleteFloatingBadge);
