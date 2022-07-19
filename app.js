var formAnim = {
	$form: $("#form"),
	animClasses: [
		"face-up-left",
		"face-up-right",
		"face-down-left",
		"face-down-right",
		"form-complete",
	],
	resetClasses: function () {
		var $form = this.$form;

		$.each(this.animClasses, function (k, c) {
			$form.removeClass(c);
		});
	},
	faceDirection: function (d) {
		this.resetClasses();

		d = parseInt(d) < this.animClasses.length ? d : -1;

		if (d >= 0) {
			this.$form.addClass(this.animClasses[d]);
		}
	}
};

var $input = $("#title, #author, #pages, #read"),
	$submit = $("#submit"),
	focused = false,
	completed = false;

	

$input.focus(function () {
	focused = true;

	if (completed) {
		formAnim.faceDirection(1);
	} else {
		formAnim.faceDirection(0);
	}
});

$input.blur(function () {
	formAnim.resetClasses();
});

$input.on("input paste keyup", function () {
	completed = true;

	$input.each(function () {
		if (this.value == "") {
			completed = false;
		}
	});

	if (completed) {
		formAnim.faceDirection(1);
	} else {
		formAnim.faceDirection(0);
	}
});

// submit on click listener event animation
$submit.click(function () {
	focused = true;
	formAnim.resetClasses();

	if (completed) {
		$submit.css("pointer-events", "none");
		setTimeout(function () {
			formAnim.faceDirection(4);
			$input.val("");
			completed = false;
			
			setTimeout(function () {
				$submit.css("pointer-events", "");
				formAnim.resetClasses();
			}, 2000);
		}, 1000);
	} else {
		setTimeout(function () {
			formAnim.faceDirection(5);

			setTimeout(function () {
				formAnim.resetClasses();
			}, 2000);
		}, 1000);
	}
	
});

// time out the animation so it's not running constantly
$(function () {
	setTimeout(function () {
		if (!focused) {
			$input.eq(0).focus();
		}
	}, 2000);
});


// logic of site starts here
const addBtn = document.querySelector('#submit');
addBtn.addEventListener('click', addBookToLibrary);

// when the "add book" button is pressed, launch the new book addition card
const newBookBtn = document.querySelector('#newBtn');
newBookBtn.addEventListener('click', () => popUpForm.style.display = 'block');

// when the "submit" button is pressed, clear the new book addition card
const popUpForm = document.getElementById('form');
const closePopUp = document.getElementsByTagName('span')[0];
closePopUp.addEventListener('click', () => popUpForm.style.display = 'none');

class Book {
	constructor(title, author, pages, read) {
		this.title = $("#title").val();
		this.author = $("#author").val();
		this.pages = $("#pages").val();
		this.read = $("#read").val();
	}
}

// create book from Book constructor, add to the library
let myLibrary = [];
let newBook;

function addBookToLibrary () {
	event.preventDefault();
	popUpForm.style.display = 'none';

	newBook = new Book(title, author, pages, read);
	myLibrary.push(newBook);

	// function calls
	render();
	form.reset();
}

function render () {
	const display = document.getElementById('library-container'); // grab library container
	const books = document.querySelectorAll('.book');
	books.forEach(book => display.removeChild(book));
	

	for (let i = 0; i < myLibrary.length; i++) {
		createBook(myLibrary[i]);
		console.log(myLibrary[i]);
	}

	
}

function createBook (item) {
	const library = document.querySelector('#library-container');
	const bookDiv = document.createElement('div'); // create div to house books inside library container
	const titleDiv = document.createElement('div');
	const authorDiv = document.createElement('div');
	const pageDiv = document.createElement('div');
	const readDiv = document.createElement('div');
	const removeBtn = document.createElement('button'); // remove button removes from list

	bookDiv.classList.add('book');
	bookDiv.setAttribute('id', myLibrary.indexOf(item));

	titleDiv.textContent = item.title;
	titleDiv.classList.add('title');
	bookDiv.appendChild(titleDiv);

	authorDiv.textContent = item.author;
	authorDiv.classList.add('author');
	bookDiv.appendChild(authorDiv);

	pageDiv.textContent = item.pages;
	pageDiv.classList.add('pages');
	bookDiv.appendChild(pageDiv);

	readDiv.textContent = item.read;
	readDiv.classList.add('read');
	bookDiv.appendChild(readDiv);

	removeBtn.textContent = 'Remove';
	removeBtn.setAttribute('id', 'removeBtn');
	bookDiv.appendChild(removeBtn);

	library.appendChild(bookDiv);

	// event listener for remove button
	removeBtn.addEventListener('click', () => {
		myLibrary.splice(myLibrary.indexOf(item), 1);
		render();
	})




}





