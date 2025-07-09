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
  isDropdownOpen: boolean = false;

  constructor(private router: Router) {}

  ngOnInit() {
    this.username = localStorage.getItem('username') || sessionStorage.getItem('username');

    // Close dropdown on outside click
    document.addEventListener('click', (event) => {
      const target = event.target as HTMLElement;
      const dropdownButton = document.getElementById('dropdownMenuButton');
      const dropdownMenu = document.getElementById('dropdownMenu');
      if (
        this.isDropdownOpen &&
        dropdownButton &&
        dropdownMenu &&
        !dropdownButton.contains(target) &&
        !dropdownMenu.contains(target)
      ) {
        this.isDropdownOpen = false;
      }
    });
  }

  toggleDropdown() {
    this.isDropdownOpen = !this.isDropdownOpen;
  }

  signOut() {
    localStorage.removeItem('username');
    localStorage.removeItem('user');
    sessionStorage.removeItem('username');
    sessionStorage.removeItem('user');
    this.router.navigate(['/Sign In']);
  }
}
