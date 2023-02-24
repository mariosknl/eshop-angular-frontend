import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Order, OrdersService } from '@bluebits/orders';
import { Subject, takeUntil } from 'rxjs';
import { ORDER_STATUS } from '../order.constants';

@Component({
  selector: 'admin-orders-list',
  templateUrl: './orders-list.component.html',
})
export class OrdersListComponent implements OnInit, OnDestroy {
  orders: Order[] = [];
  orderStatus = ORDER_STATUS;
  endSubs$: Subject<any> = new Subject();

  constructor(private ordersService: OrdersService, private router: Router) {}

  ngOnInit(): void {
    this._getOrders();
  }

  ngOnDestroy() {
    this.endSubs$.next(this.orders);
    this.endSubs$.complete();
  }

  showOrder(orderId: string) {
    this.router.navigateByUrl(`orders/${orderId}`);
  }

  private _getOrders() {
    this.ordersService
      .getOrders()
      .pipe(takeUntil(this.endSubs$))
      .subscribe((orders) => {
        this.orders = orders;
      });
  }
}
