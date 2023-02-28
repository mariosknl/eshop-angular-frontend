import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';
import { Category } from '../../models/category';
import { Product } from '../../models/product';
import { CategoriesService } from '../../services/categories.service';
import { ProductsService } from '../../services/products.service';

@Component({
  selector: 'products-list',
  templateUrl: './products-list.component.html',
  styles: [],
})
export class ProductsListComponent implements OnInit, OnDestroy {
  products: Product[] = [];
  categories: Category[] = [];
  endSubs$: Subject<any> = new Subject();
  isCategoryPage = false;

  constructor(
    private prodService: ProductsService,
    private catService: CategoriesService,
    private route: ActivatedRoute,
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      if (params['categoryid']) {
        this._getProducts([params['categoryid']]);
        this.isCategoryPage = true;
      } else {
        this._getProducts();
        this.isCategoryPage = false;
      }
    });
    this._getCategories();
  }

  ngOnDestroy(): void {
    this.endSubs$.next(this.endSubs$);
    this.endSubs$.complete();
  }

  private _getProducts(categoriesFilter?: string[] | null) {
    this.prodService
      .getProducts(categoriesFilter)
      .pipe(takeUntil(this.endSubs$))
      .subscribe((resproducts) => {
        this.products = resproducts;
      });
  }

  private _getCategories() {
    this.catService
      .getCategories()
      .pipe(takeUntil(this.endSubs$))
      .subscribe((resCategories) => {
        this.categories = resCategories;
      });
  }

  categoryFilter() {
    const selectedCategories = this.categories
      .filter((category) => category.checked)
      .map((category) => category.id);

    this._getProducts(selectedCategories);
  }
}
