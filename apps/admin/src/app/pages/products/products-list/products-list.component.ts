import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ProductsService } from '@bluebits/products';

@Component({
  selector: 'admin-products-list',
  templateUrl: './products-list.component.html',
  styles: [],
})
export class ProductsListComponent implements OnInit {
  products = [];

  constructor(private productService: ProductsService, private router: Router) {}

  ngOnInit(): void {
    this._getProducts();
  }

  private _getProducts() {
    this.productService.getProducts().subscribe((products) => {
      this.products = products;
    });
  }

  updateProduct(productId: string) {
    this.router.navigateByUrl(`products/form/${productId}`);
  }
}
