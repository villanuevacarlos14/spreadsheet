import { Injectable, Inject } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class SpreadsheetService {

  _baseUrl: string;
  constructor(private http: HttpClient, @Inject('BASE_URL') baseUrl: string)
  {
    this._baseUrl = baseUrl;
  }

  evaluateValue(value: any)
  {     
    return this.http.post<string>(this._baseUrl + "Spreadsheet", value);
  }
}
