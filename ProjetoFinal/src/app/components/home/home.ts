import { Component, OnInit, OnDestroy } from '@angular/core';
    import { CommonModule } from '@angular/common';
    import { Router } from '@angular/router';
    import { FormsModule } from '@angular/forms';
    import { MovieService } from '../../services/movie.service';
    import { Movie } from '../../models/movie.model';
    import { Subscription } from 'rxjs';

    @Component({
      selector: 'app-home',
      standalone: true,
      imports: [CommonModule, FormsModule],
      templateUrl: './home.html',
      styleUrls: ['./home.css']
    })
    export class Home implements OnInit, OnDestroy {
      movies: Movie[] = [];
      filteredMovies: Movie[] = [];
      searchTerm: string = '';
      private moviesSubscription: Subscription | undefined;
      private isLoggedInCheckInterval: any;

      constructor(
        private movieService: MovieService,
        private router: Router
      ) { }

      ngOnInit(): void {
        this.moviesSubscription = this.movieService.getMovies().subscribe(data => {
          this.movies = data;
          this.applyFilter();
        });

        this.checkLoginStatus();
        this.isLoggedInCheckInterval = setInterval(() => this.checkLoginStatus(), 5000);
      }

      ngOnDestroy(): void {
        if (this.moviesSubscription) {
          this.moviesSubscription.unsubscribe();
        }
        if (this.isLoggedInCheckInterval) {
          clearInterval(this.isLoggedInCheckInterval);
        }
      }

      checkLoginStatus(): void {
        if (localStorage.getItem('isLoggedIn') !== 'true') {
          this.router.navigate(['/login']);
        }
      }

      applyFilter(): void {
        if (!this.searchTerm) {
          this.filteredMovies = [...this.movies];
        } else {
          const lowerCaseSearchTerm = this.searchTerm.toLowerCase();
          this.filteredMovies = this.movies.filter(movie =>
            movie.title.toLowerCase().includes(lowerCaseSearchTerm)
          );
        }
      }

      onEditMovie(id: string): void {
        
        console.log('--- Botão "Editar" clicado ---');
        console.log('ID do filme recebido:', id);
       
        if (id) {
          this.router.navigate(['/crud', id]);
          console.log('Tentando navegar para:', '/crud/' + id); 
        } else {
          console.error('ERRO: ID do filme inválido ou ausente para edição.', id);
        }
      }

      onDeleteMovie(id: string, title: string): void {
        console.log('Botão "Excluir" clicado para o ID:', id); 
        if (confirm(`Tem certeza que deseja excluir o filme "${title}"?`)) {
          this.movieService.deleteMovie(id);
        }
      }

      onAddMovie(): void {
        console.log('Botão "Adicionar Novo Filme" clicado.');
        this.router.navigate(['/crud']);
      }

      onLogout(): void {
        console.log('Botão "Sair" clicado. Desconectando...');
        localStorage.removeItem('isLoggedIn');
        this.router.navigate(['/login']);
      }
    }
    