import { Store } from './models/store/store';
import { Provider } from './models/provider/provider';
import { TypeView } from './models/type-view/type-view';
import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  // Define el componente activo
  typeElementPosition: number = 0;
  typeElement: TypeView;

  // Define las distintos componentes por los cuales se puede navegar
  listTypeElement: TypeView[] = [
    { id: 1, name: "Tiendas" },
    { id: 2, name: "Proveedores" },
    { id: 3, name: "Productos" },
    { id: 4, name: "Inventario" }
  ];

  // Filtros de Componentes
  public filterProductByProvider: Provider;
  public filterInventoryByStore: Store;

  constructor() {
    this.updateComponentView(); 
  }

  // Se actualiza el componente principal cada vez que se cambia el valor del combo box
  updateComponentView() {
    this.typeElement = this.listTypeElement[this.typeElementPosition];  
    // Reiniciamos los filtros de la vista
    this.filterProductByProvider = null;
    this.filterInventoryByStore = null;
  }

  // Filtra los productos por proveedor
  public onChangeViewProductFilter(obj: Provider) {
    this.filterProductByProvider = obj;
    this.typeElementPosition = 2;
    this.typeElement = this.listTypeElement[this.typeElementPosition];  
  }

  // Filtra el inventario por tienda
  public onChangeViewInventoryFilter(obj: Store) {
    this.filterInventoryByStore = obj;
    this.typeElementPosition = 3;
    this.typeElement = this.listTypeElement[this.typeElementPosition];  
  }
}
