import { HttpClient } from '@angular/common/http';
import { CountryInfo, Data } from 'src/app/interfaces/country-info';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CountryDetailService {

  countrySubject = new Subject<CountryInfo>();

  constructor(private http: HttpClient) {
   
  }

  getGeonamesData(countryId:String): Observable<Object> {
    return this.http.get(`https://secure.geonames.org/countryInfoJSON?username=dwoo490&country=${countryId}`);
  }

  getWorldBankData(countryId: String): Observable<Object> {
    return this.http.get(`https://api.worldbank.org/V2/country/${countryId}?format=json`, {responseType: 'json'});
  }



  getCountryInfo(countryId: String) {

    let info: CountryInfo = {
      name: '',
      capitalCity: '',
      region: {},
      incomeLevel: {},
      population: 0,
      continentName: ''
    };
    let geonames = this.getGeonamesData(countryId);
    let wb = this.getWorldBankData(countryId);

    geonames.subscribe((d)=>{
      let arr: any = d as Data;
      let obj: any = arr['geonames'];

      info.population = Number.parseInt(obj[0].population);
      info.continentName = obj[0].continentName;

    });

    wb.subscribe((d)=>{
      let arr = d as Data;
      let obj:any = arr[1][0];

      info.name = obj.name;
      info.capitalCity = obj.capitalCity;
      info.region = obj.region.value;
      info.incomeLevel = obj.incomeLevel.value;

      this.countrySubject.next(info);

      });
  }
}
