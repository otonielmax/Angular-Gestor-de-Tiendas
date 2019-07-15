import { Store } from './../../../models/store/store';
import { Component, OnInit, Input, ViewChild } from '@angular/core';
import * as $ab from 'jquery';
import { ModalDirective } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-store-create',
  templateUrl: './store-create.component.html',
  styleUrls: ['./store-create.component.css']
})
export class StoreCreateComponent implements OnInit {

  @Input() storeNew: Store = new Store();
  @Input() storePositionList: number = -1;
  

  @ViewChild(ModalDirective) modal: ModalDirective;

  keyLocalStorage: string = "stores";
  list: Store[] = [];

  constructor() { }

  ngOnInit() {
  }

  createOrEdit() {
    // Validamos que los datos del modelo sean ingresados
    if (this.storeNew.name) {
      if (this.storeNew.direction) {
        // Obtenemos el listado de tiendas ya sea para crear un nuevo objeto o modificar uno existente
        if (localStorage.getItem(this.keyLocalStorage)) {
          this.list = JSON.parse(localStorage.getItem(this.keyLocalStorage));
          console.log(localStorage.getItem(this.keyLocalStorage));
        }        
        // Validamos si se creara o modificara una tienda
        if (this.storePositionList == -1) {
          // Asignamos el id basandonos en el siguiente del listado o bien lo iniciamos en 1
          this.storeNew.id = this.list.length + 1;
          this.list.push(this.storeNew);
        }        
        else {
          this.list[this.storePositionList] = this.storeNew;
        }
        // Actualizamos el listado
        localStorage.setItem(this.keyLocalStorage, JSON.stringify(this.list));
        // Limpiamos el objeto
        this.storeNew = new Store();      
      }
    }    
  }

}
