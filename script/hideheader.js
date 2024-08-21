const navToggle = document.querySelector('.nav-toggle');
const navMenu = document.querySelector('.nav-menu');

//Кнопка adaptive меню. Опт. для телефонов
if (navToggle && navMenu) 
{
  navToggle.addEventListener('click', () => {
    console.log('Кнопка меню нажата');
    navMenu.classList.toggle('active');
    navToggle.classList.toggle('active');
  });
} else 
{
  console.error('Не удалось найти элементы меню');
}
