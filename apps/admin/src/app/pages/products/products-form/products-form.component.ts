import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CategoriesService, Category } from '@bluebits/products';

@Component({
  selector: 'admin-products-form',
  templateUrl: './products-form.component.html',
})
export class ProductsFormComponent implements OnInit {
  editMode = false;
  form: FormGroup;
  isSubmitted = false;
  categories: Category[] = [];
  imageDisplay: string | ArrayBuffer;

  constructor(private formBuilder: FormBuilder, private categoriesService: CategoriesService) {}

  ngOnInit(): void {
    this._initForm();
    this._getCategories();
  }

  private _initForm(): void {
    this.form = this.formBuilder.group({
      name: ['', Validators.required],
      brand: ['', Validators.required],
      price: ['', Validators.required],
      category: ['', Validators.required],
      countInStock: ['', Validators.required],
      description: ['', Validators.required],
      richDescription: [''],
      image: [''],
      isFeatured: [''],
    });
  }

  private _getCategories(): void {
    this.categoriesService.getCategories().subscribe((categories) => {
      this.categories = categories;
    });
  }

  onSubmit() {}
  onCancel() {}

  onImageUpload(event: Event) {
    const file = (event.target as HTMLInputElement).files[0];
    this.form.patchValue({
      image: file,
    });
    this.form.get('image').updateValueAndValidity();
    const reader = new FileReader();
    reader.onload = () => {
      this.imageDisplay = reader.result;
    };
    reader.readAsDataURL(file);
  }

  get productForm() {
    return this.form.controls;
  }
}
