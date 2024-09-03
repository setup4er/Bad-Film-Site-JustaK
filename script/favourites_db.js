function getLocalStorage() {
  try {
    let content = JSON.parse(localStorage.getItem('favouriteData'));
    if (!content || !content[0]) {
      console.error('Local storage is clear');
      printClearPage(); // Вызываем функцию, которая печатает страницу с сообщением о пустом localStorage
      return;
    }

    console.log(content);

    const container = document.createElement('div');
    container.className = 'movie-container';

    content.forEach((movie) => {
      if (movie.poster_path && movie.backdrop_path) {
        const movieWrapper = document.createElement('div');
        movieWrapper.className = 'movie-wrapper';
        movieWrapper.addEventListener('click', () => showModal(movie));

        const img = document.createElement('img');
        img.src = `https://image.tmdb.org/t/p/w500${movie.poster_path}`;
        img.className = 'movie-poster';

        const movieInfo = document.createElement('div');
        movieInfo.className = 'movie-info';

        const title = document.createElement('h3');
        title.textContent = movie.title;

        const overview = document.createElement('p');
        overview.textContent = movie.overview;

        movieInfo.appendChild(title);
        movieInfo.appendChild(overview);

        movieWrapper.appendChild(img);
        movieWrapper.appendChild(movieInfo);

        container.appendChild(movieWrapper);
      }
    });

    document.body.appendChild(container);

    createPagination(content.total_pages);
  } catch (error) {
    console.error('Error retrieving data from localStorage:', error);
    printClearPage(); // Вызываем функцию, которая печатает страницу с сообщением об ошибке
  }
}


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

function printClearPage()
{
  console.log("printed");
}

getLocalStorage();
