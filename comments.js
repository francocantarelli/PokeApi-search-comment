let comentarios = [];
const comentarBTN = document.getElementById("comentarBTN");

document.addEventListener("DOMContentLoaded", async () => {
  comentarBTN.addEventListener("click", handleCommentBTN);

  //agarro mi archivo local
  const commentsDeArchivo = await fetch("./comments.json");
  const commentsDeArchivoData = await commentsDeArchivo.json();

  // si no existe local storage = crear local storage
  comentarios =
    JSON.parse(localStorage.getItem("comments")) || commentsDeArchivoData;

  //mostrar los comentarios del local
  showAllComments(comentarios);
});

const handleAddLike = (id) => {
  let singleComment = comentarios.find((comment) => comment.id == id);
  singleComment.isLiked = !singleComment.isLiked;

  //remuevo el objeto viejo y guardo el nuevo en el local storage
  refreshStorage();

  //volver a  mostrar en la lista de comentarios el local storage
  showAllComments(comentarios);
};

const showAllComments = (array_comments) => {
  let result = "";
  for (const comment of array_comments) {
    result += ` 
    <div>
      <h4>${comment.usuario}</h4>
      <p>${comment.comentario}</p>
      ${
        comment.isLiked
          ? ` <i onclick="handleAddLike(${comment.id})" class="fa-solid fa-heart"></i>`
          : ` <i onclick="handleAddLike(${comment.id})" class="fa-regular fa-heart"></i>`
      }
    </div>`;
  }
  document.getElementById("showAllComments").innerHTML = result;
};

const handleCommentBTN = () => {
  //agarrar los inputs
  const userInput = document.getElementById("userInput").value;
  const userComment = document.getElementById("userComment").value;

  const commentarioAlLocal = {
    id: comentarios.length + 1,
    usuario: userInput,
    comentario: userComment,
    isLiked: false,
  };

  //agregar al local storage
  comentarios.push(commentarioAlLocal);

  //remuevo el objeto viejo y guardo el nuevo en el local storage
  refreshStorage();

  //volver a  mostrar en la lista de comentarios el local storage
  showAllComments(comentarios);
};

const refreshStorage = () => {
  localStorage.removeItem("comments");
  localStorage.setItem("comments", JSON.stringify(comentarios));
};
