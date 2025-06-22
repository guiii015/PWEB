import { Injectable } from '@angular/core';
import { Movie } from '../models/movie.model';
import { BehaviorSubject, Observable, of } from 'rxjs'

@Injectable({
  providedIn: 'root'
})
export class MovieService {
  private MOVIES_STORAGE_KEY = 'moviesList'; // senha para o LocalStorage

  private movies: Movie[] = [];

  private moviesSubject = new BehaviorSubject<Movie[]>(this.movies);

  constructor() {
    this.loadMoviesFromLocalStorage(); // carrega filmes ao iniciar
  }


  private loadMoviesFromLocalStorage(): void {
    const storedMovies = localStorage.getItem(this.MOVIES_STORAGE_KEY);
    if (storedMovies) {
      this.movies = JSON.parse(storedMovies);
    } else {
      // se não existirem dados no localstorage, usa os dados mockados
      this.movies = [
        {
          id: '1',
          title: 'O Show de Truman',
          director: 'Peter Weir',
          year: 1998,
          genre: 'Drama',
          duration: '103 min',
          cast: 'Jim Carrey, Laura Linney, Ed Harris',
          classification: 'Livre',
          userRating: 4.7,
          additionDate: '05/11/2023',
          synopsis: 'Truman Burbank vive uma vida perfeita, mas não sabe que sua existência é um reality show televisionado 24h por dia...'
        },
        {
          id: '2',
          title: 'A Origem',
          director: 'Christopher Nolan',
          year: 2010,
          genre: 'Ficção Científica',
          duration: '148 min',
          cast: 'Leonardo DiCaprio, Joseph Gordon-Levitt, Elliot Page',
          classification: '14 anos',
          userRating: 4.9,
          additionDate: '10/01/2023',
          synopsis: 'Dom Cobb é um ladrão que rouba segredos corporativos através de tecnologia de partilha de sonhos...'
        },
        {
          id: '3',
          title: 'Interestelar',
          director: 'Christopher Nolan',
          year: 2014,
          genre: 'Ficção Científica',
          duration: '169 min',
          cast: 'Matthew McConaughey, Anne Hathaway, Jessica Chastain',
          classification: '10 anos',
          userRating: 4.8,
          additionDate: '20/03/2023',
          synopsis: 'Uma equipe de exploradores viaja através de um buraco de minhoca no espaço-tempo em uma tentativa de garantir a sobrevivência da humanidade.'
        },
        {
          id: '4',
          title: 'Blade Runner 2049',
          director: 'Denis Villeneuve',
          year: 2017,
          genre: 'Ficção Científica',
          duration: '164 min',
          cast: 'Ryan Gosling, Harrison Ford, Ana de Armas',
          classification: '16 anos',
          userRating: 4.6,
          additionDate: '15/07/2023',
          synopsis: 'Um jovem caçador de andróides descobre um segredo que pode mergulhar o que resta da sociedade no caos.'
        },
        {
          id: '5',
          title: 'Pulp Fiction: Tempo de Violência',
          director: 'Quentin Tarantino',
          year: 1994,
          genre: 'Crime',
          duration: '154 min',
          cast: 'John Travolta, Samuel L. Jackson, Uma Thurman',
          classification: '18 anos',
          userRating: 4.8,
          additionDate: '01/09/2023',
          synopsis: 'As vidas de dois assassinos de aluguel, um boxeador, a esposa de um gangster e um par de assaltantes de restaurante se entrelaçam em quatro contos de violência e redenção.'
        },
      ];
      this.saveMoviesToLocalStorage(); // salva os dados no localstorage
    }
    this.moviesSubject.next([...this.movies]); 
  }


  private saveMoviesToLocalStorage(): void {
    localStorage.setItem(this.MOVIES_STORAGE_KEY, JSON.stringify(this.movies));
  }

  getMovies(): Observable<Movie[]> {
    return this.moviesSubject.asObservable();
  }

  getMovieById(id: string): Observable<Movie | undefined> {
    const movie = this.movies.find(m => m.id === id);
    return of(movie);
  }

  addMovie(movie: Movie): void {
    movie.id = Date.now().toString(); 
    this.movies.push(movie);
    this.saveMoviesToLocalStorage();
    this.moviesSubject.next([...this.movies]);
    console.log('Movie added:', movie);
  }

  updateMovie(updatedMovie: Movie): void {
    const index = this.movies.findIndex(m => m.id === updatedMovie.id);
    if (index > -1) {
      this.movies[index] = updatedMovie;
      this.saveMoviesToLocalStorage();
      this.moviesSubject.next([...this.movies]);
      console.log('Movie updated:', updatedMovie);
    } else {
      console.warn('Movie not found for update:', updatedMovie);
    }
  }

  deleteMovie(id: string): void {
    this.movies = this.movies.filter(m => m.id !== id);
    this.saveMoviesToLocalStorage();
    this.moviesSubject.next([...this.movies]);
    console.log('Movie deleted with ID:', id);
  }
}