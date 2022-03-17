import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Gif, SearchGifsResponse } from '../interfaces/gifs.interface';

@Injectable({
  providedIn: 'root'
})
export class GifsService {

  private _historial:string[]=[];
  private apiKey:string = 'uMziCBJgBdS67CdIxHBu1Pow7hBACSnH';

  public resultados: Gif[] = [];

  get historial(){
    return[...this._historial];
  }
  
  constructor( private http:HttpClient ){

    this._historial = JSON.parse( localStorage.getItem('historial')! ) || [];
    
    // if(localStorage.getItem('historial')){
    //   this._historial=JSON.parse( localStorage.getItem('historial')! ) ;
    // }
  }

  buscarGifs( query:string){

    if(query.trim().length === 0) return;

    query = query.trim().toLocaleLowerCase();

    if( !this._historial.includes(query) ){
      this._historial.unshift(query);
      this._historial = this._historial.splice(0, 10);

      localStorage.setItem('historial', JSON.stringify(this._historial));
    }


    this.http.get<SearchGifsResponse>(`http://api.giphy.com/v1/gifs/search?api_key=uMziCBJgBdS67CdIxHBu1Pow7hBACSnH&q=${query}&limit=10`)
      .subscribe( (resp) => {
        console.log(resp.data);
        this.resultados = resp.data;
      } );


  }
}
