import { Component } from '@angular/core';
import { NavbarComponent } from '../navbar/navbar.component';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-app-home-page',
  standalone: true,
  imports: [NavbarComponent, CommonModule, FormsModule],
  templateUrl: './app-home-page.component.html',
  styleUrl: './app-home-page.component.css',
})
export class AppHomePageComponent {
  constructor(private router: Router) {}

  // learn-chart.component.ts
  learnItems = [
    'Technical, Fundamental',
    'Finology, Facts, Equity',
    'Trading Psychology',
    'Risk Assessment',
    'Option Trading',
  ];

  analytics = [
    'Live Sector Trend',
    'IPO DRHP',
    'Sectoral Distribution',
    'Stock Overview',
    'TradingView Chart',
    'Technical, Fundamental',
  ];

  club = ['Educational Resources', 'Real-time Chat', 'Forums'];
  testimonials = [
    {
      name: 'Monil',
      feedback: `BlueStock has transformed my trading experience! The insights are invaluable, and the platform is incredibly intuitive. Highly recommend for serious traders.`,
    },
    {
      name: 'Parth',
      feedback: `I've tried many trading apps, but BlueStock stands out. The real-time data and analytical tools are top-notch, helping me make informed decisions.`,
    },
    {
      name: 'Sujal',
      feedback: `The community feature on BlueStock is a game-changer. I can connect with other investors, share ideas, and learn from the best. Fantastic platform!`,
    },
  ];

  goToPage() {
    this.router.navigate(['/Broker Compare - Web']);
  }

  brokers = [
    { name: 'Angel One', logo: '../../assets/angel-removebg-preview.png' },
    { name: 'Zerodha', logo: '../../assets/aaaa-removebg-preview.png' },

    // Add more brokers as needed
  ];

  broker1: string = '';
  broker2: string = '';

  getBrokerLogo(brokerName: string): string | undefined {
    return this.brokers.find((b) => b.name === brokerName)?.logo;
  }
}
