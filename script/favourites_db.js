function showModal(movie) 
{
  const modal = document.querySelector('.modal');
  const modalPoster = document.querySelector('.modal-poster');
  const modalTitle = document.querySelector('.modal-title');
  const modalRating = document.querySelector('.modal-rating');
  const modalReleaseDate = document.querySelector('.modal-release-date');
  const modalOverview = document.querySelector('.modal-overview');
  const backImage = document.getElementById('backimage');
  const movieContainers = document.querySelectorAll('.movie-container');

  console.log(movieContainers)

  modalPoster.src = `https://image.tmdb.org/t/p/w500/${movie.poster_path}`;
  modalTitle.textContent = movie.title;
  modalRating.textContent = `Rating: ${movie.vote_average}`;
  modalReleaseDate.textContent = `Release Date: ${movie.release_date}`;
  modalOverview.textContent = movie.overview;

  modal.style.display = 'block';
  backImage.style.filter = 'blur(5px)';

  movieContainers.forEach(container => {
    container.style.filter = 'blur(5px)';
  });

  const closeButton = document.querySelector('.close-button');

  closeButton.addEventListener('click', () => {
    modal.style.display = 'none';
    backImage.style.filter = 'blur(0px)';
    movieContainers.forEach(container => {
      container.style.filter = 'blur(0px)';
    });
  });

  window.addEventListener('click', (event) => {
    if (event.target == modal) 
      {
      modal.style.display = 'none';
      backImage.style.filter = 'blur(0px)';
      movieContainers.forEach(container => {
        container.style.filter = 'blur(0px)';
      });
    }
  });
}