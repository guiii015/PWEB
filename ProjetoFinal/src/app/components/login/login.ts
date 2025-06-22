import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './login.html',
  styleUrls: ['./login.css']
})
export class Login implements OnInit {
  email: string = '';
  password: string = '';
  loginError: boolean = false;
  successMessage: string = '';

  constructor(private router: Router) { }

  ngOnInit(): void {
    if (localStorage.getItem('isLoggedIn') === 'true') {
      this.router.navigate(['/home']);
    }
  }

  onCreateAccount(): void {
    if (this.email && this.password) {
      localStorage.setItem('registeredEmail', this.email);
      localStorage.setItem('registeredPassword', this.password);
      this.successMessage = 'Conta criada com sucesso! Faça login.';
      this.loginError = false;
      this.email = '';
      this.password = '';
    } else {
      this.successMessage = '';
      this.loginError = true;
    }
  }

  onLogin(): void {
    const registeredEmail = localStorage.getItem('registeredEmail');
    const registeredPassword = localStorage.getItem('registeredPassword');

    const defaultEmail = 'admin@filmes.com';
    const defaultPassword = 'admin';

    if (
      (this.email === registeredEmail && this.password === registeredPassword && registeredEmail && registeredPassword) ||
      (this.email === defaultEmail && this.password === defaultPassword && (!registeredEmail || !registeredPassword))
    ) {
      localStorage.setItem('isLoggedIn', 'true');
      this.loginError = false;
      this.successMessage = '';
      this.router.navigate(['/home']);
    } else {
      this.loginError = true;
      this.successMessage = '';
    }
  }
}
