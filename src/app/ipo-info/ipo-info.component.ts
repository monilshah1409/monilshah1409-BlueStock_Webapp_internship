import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../Service/auth.service';
import { IpoService, Ipo } from '../Service/ipo.service';

@Component({
  selector: 'app-ipo-info',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './ipo-info.component.html',
  styleUrls: ['./ipo-info.component.css'],
})
export class IpoInfoComponent implements OnInit {
  credentials: any = {
    companyName: '',
    prizeBand: '',
    open: '2026-07-10',
    close: '2026-07-20',
    issueSize: '',
    issueType: '',
    listingDate: '2026-07-25',
    status: 'Upcoming',
    ipoPrice: '',
    listingPrice: '',
    listingGain: '',
    cmp: '',
    currentReturn: '',
    rhp: '',
    drhp: '',
    companyLogo: null,
    newListingDate: '2026-07-25',
  };

  selectedComponent: string = 'ipoInfo';
  selected: string = 'info';

  ipoService = inject(IpoService); // Inject the IPO service
  authService = inject(AuthService); // Inject the AuthService

  ipos: Ipo[] = [];

  ngOnInit() {
    this.loadIpos();
  }

  loadIpos() {
    this.ipoService.getIpos().subscribe((data) => {
      // Override dates with latest dates
      this.ipos = data.map((ipo) => ({
        ...ipo,
        open: '2026-07-10',
        close: '2026-07-20',
        listingDate: '2026-07-25',
      }));
    });
  }

  // Verify session before registering IPO
  verifySession() {
    return this.authService.verifySession().toPromise();
  }

  // Register IPO function
  async register() {
    try {
      // Verify if the user is logged in by checking the session
      const sessionValid = await this.verifySession();
      if (!sessionValid.success) {
        alert('You must be logged in to register an IPO');
        return;
      }

      if (sessionValid.success) {
        alert('logged in to register an IPO');
      }

      // Proceed with IPO registration if the session is valid
      if (
        this.credentials.companyName &&
        this.credentials.prizeBand &&
        this.credentials.open
      ) {
        const formData = new FormData();

        Object.keys(this.credentials).forEach((key) => {
          const value = this.credentials[key];
          if (value !== null && value !== undefined) {
            if (key === 'companyLogo' && value instanceof File) {
              formData.append(key, value);
            } else {
              formData.append(key, value);
            }
          }
        });

        // Log the formData by iterating through it
        formData.forEach((value, key) => {
          console.log(`${key}:`, value);
        });

        this.ipoService.registerIPO(formData).subscribe(
          (response) => {
            console.log('IPO Registered Successfully', response);
            alert('IPO registered successfully!');
          },
          (error) => {
            console.error('Error Registering IPO', error);
            alert('Failed to register IPO. Please try again later.');
          }
        );
      } else {
        console.error('Please fill all required fields');
        alert('Please fill all required fields.');
      }
    } catch (error) {
      console.error('Session verification failed:', error);
      alert('Session verification failed. Please login again.');
    }
  }

  cancel() {
    console.log('Registration Cancelled');
  }

  select(component: string) {
    this.selected = component;
  }

  uploadLogo(event: any) {
    const file = event.target.files[0];
    if (file) {
      this.credentials.companyLogo = file;
    }
  }

  deleteLogo() {
    this.credentials.companyLogo = null;
  }

  subscriptions: any[] = [
    {
      companyName: 'Adani Power',
      priceBand: '₹ 329 - 136',
      open: '2026-07-10',
      close: '2026-07-20',
      issueSize: '45530.15 Cr.',
      issueType: 'Book Built',
      listingDate: '2026-07-25',
      status: 'Ongoing',
    },
    {
      companyName: 'VBL LTD',
      priceBand: '₹ 229 - 136',
      open: '2026-07-10',
      close: '2026-07-20',
      issueSize: '1330.15 Cr.',
      issueType: 'Book Built',
      listingDate: '2026-07-25',
      status: 'Coming',
    },
  ];

  allotments: any[] = [
    {
      companyName: 'Tata Motor',
      priceBand: '₹ 12549 - 136',
      open: '2026-07-10',
      close: '2026-07-20',
      issueSize: '1340.15 Cr.',
      issueType: 'Book Built',
      listingDate: '2026-07-25',
      status: 'New Listed',
    },
  ];

  // Dummy subscription method
  subscribeIPO() {
    alert('IPO Subscription successful (dummy)');
  }

  // Dummy allotment method
  allotIPO() {
    alert('IPO Allotment successful (dummy)');
  }
}
