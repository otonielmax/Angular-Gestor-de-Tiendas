import { Store } from './../../models/store/store';
import { Inventory } from './../../models/inventory/inventory';
import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-store',
  templateUrl: './store.component.html',
  styleUrls: ['./store.component.css']
})
export class StoreComponent implements OnInit {

  @Output() public filterInventoryByStore = new EventEmitter<Store>();

  listStore: Store[] = [];

  storeNew: Store = new Store();
  storePositionList: number = -1;
 
  keyLocalStorage: string = "stores";

  constructor(
    private toastr: ToastrService
  ) {         
  }

  ngOnInit() {
    //this.listStore = JSON.parse(localStorage.getItem("stores"));    
    this.updateList();
  }

  selectItem(item: Store, pos: number) {
    this.storeNew = item;
    this.storePositionList = pos;
  }

  updateList() {
    // Obtenemos el listado de tiendas ya sea para crear un nuevo objeto o modificar uno existente
    if (localStorage.getItem(this.keyLocalStorage)) {
      this.listStore = JSON.parse(localStorage.getItem(this.keyLocalStorage));      
    }        
    console.log(this.listStore);
  }

  createOrEdit() {
    // Validamos que los datos del modelo sean ingresados
    if (this.storeNew.name) {
      if (this.storeNew.direction) {
        // Actualizamos el listado
        this.updateList();   
        // Validamos si se creara o modificara una tienda
        if (this.storeNew.id === 0) {
          // Asignamos el id basandonos en el siguiente del listado o bien lo iniciamos en 1
          this.storeNew.id = this.listStore.length > 0 ? this.listStore[this.listStore.length - 1].id + 1 : 1;
          this.listStore.push(this.storeNew);
        }
        else {
          this.listStore[this.storePositionList] = this.storeNew;
        }
        // Actualizamos el listado
        localStorage.setItem(this.keyLocalStorage, JSON.stringify(this.listStore));
        // Limpiamos el objeto
        this.storeNew = new Store();      

        document.getElementById('close-modal-store').click();
      }
      else {
        this.toastr.warning("Debes ingresar la dirección de la tienda", "Alerta");
      }
    } 
    else {
      this.toastr.warning("Debes ingresar el nombre de la tienda", "Alerta");
    }   
  }

  // Eliminamos el elemento seleccionado
  deleteElement() {
    let exist: Inventory[] = [];
    if (localStorage.getItem("inventory")) {
      exist = JSON.parse(localStorage.getItem("inventory"));   
      exist = exist.filter(x => x.store.id == this.storeNew.id);
    }

    if (exist.length == 0) {
      // Obtenemos la lista original para evitar problemas con filtros
      let listAux: Store[] = JSON.parse(localStorage.getItem(this.keyLocalStorage));   
      // Filtramos los elementos distintos al seleccionado
      this.listStore = listAux.filter(x => x.id != this.storeNew.id);
      // Almacenamos nuestra lista sin el elemento seleccionado
      localStorage.setItem(this.keyLocalStorage, JSON.stringify(this.listStore));      
    }
    else {
      this.toastr.error("Disculpe no se puede eliminar esta tienda porque tiene inventario relacionados por favor elimine estos antes de poder continuar", "Alerta");
    }

    this.storeNew = new Store();
    this.storePositionList = -1;
    document.getElementById('close-modal-store').click();    
  }

  deleteCancel() {    
    this.storeNew = new Store();
    this.storePositionList = -1;
    document.getElementById('close-modal-store').click();
  }
}
