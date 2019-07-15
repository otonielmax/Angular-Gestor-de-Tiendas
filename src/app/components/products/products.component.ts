import { Provider } from './../../models/provider/provider';
import { Product } from './../../models/product/product';
import { Inventory } from './../../models/inventory/inventory';
import { Component, OnInit, Input } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {

  @Input() filterByProvider: Provider;

  list: Product[] = [];
  listProvider: Provider[] = [];

  objectNew: Product = new Product();
  positionList: number = -1;
 
  keyLocalStorage: string = "products";
  keyLocalStorageProvider: string = "providers";

  constructor(
    private toastr: ToastrService
  ) {         
    //localStorage.setItem(this.keyLocalStorage, JSON.stringify(this.list));
  }

  ngOnInit() {
    this.updateList();
    this.updateListProvider();
  }

  selectItem(item: Product, pos: number) {
    this.objectNew = item;
    this.positionList = pos;
    this.updateListProvider();
  }

  updateList() {
    // Obtenemos el listado de tiendas ya sea para crear un nuevo objeto o modificar uno existente
    if (localStorage.getItem(this.keyLocalStorage)) {
      this.list = JSON.parse(localStorage.getItem(this.keyLocalStorage)); 

      if (this.filterByProvider) {
        this.list = this.list.filter(x => x.provider.id == this.filterByProvider.id);
      }      
    } 
    console.log(this.list);
  }

  updateListProvider() {
    // Obtenemos el listado de tiendas ya sea para crear un nuevo objeto o modificar uno existente
    if (localStorage.getItem(this.keyLocalStorageProvider)) {
      this.listProvider = JSON.parse(localStorage.getItem(this.keyLocalStorageProvider));      
    } 
    console.log(this.listProvider);
  }

  createOrEdit() {
    // Validamos que los datos del modelo sean ingresados
    if (this.objectNew.provider) {
      if (this.objectNew.name) {
        if (this.objectNew.price && this.objectNew.price > 0) {
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
          this.objectNew = new Product();      
    
          document.getElementById('close-modal-store').click();
        }
        else {
          this.toastr.warning("Debes ingresar el costo del producto y debe ser mayor a 0", "Alerta");
        }        
      }
      else {
        this.toastr.warning("Debes ingresar el nombre del proveedor", "Alerta");
      }   
    }
    else {
      this.toastr.warning("Debes seleccionar el proveedor asociado a este producto", "Alerta");
    }     
  }

  // Eliminamos el elemento seleccionado
  deleteElement() {
    let exist: Inventory[] = [];
    if (localStorage.getItem("inventory")) {
      exist = JSON.parse(localStorage.getItem("inventory"));   
      exist = exist.filter(x => x.product.id == this.objectNew.id);
    }

    if (exist.length == 0) {
      // Obtenemos la lista original para evitar problemas con filtros
      let listAux: Product[] = JSON.parse(localStorage.getItem(this.keyLocalStorage));   
      // Filtramos los elementos distintos al seleccionado
      this.list = listAux.filter(x => x.id != this.objectNew.id);
      // Almacenamos nuestra lista sin el elemento seleccionado
      localStorage.setItem(this.keyLocalStorage, JSON.stringify(this.list));      
    }
    else {
      this.toastr.error("Disculpe no se puede eliminar este producto porque tiene inventario relacionados por favor elimine estos antes de poder continuar", "Alerta");
    }

    this.objectNew = new Product();
    this.positionList = -1;
    document.getElementById('close-modal-store').click();    
  }

  deleteCancel() {    
    this.objectNew = new Product();
    this.positionList = -1;
    document.getElementById('close-modal-store').click();
  }
}
