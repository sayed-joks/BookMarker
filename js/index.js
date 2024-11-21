var siteName = document.getElementById("siteName");
var siteUrl = document.getElementById("siteUrl");
booksContainer = [];

// console.log(JSON.parse(localStorage.getItem('books')));
if (localStorage.getItem("books") !== null) {
  booksContainer = JSON.parse(localStorage.getItem("books"));
  display();
}

function addBookMarker() {
  if (vaildName() && validUrl()) {
    var books = {
      Name: siteName.value,
      url: siteUrl.value,
    };
    booksContainer.push(books);
    localStorage.setItem("books", JSON.stringify(booksContainer));
    clearForm();
    display();
  }
}
function clearForm() {
  (siteName.value = null), (siteUrl.value = null);
}
function display() {
  var container = "";
  for (var i = 0; i < booksContainer.length; i++) {
    container += `
    </tr>
        <td>${i}</td>
        <td>${booksContainer[i].Name}</td>
        <td>
        <button  class="btn btn-outline-primary" data-index="0">
        <a href=${booksContainer[i].url}> <i class="fa-solid fa-eye pe-2"></i>Visit</a>
        </button>
        </td>
        <td>
        <button onclick="deleteItem(${i})" class="btn pe-2 btn-outline-danger" data-index="0">
        <i class="fa-solid fa-trash-can"></i>
        Delete
        </button>
        </td>
    </tr>`;
  }
  siteUrl.classList.remove("is-valid");
  siteName.classList.remove("is-valid");
  document.getElementById("tableContent").innerHTML = container;
}
function deleteItem(i) {
  const swalWithBootstrapButtons = Swal.mixin({
    customClass: {
      confirmButton: "btn btn-success",
      cancelButton: "btn btn-danger",
    },
    buttonsStyling: false,
  });
  swalWithBootstrapButtons
    .fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete it!",
      cancelButtonText: "No, cancel!",
      reverseButtons: true,
    })
    .then((result) => {
      if (result.isConfirmed) {
        booksContainer.splice(i, 1);
        localStorage.books = JSON.stringify(booksContainer);
        display();
        swalWithBootstrapButtons.fire({
          title: "Deleted!",
          text: "Your file has been deleted.",
          icon: "success",
        });
      } else if (
        /* Read more about handling dismissals below */
        result.dismiss === Swal.DismissReason.cancel
      ) {
        swalWithBootstrapButtons.fire({
          title: "Cancelled",
          text: "Your imaginary file is safe :)",
          icon: "error",
        });
      }
    });
}
var regexName = /^[\w+&& \s]{3,}/;
var regexUrl = /^(w{3}\.|https:\/\/)?\w+[!@#$%^&*()-_+=\/]?\w+.com[\/]?$/gi;
// var sitNameInput="www.google";
// console.log(regexUrl.test(sitNameInput));
function vaildName() {
  var sitNameInput = siteName.value;
  var msgName = document.getElementById("msgName");
  if (regexName.test(sitNameInput)) {
    // console.log(true);
    siteName.classList.add("is-valid");
    siteName.classList.remove("is-invalid");
    msgName.classList.add("d-none");
    return true;
  } else {
    // console.log(false);
    siteName.classList.remove("is-valid");
    siteName.classList.add("is-invalid");
    msgName.classList.remove("d-none");
    return false;
  }
}
function validUrl() {
  var sitUrlInput = siteUrl.value;
  var msgUrl = document.getElementById("msgUrl");
  if (regexUrl.test(sitUrlInput)) {
    // console.log(true);
    siteUrl.classList.add("is-valid");
    siteUrl.classList.remove("is-invalid");
    msgUrl.classList.add("d-none");
    return true;
  } else {
    // console.log(false);
    siteUrl.classList.remove("is-valid");
    siteUrl.classList.add("is-invalid");
    msgUrl.classList.remove("d-none");
    return false;
  }
}
