import { Component, HostListener } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { AuthService } from '../Service/auth.service';

@Component({
  selector: 'app-signin',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css'],
})
export class SigninComponent {
  signinForm: FormGroup;
  showPassword = false;
  errorMessage: string = '';
  successMessage: string = '';
  screenWidth: number = window.innerWidth;

  constructor(
    private fb: FormBuilder,
    private http: HttpClient,
    private authService: AuthService,
    private router: Router
  ) {
    this.signinForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      keepSignedIn: [false],
    });

    this.setCaptchaSize();
  }

  ngOnInit() {}

  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    this.screenWidth = event.target.innerWidth;
    this.setCaptchaSize();
  }

  setCaptchaSize() {
    // No captcha, so no size needed
  }

  onSignin() {
    if (this.signinForm.valid) {
      const { email, keepSignedIn } = this.signinForm.value;

      // Directly treat login as successful without authentication
      const username = email;
      if (keepSignedIn) {
        localStorage.setItem('username', username);
      } else {
        sessionStorage.setItem('username', username);
      }

      this.errorMessage = '';
      this.successMessage = 'Signed in successfully! 🎉';
      this.signinForm.reset();

      setTimeout(() => {
        this.router.navigate(['/Ragister-IPO-Details-And-Dasboard']);
      }, 2000);
    } else {
      this.successMessage = '';
      this.errorMessage = 'Please fill out the form correctly.';
      this.signinForm.markAllAsTouched();
    }
  }

  onGoogleSignin() {}
}
