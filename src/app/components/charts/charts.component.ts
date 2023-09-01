import { Component, ElementRef, ViewChild } from '@angular/core';
import { Chart, ChartItem, registerables  } from 'chart.js';
Chart.register(...registerables);

@Component({
  selector: 'app-charts',
  templateUrl: './charts.component.html',
  styleUrls: ['./charts.component.scss']
})
export class ChartsComponent {
  @ViewChild('rainbow') rainbow!: ElementRef<HTMLImageElement>;


  private imageUrl: string | null = null;


  filenames = [
    'assets/images/rainbow.jpg',
    'assets/images/daniele-levis-pelusi-311027-unsplash.jpg',
    'assets/images/guy-stevens-746794-unsplash.jpg',
    'assets/images/sharon-pittaway-98257-unsplash.jpg'
  ];
  imageUrls: string[] = []; // Array to hold image URLs

  constructor(){

  }

  ngOnDestroy() {
    if (this.imageUrl) {
      URL.revokeObjectURL(this.imageUrl);
    }
  }

  fetchFunction() {
    if (!this.rainbow) {
      console.log('Image element not available in the view.');
      return;
    }
    fetch('assets/images/rainbow.jpg')
      .then(response => response.blob())
      .then(blob => {
        const imageUrl = URL.createObjectURL(blob);
        this.rainbow.nativeElement.src = imageUrl;
        this.imageUrl = imageUrl; // Save the URL for later cleanup
      })
      .catch(error => {
        console.error('Error fetching rainbow:', error);
      });
  }

  async catchRainbow() {
    try {
      const response = await fetch('assets/images/rainbow.jpg');
      const blob = await response.blob();
      this.rainbow.nativeElement.src = URL.createObjectURL(blob);
    } catch (error) {
    }
  }

  showImage(){
    this.catchRainbow().then(response => {
      console.log('yay');
    })
  }


}
