import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ProductsService } from '@bluebits/products';
import { ConfirmationService, MessageService } from 'primeng/api';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'admin-products-list',
  templateUrl: './products-list.component.html',
  styles: [],
})
export class ProductsListComponent implements OnInit, OnDestroy {
  products = [];
  endSubs$: Subject<any> = new Subject();

  constructor(
    private productService: ProductsService,
    private router: Router,
    private confirmationService: ConfirmationService,
    private messageService: MessageService,
  ) {}

  ngOnInit(): void {
    this._getProducts();
  }

  ngOnDestroy() {
    this.endSubs$.next(this.products);
    this.endSubs$.complete();
  }

  private _getProducts() {
    this.productService
      .getProducts()
      .pipe(takeUntil(this.endSubs$))
      .subscribe((products) => {
        this.products = products;
      });
  }

  updateProduct(productId: string) {
    this.router.navigateByUrl(`products/form/${productId}`);
  }

  deleteProduct(productId: string) {
    this.confirmationService.confirm({
      message: 'Do you want to delete this product?',
      header: 'Delete Category',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.productService.delete(productId).subscribe(
          () => {
            this._getProducts();
            this.messageService.add({
              severity: 'success',
              summary: 'Success',
              detail: 'Category Deleted!',
            });
          },
          () => {
            this.messageService.add({
              severity: 'error',
              summary: 'Error',
              detail: 'Category Not Created!',
            });
          },
        );
      },
    });
  }
}
