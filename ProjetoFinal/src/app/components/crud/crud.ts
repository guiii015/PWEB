import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common'; 
import { FormsModule } from '@angular/forms'; 
import { ActivatedRoute, Router } from '@angular/router';
import { MovieService } from '../../services/movie.service'; 
import { Movie } from '../../models/movie.model';

@Component({
  selector: 'app-crud',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './crud.html',
  styleUrls: ['./crud.css']
})
export class Crud implements OnInit {
  movie: Movie = this.initializeNewMovie(); 
  isEditing: boolean = false;
  pageTitle: string = 'Cadastrar Filme';

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private movieService: MovieService
  ) { }

  ngOnInit(): void {
   
    this.route.paramMap.subscribe(params => {
      const movieId = params.get('id');
      if (movieId) {
        this.isEditing = true;
        this.pageTitle = 'Editar Filme';
        
        this.movieService.getMovieById(movieId).subscribe(movieData => {
          if (movieData) {
            this.movie = { ...movieData }; 
          } else {
            console.warn(`Filme com ID ${movieId} não encontrado.`);
            this.router.navigate(['/home']); 
          }
        });
      } else {
        this.isEditing = false;
        this.pageTitle = 'Cadastrar Filme';
        this.movie = this.initializeNewMovie(); 
      }
    });
  }

  
  private initializeNewMovie(): Movie {
    return {
      id: '', 
      title: '',
      director: '',
      year: null as any, 
      genre: '',
      duration: '',
      cast: '',
      classification: '',
      userRating: null as any, 
      additionDate: this.getCurrentDateFormatted(), 
      synopsis: ''
    };
  }

  
  private getCurrentDateFormatted(): string {
    const today = new Date();
    const day = String(today.getDate()).padStart(2, '0');
    const month = String(today.getMonth() + 1).padStart(2, '0'); 
    const year = today.getFullYear();
    return `${day}/${month}/${year}`;
  }

  
  onSaveMovie(): void {
    if (this.isEditing) {
      this.movieService.updateMovie(this.movie);
    } else {
      this.movieService.addMovie(this.movie);
    }
    this.router.navigate(['/home']); 
  }

  
  onCancel(): void {
    this.router.navigate(['/home']);
  }
}