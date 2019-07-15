import { Provider } from './../../models/provider/provider';
import { Product } from './../../models/product/product';
import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-providers',
  templateUrl: './providers.component.html',
  styleUrls: ['./providers.component.css']
})
export class ProvidersComponent implements OnInit {

  @Output() public filterProductByProvider = new EventEmitter<Provider>();

  list: Provider[] = [];

  objectNew: Provider = new Provider();
  positionList: number = -1;
 
  keyLocalStorage: string = "providers";

  constructor(
    private toastr: ToastrService
  ) {         
  }

  ngOnInit() {
    this.updateList();
  }

  selectItem(item: Provider, pos: number) {
    this.objectNew = item;
    this.positionList = pos;
  }

  updateList() {
    // Obtenemos el listado de tiendas ya sea para crear un nuevo objeto o modificar uno existente
    if (localStorage.getItem(this.keyLocalStorage)) {
      this.list = JSON.parse(localStorage.getItem(this.keyLocalStorage));      
    } 
    console.log(this.list);
  }

  createOrEdit() {
    // Validamos que los datos del modelo sean ingresados
    if (this.objectNew.name) {
      // Actualizamos la lista 
      this.updateList();
      // Validamos si se creara o modificara una tienda
      if (this.objectNew.id === 0) {
        // Asignamos el id basandonos en el siguiente del listado o bien lo iniciamos en 1
        this.objectNew.id = this.list.length > 0 ? this.list[this.list.length - 1].id + 1 : 1;
        this.list.push(this.objectNew);
      }
      else {
        this.list[this.positionList] = this.objectNew;
      }
      // Actualizamos el listado
      localStorage.setItem(this.keyLocalStorage, JSON.stringify(this.list));
      // Limpiamos el objeto
      this.objectNew = new Provider();      

      document.getElementById('close-modal-store').click();
    }
    else {
      this.toastr.warning("Debes ingresar el nombre del proveedor", "Alerta");
    }    
  }

  // Eliminamos el elemento seleccionado
  deleteElement() {
    let existProducts: Product[] = [];
    if (localStorage.getItem("products")) {
      existProducts = JSON.parse(localStorage.getItem("products"));   
      existProducts = existProducts.filter(x => x.provider.id == this.objectNew.id);
    }

    if (existProducts.length == 0) {
      // Obtenemos la lista original para evitar problemas con filtros
      let listAux: Provider[] = JSON.parse(localStorage.getItem(this.keyLocalStorage));   
      // Filtramos los elementos distintos al seleccionado
      this.list = listAux.filter(x => x.id != this.objectNew.id);
      // Almacenamos nuestra lista sin el elemento seleccionado
      localStorage.setItem(this.keyLocalStorage, JSON.stringify(this.list));      
    }
    else {
      this.toastr.error("Disculpe no se puede eliminar este proveedor porque tiene productos relacionados por favor elimine estos antes de poder continuar", "Alerta");
    }

    this.objectNew = new Provider();
    this.positionList = -1;
    document.getElementById('close-modal-store').click();    
  }

  deleteCancel() {    
    this.objectNew = new Provider();
    this.positionList = -1;
    document.getElementById('close-modal-store').click();
  }
}
