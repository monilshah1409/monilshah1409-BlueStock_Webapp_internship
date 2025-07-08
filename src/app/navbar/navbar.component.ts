import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent {
  username: string | null = null;

  constructor(private router: Router) {}

  ngOnInit() {
    this.username = localStorage.getItem('username') || sessionStorage.getItem('username');
  }

  signOut() {
    localStorage.removeItem('username');
    localStorage.removeItem('user');
    sessionStorage.removeItem('username');
    sessionStorage.removeItem('user');
    this.router.navigate(['/Sign In']);
  }
}
