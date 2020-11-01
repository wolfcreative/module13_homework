// Получаем JSON с картинками
fetch("https://dog.ceo/api/breeds/image/random/7")
  .then(response => response.json())
  .then(result => initSlider(result.message));
  
let slider, wrapperImages;

// Функция запуска слайд
function initSlider(data) {
  // Ищем основную обертку
  slider = document.querySelector(".slider");

  // Создаем обёртку для картинок
  wrapperImages = document.createElement("div");
  wrapperImages.className = 'slider-wrapper';
  slider.insertBefore(wrapperImages, slider.firstChild);

  // Вставляем полученные изображения
  data.forEach(function (item) {
    wrapperImages.insertAdjacentHTML('beforeend', `<img src="${item}" alt="img" />`);
  });
  
  // Добавляем первому дочернему элементу класс 'active'
  wrapperImages.firstChild.classList.add('active');
  
  arrowSlider();
}

function arrowSlider(){
  // Создаем обёртку для навигации
  let wrapperArrows = document.createElement("div");
  wrapperArrows.className = 'slider-nav';
  slider.appendChild(wrapperArrows, slider.firstChild);
  
  // Создаем кнопочки
  let arrowRight = document.createElement("button");
  arrowRight.className = 'slider-arrow next';
  arrowRight.setAttribute('type', 'button');
  arrowRight.innerHTML = '<svg width="14px" height="24px" viewBox="0 0 14 24" xmlns="http://www.w3.org/2000/svg"><polyline fill="none" stroke="#fff" stroke-width="1.4" points="1.225,23 12.775,12 1.225,1 "></polyline></svg>';
  wrapperArrows.insertBefore(arrowRight, wrapperArrows.firstChild);
  
  let arrowLeft = document.createElement("button");
  arrowLeft.className = 'slider-arrow prev';
  arrowLeft.setAttribute('type', 'button');
  arrowLeft.innerHTML = '<svg width="14px" height="24px" viewBox="0 0 14 24" xmlns="http://www.w3.org/2000/svg"><polyline fill="none" stroke="#fff" stroke-width="1.4" points="12.775,1 1.225,12 12.775,23 "></polyline></svg>';
  wrapperArrows.insertBefore(arrowLeft, wrapperArrows.firstChild);
  
  // Ищу кнопки
  let sliderArrows = document.querySelectorAll(".slider-arrow");
  
  // Перебираю их
  sliderArrows.forEach(function (item) {
      // Вешаю на них событие
      item.addEventListener("click", function() {
        let currentImage = wrapperImages.querySelector('.active');
        // Можно использовать логическое ИЛИ для задания "запасного" значения prevImage и nextImage, в случае если эти элементы равны null, и за счёт этого упростить код ниже
        let prevImage = currentImage.previousElementSibling || wrapperImages.lastElementChild;
        let nextImage = currentImage.nextElementSibling || wrapperImages.firstElementChild;
        
        currentImage.classList.remove('active');
        
        if (item.classList.contains('prev')){
          prevImage.classList.add('active');
        } else {
          nextImage.classList.add('active');
        }
      });
  });
}