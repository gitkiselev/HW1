/*Модальное окно*/
var addProject = document.querySelector(".projects-item-add");/*находим нашу ссылку*/
var modalWindow = document.querySelector(".modal-window");/*выбираем элемент, у которго хотим поменять класс*/
var closeWindow = document.querySelector(".popup-close");/**/

addProject.addEventListener("click", function(event) {
	event.preventDefault();
	modalWindow.classList.add("modal-window-show");
});
closeWindow.addEventListener("click", function(event){
	event.preventDefault();
	modalWindow.classList.remove("modal-window-show");
});