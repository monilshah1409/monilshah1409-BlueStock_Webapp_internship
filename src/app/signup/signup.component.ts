import { Component, HostListener } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { environment } from '../../environments/environment';
import { AuthService } from '../Service/auth.service';

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css'],
})
export class SignupComponent {
  signupForm: FormGroup;
  showPassword = false;
  errorMessage: string = '';
  successMessage: string = '';
  screenWidth: number = window.innerWidth;
  user: any;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
    this.signupForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
    this.setCaptchaSize();
  }

  ngOnInit() {
    this.user = this.authService.getUser();
  }

  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    this.screenWidth = event.target.innerWidth;
    this.setCaptchaSize();
  }

  setCaptchaSize() {
    // No captcha, so no size needed
  }

  onSignup() {
    if (this.signupForm.valid) {
      const { name, email, password } = this.signupForm.value;
      const userData = {
        name,
        email,
        password,
      };

      this.authService.signup(userData).subscribe({
        next: (res) => {
          console.log('Signup successful:', res?.message);

          this.errorMessage = '';
          this.successMessage =
            res.message || 'Account created successfully! 🎉';
          this.signupForm.reset();

          // Store user email as username in localStorage/sessionStorage
          if (res.user) {
            const username = res.user.email || email;
            localStorage.setItem('username', username);
            localStorage.setItem('user', JSON.stringify(res.user));
          }

          setTimeout(() => {
            this.router.navigate(['/Sign In']);
          }, 2000);
        },
        error: (err) => {
          console.error('Signup error:', err);
          this.successMessage = '';
          this.errorMessage = err.error?.message || 'Something went wrong!';
        },
      });
    } else {
      this.successMessage = '';
      this.errorMessage = 'Please fill out the form correctly.';
      this.signupForm.markAllAsTouched();
    }
  }

  onGoogleSignup() {}
}
