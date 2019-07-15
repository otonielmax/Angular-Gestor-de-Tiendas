import { Product } from './../../models/product/product';
import { Store } from './../../models/store/store';
import { Component, OnInit, Input } from '@angular/core';
import { Inventory } from 'src/app/models/inventory/inventory';
import { ToastrService } from 'ngx-toastr';
import {NgbDateStruct, NgbCalendar} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-inventory',
  templateUrl: './inventory.component.html',
  styleUrls: ['./inventory.component.css']
})
export class InventoryComponent implements OnInit {

  @Input() filterByStore: Store;

  list: Inventory[] = [];
  listProduct: Product[] = [];
  listStore: Store[] = [];

  objectNew: Inventory = new Inventory();
  positionList: number = -1;
 
  keyLocalStorage: string = "inventory";
  keyLocalStorageProducts: string = "products";
  keyLocalStorageStore: string = "stores";

  constructor(
    private toastr: ToastrService
  ) {         
    //localStorage.setItem(this.keyLocalStorage, JSON.stringify(this.list));
  }

  ngOnInit() {
    this.updateList();
    this.updateListProduct();
    this.updateListStore();
  }

  selectItem(item: Inventory, pos: number) {
    this.objectNew = item;
    this.positionList = pos;
    this.updateListProduct();
    this.updateListStore();
  }

  updateList() {
    // Obtenemos el listado de tiendas ya sea para crear un nuevo objeto o modificar uno existente
    if (localStorage.getItem(this.keyLocalStorage)) {
      this.list = JSON.parse(localStorage.getItem(this.keyLocalStorage)); 

      if (this.filterByStore) {
        this.list = this.list.filter(x => x.store.id == this.filterByStore.id);
      }      
    } 
    console.log(this.list);
  }

  updateListProduct() {
    // Obtenemos el listado de tiendas ya sea para crear un nuevo objeto o modificar uno existente
    if (localStorage.getItem(this.keyLocalStorageProducts)) {
      this.listProduct = JSON.parse(localStorage.getItem(this.keyLocalStorageProducts));      
    } 
  }

  updateListStore() {
    // Obtenemos el listado de tiendas ya sea para crear un nuevo objeto o modificar uno existente
    if (localStorage.getItem(this.keyLocalStorageStore)) {
      this.listStore = JSON.parse(localStorage.getItem(this.keyLocalStorageStore));      
    } 
  }

  createOrEdit() {
    // Validamos que los datos del modelo sean ingresados
    if (this.objectNew.store) {
      if (this.objectNew.product) {
        if (this.objectNew.quantity && this.objectNew.quantity > 0) {
          if (this.objectNew.date_buy) {
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
            this.objectNew = new Inventory();      
      
            document.getElementById('close-modal-store').click();
          }          
          else {
            this.toastr.warning("Debes seleccionar la fecha de compra", "Alerta");
          }
        }
        else {
          this.toastr.warning("Debes ingresar la cantidad del producto que esta ingresando y debe ser mayor a 0", "Alerta");
        }        
      }
      else {
        this.toastr.warning("Debes seleccionar el producto al cual registraras el nuevo inventario", "Alerta");
      }   
    }
    else {
      this.toastr.warning("Debes seleccionar la tienda a la cual registraras el nuevo inventario", "Alerta");
    }     
  }

  // Eliminamos el elemento seleccionado
  deleteElement() {    
    // Obtenemos la lista original para evitar problemas con filtros
    let listAux: Inventory[] = JSON.parse(localStorage.getItem(this.keyLocalStorage));   
    // Filtramos los elementos distintos al seleccionado
    this.list = listAux.filter(x => x.id != this.objectNew.id);
    // Almacenamos nuestra lista sin el elemento seleccionado
    localStorage.setItem(this.keyLocalStorage, JSON.stringify(this.list));      

    this.objectNew = new Inventory();
    this.positionList = -1;
    document.getElementById('close-modal-store').click();    
  }

  deleteCancel() {    
    this.objectNew = new Inventory();
    this.positionList = -1;
    document.getElementById('close-modal-store').click();
  }
}
