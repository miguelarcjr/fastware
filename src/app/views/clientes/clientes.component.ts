import { Component, OnInit } from '@angular/core';
import { ConfirmationService, MessageService } from 'primeng/api';
import { Produto } from 'src/app/models/produto.model';
import { Product } from 'src/app/product';
import { ProductService } from 'src/app/productservice';
import { ClienteService } from 'src/app/services/cliente.service';

@Component({
  selector: 'app-clientes',
  templateUrl: './clientes.component.html',
  styles: [`
        :host ::ng-deep .p-dialog .product-image {
            width: 150px;
            margin: 0 auto 2rem auto;
            display: block;
        }
    `],
  styleUrls: ['./clientes.component.scss'],
  providers: [MessageService]
})
export class ClientesComponent implements OnInit {
  productDialog!: boolean;

  products: any[] = [];

  product!: any;

  selectedProducts!: any[]|null;

  submitted!: boolean;

  constructor(private productService: ProductService, private messageService: MessageService, private confirmationService: ConfirmationService, private clienteService: ClienteService) { }

  async ngOnInit() {
      this.products = await this.clienteService.getAll();
  }

  async updateUI() {
    this.products = await this.clienteService.getAll();
  }

  openNew() {
      this.product = {};
      this.submitted = false;
      this.productDialog = true;
  }

  deleteSelectedProducts() {
      this.confirmationService.confirm({
          message: 'Você tem certeza que deseja excluir?',
          header: 'Confirmar',
          icon: 'pi pi-exclamation-triangle',
          accept: () => {
              this.products = this.products.filter(val => !this.selectedProducts!.includes(val));
              this.selectedProducts = null;
              this.messageService.add({severity:'success', summary: 'SUCESSO!', detail: 'Registro Deletado', life: 3000});
          }
      });
  }

  editProduct(product: Product) {
      this.product = {...product};
      this.productDialog = true;
  }

  deleteProduct(product: any) {
      this.confirmationService.confirm({
          message: 'Você tem certeza que deseja excluir?',
          header: 'Confirmar',
          icon: 'pi pi-exclamation-triangle',
          accept: async () => {
              await this.clienteService.delete(product.id);
              this.products = this.products.filter(val => val.id !== product.id);
              this.product = {};
              this.messageService.add({severity:'success', summary: 'Successful', detail: 'Registro Deletado', life: 3000});
          }
      });
  }

  hideDialog() {
      this.productDialog = false;
      this.submitted = false;
  }

  async saveProduct() {
      this.submitted = true;

      if (this.product.nome!.trim()) {
          if (this.product.id) {
              await this.clienteService.put(this.product);
              this.products[this.findIndexById(this.product.id)] = this.product;
              this.messageService.add({severity:'success', summary: 'SUCESSO!', detail: 'Registro Atualizado', life: 3000});
            }
            else {
              //this.product.id = this.createId();
              this.product = await this.clienteService.post(this.product);
              this.products.push(this.product);
              this.messageService.add({severity:'success', summary: 'SUCESSO!', detail: 'Registro Criado', life: 3000});
          }

          this.products = [...this.products];
          this.productDialog = false;
          this.product = {};
      }
  }

  findIndexById(id: string): number {
      let index = -1;
      for (let i = 0; i < this.products.length; i++) {
          if (this.products[i].id === id) {
              index = i;
              break;
          }
      }

      return index;
  }

  createId(): string {
      let id = '';
      var chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
      for ( var i = 0; i < 5; i++ ) {
          id += chars.charAt(Math.floor(Math.random() * chars.length));
      }
      return id;
  }
}
