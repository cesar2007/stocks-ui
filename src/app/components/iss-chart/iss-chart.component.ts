import { AfterViewInit, Component, OnInit } from '@angular/core';
import * as L from 'leaflet';

@Component({
  selector: 'app-iss-chart',
  templateUrl: './iss-chart.component.html',
  styleUrls: ['./iss-chart.component.scss']
})
export class IssChartComponent implements OnInit, AfterViewInit{

  api_url = 'https://api.wheretheiss.at/v1/satellites/25544';
  intervalID : any;
  mymap: any;
  marker: any;
  issIcon = L.icon({
    iconUrl: '../../../assets/images/800px-International_Space_Station.png',
    iconSize: [50, 32],
    iconAnchor: [25, 16]
  });


  ngOnInit(): void {
    this.intervalID = setInterval(() => this.getISS(), 1000);
  }

  ngAfterViewInit() {
    this.mymap = L.map('issMap').setView([0, 0], 1);
    const tileUrl = 'https://tile.openstreetmap.org/{z}/{x}/{y}.png';
    const attribution = "© OpenStreetMap";

    const tiles = L.tileLayer(tileUrl, { attribution });
    tiles.addTo(this.mymap);
  }

  async getISS(){
    const response = await fetch(this.api_url);
    const data = await response.json();
    const { latitude, longitude} = data;

    if (this.marker) {
      this.mymap.removeLayer(this.marker);
    }
    this.marker = L.marker([latitude, longitude], { icon : this.issIcon } ).addTo(this.mymap);

    document.getElementById('lat')!.textContent = latitude.toFixed(2);
    document.getElementById('lon')!.textContent = longitude.toFixed(2);
  }

}
