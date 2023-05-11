import { Component, ElementRef, ViewChild } from '@angular/core';
import { CountryDetailService } from 'src/app/services/country-detail.service';
import { CountryInfo } from 'src/app/interfaces/country-info';

@Component({
  selector: 'app-interactive-map',
  templateUrl: './interactive-map.component.html',
  styleUrls: ['./interactive-map.component.css']
})
export class InteractiveMapComponent {

    @ViewChild('map') map?: ElementRef;
    
    label_1: String = 'Interactive World Map (click on country to see data)';
    currentCountry: SVGPathElement | undefined;
    countryInfo: CountryInfo | undefined;
    title: String = 'No country selected';

    constructor(private cds: CountryDetailService) {
    }
    
    ngAfterViewInit(): void{
      this.addMouseEvent(this.map?.nativeElement);
    }

    addMouseEvent(svg?: SVGElement): void {
      if (svg === undefined) return;
      let elements = svg.querySelectorAll('path');


      elements.forEach((e: SVGPathElement)=>{
        e.addEventListener('click', (event) => this.setClickedCountry(e), false);
        e.addEventListener('mouseover', (mouseevent: MouseEvent) => this.mouseOverCountry(mouseevent.target), false);

        if(e.id ==='us'){
          this.setClickedCountry(e);
        }
      });
      
      }

    mouseOverCountry(country: any): void {
      this.title = country.getAttribute('name');
    }

    setClickedCountry(country:SVGPathElement): void {
      this.unselectCurrentCountry();
      country.classList.toggle('selected');
      this.currentCountry = country;

      this.cds.getCountryInfo(country.id);
      this.cds.countrySubject.subscribe( countryInfo => {
        this.countryInfo = countryInfo;
      });
    }

    unselectCurrentCountry(): void{
      if(this.currentCountry != undefined){
        this.currentCountry.classList.toggle('selected');
      }
    }
    
}

