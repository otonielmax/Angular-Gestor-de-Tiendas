import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ModalModule } from 'ngx-bootstrap/modal';
import { CommonModule } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { NgxPaginationModule } from 'ngx-pagination';  
import { Ng2SearchPipeModule } from 'ng2-search-filter'; 
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { AppComponent } from './app.component';
import { ProductsComponent } from './components/products/products.component';
import { ProvidersComponent } from './components/providers/providers.component';
import { StoreComponent } from './components/store/store.component';
import { InventoryComponent } from './components/inventory/inventory.component';
import { StoreCreateComponent } from './components/store/store-create/store-create.component';

@NgModule({
  declarations: [
    AppComponent,
    ProductsComponent,
    ProvidersComponent,
    StoreComponent,
    InventoryComponent,
    StoreCreateComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ModalModule.forRoot(),
    CommonModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot(),
    NgxPaginationModule,
    Ng2SearchPipeModule,
    NgbModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
