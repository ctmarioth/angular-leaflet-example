import { Component, AfterViewInit} from '@angular/core';
import { FormControl } from '@angular/forms';
import * as L from 'leaflet';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent implements AfterViewInit {
  private map!: L.Map;
  latitude!: number;
  longitude!: number;
  searchBar = new FormControl('')
  err!: boolean;

  private initMap(): void {
    this.map = L.map('map', {
      center: [4.2105, 101.9758],
      zoom: 17
    });

    const tiles = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 20,
      minZoom: 5,
      attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    });
      tiles.addTo(this.map);

      // const marker = L.marker([4.2105, 101.9758],{draggable: false})
      // .setIcon(
      //   L.icon({
      //     iconSize: [25, 41],
      //     iconAnchor: [13, 41],
      //     iconUrl: 'assets/marker-icon.png'
      //   }));
      //   marker.addTo(this.map);

      //   this.map.on('click', function (e) {
      //     console.log(e)
      //     });
      }



  constructor(
    
  ) { }

  ngAfterViewInit(): void {
    this.initMap();
  }

  searchLatLong(): void {
    const checkValid = /^(\-?\d+\.?\d*)\s*,\s*(\-?\d+\.?\d*)$/g
    const latlong:any = this.searchBar.value;
    const match = checkValid.exec(latlong)
    console.log(match)
   if (match && match.length === 3) { // index 0 - entire string, 1 - first num, 2 - second num
     this.err = false;
      const latitude = parseFloat(match[1]);
      const longitude = parseFloat(match[2]);
      const marker = L.marker([latitude, longitude],{draggable: false})
      .setIcon(
        L.icon({
          iconSize: [25, 41],
          iconAnchor: [13, 41],
          iconUrl: 'assets/marker-icon.png'
        }));
        marker.addTo(this.map);
        marker.setLatLng([latitude,longitude]);
        this.map.panTo([latitude,longitude]);
     // this.showLocation({
     //   name: undefined,
     //   latitude: latitude,
     //   longitude: longitude
     // });
   } else {
     this.err = true;
   }
 } 
 // showLocation(location: any) {
 //   console.log("show", location) 
 // }
}
