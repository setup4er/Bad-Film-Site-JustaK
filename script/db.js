let currentPage = 1;
let container;
let chosedMovie;

let favouriteDataArray = [];

async function getResponse() 
{
  try{
  let response = await fetch(`http://api.themoviedb.org/3/movie/now_playing?api_key=ebea8cfca72fdff8d2624ad7bbf78e4c&page=${currentPage}`);   
    
  if (!response.ok) 
    {
      throw new Error(`HTTP error ${response.status}`)
    }  
    
  let content = await response.json();
  console.log(content);

  if (container) 
  {
    container.remove();
  }
  // Очистка предыдущих кнопок навигации (фикс-костыль)
  const existingContainers = document.querySelectorAll('.movie-container, .pagination');
  existingContainers.forEach(container => container.remove());

  container = document.createElement('div');
  container.className = 'movie-container';

  content.results.forEach((movie, index) => {
    if (index < 20 && movie.poster_path && movie.backdrop_path) 
      {
      const movieWrapper = document.createElement('div');
        movieWrapper.className = 'movie-wrapper';
        movieWrapper.addEventListener('click', () => showModal(movie));
        const img = document.createElement('img');
        img.src = `https://image.tmdb.org/t/p/w500/${movie.poster_path}`;
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
  }
  catch{
    console.error('Ошибка при подключении к базе данных');
    window.location.href = '../sites/error.html';
  }
}

  // Всплывающее окно информации о фильме
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
    const favouriteButton = document.querySelector('.favourite-btn');

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
  

    favouriteButton.addEventListener('click', ()=>{
    if(!favouriteDataArray.includes(movie))
    {
      favouriteDataArray.push(movie)
    }
    console.log(favouriteDataArray);
    })

    const closeButton = document.querySelector('.close-button');
    closeButton.addEventListener('click', () => {
      modal.style.display = 'none';
      backImage.style.filter = 'blur(0px)';
      movieContainers.forEach(container => {
        container.style.filter = 'blur(0px)';
      });
    });
  // Blur background
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

  function createPagination(totalPages) {
    
    const paginationContainer = document.createElement('div');
    paginationContainer.className = 'pagination';
  
    //Алгоритм кнопок
    let startPage, endPage;
    if (currentPage <= 3) {
      startPage = 1;
      endPage = Math.min(5, totalPages);
    } else if (currentPage >= totalPages - 2) {
      startPage = Math.max(1, totalPages - 4);
      endPage = totalPages;
    } else {
      startPage = currentPage - 2;
      endPage = currentPage + 2;
    }
    
    // Добавление самих кнопок
    for (let i = startPage; i <= endPage; i++) {
      const pageButton = document.createElement('button');
      pageButton.textContent = i;
      pageButton.addEventListener('click', () => {
        currentPage = i;
        document.querySelector('.movie-container').remove();
        getResponse();
        const existingContainers = document.querySelectorAll('.movie-container, .pagination');
        existingContainers.forEach(container => container.remove());
        createPagination(totalPages);
      });
      paginationContainer.appendChild(pageButton);
    }
    //Начальная + конечная кнопка 
    if (startPage > 1) {
      const firstPageButton = document.createElement('button');
      firstPageButton.textContent = '1';
      firstPageButton.id = "first_page_button"
      firstPageButton.addEventListener('click', () => {
        currentPage = 1;
        document.querySelector('.movie-container').remove();
        getResponse();
        const existingContainers = document.querySelectorAll('.movie-container, .pagination');
        existingContainers.forEach(container => container.remove());
        createPagination(totalPages);
      });
      paginationContainer.insertBefore(firstPageButton, paginationContainer.firstChild);
    }
  
    if (endPage < totalPages) {
      const lastPageButton = document.createElement('button');
      lastPageButton.textContent = totalPages;
      lastPageButton.id = "last_page_button"
      lastPageButton.addEventListener('click', () => {
        currentPage = totalPages;
        document.querySelector('.movie-container').remove();
        getResponse();
        const existingContainers = document.querySelectorAll('.movie-container, .pagination');
        existingContainers.forEach(container => container.remove());
        createPagination(totalPages);
      });
      paginationContainer.appendChild(lastPageButton);
    }
    
    document.body.appendChild(paginationContainer);
  }
  
  getResponse();