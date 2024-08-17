const backImage = document.getElementById('backimage');
const movieContainers = document.getElementsByClassName('movie-container');
const headerLinks = document.querySelectorAll('header nav a');
const paginationImage = document.getElementById("pagination_image")
const pagination = document.getElementsByClassName('pagination')
backImage.style.backgroundImage = 'url(../image/backgroung-movies.jpg)';
headerLinks.forEach(link => {
  link.addEventListener('mouseover', () => {
    backImage.style.filter = 'blur(5px)';
    paginationImage.style.filter = 'blur(5px)';
    pagination[0].style.filter = 'blur(5px)';

    movieContainers[0].style.filter = 'blur(5px)';
  });
  link.addEventListener('mouseout', () => {
    backImage.style.filter = 'blur(0px)';
    paginationImage.style.filter = 'blur(0px)';
    pagination[0].style.filter = 'blur(0px)';

    movieContainers[0].style.filter = 'blur(0px)';
  });
});