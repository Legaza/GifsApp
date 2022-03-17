import { Component } from '@angular/core';
import { GifsService } from '../../gifs/services/gifs.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
})
export class SidebarComponent {

  constructor( private gifsService: GifsService) { }

  get historial(){
    return this.gifsService.historial;
  }

  buscar( historial:string){
    console.log(historial);
    this.gifsService.buscarGifs(historial);
  }

}
