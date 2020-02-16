import {Component, ElementRef, OnInit, TemplateRef, ViewChild, ViewContainerRef} from '@angular/core';
import {OrderService} from "../services/order.service";

@Component({
  selector: 'app-orders-page',
  templateUrl: './orders-page.component.html',
  styleUrls: ['./orders-page.component.scss']
})
export class OrdersPageComponent implements OnInit {
  list = [];
  filter = false;
  @ViewChild('modal_1', { static: false}) modal_1: TemplateRef<any>;
  @ViewChild('vc', {read: ViewContainerRef, static: false}) vc: ViewContainerRef;
  @ViewChild('bd', { static: false}) bd: ElementRef;
  // backdrop: any;
  modalInfo: any = {};

  constructor(private orderService: OrderService) { }

  ngOnInit() {
    this.orderService.getOrders().subscribe((orders) => {
      this.list = orders;
      this.list = this.list.map(item => {
        return Object.assign(item, {'checked': false})
      });

      console.log(this.list)
    });
  }

  onConfirm() {
    console.log(this.list.filter(item => item.checked))
  }

  onFilterChange(eve: any) {
    this.filter = !this.filter;

    if(this.filter){
      console.log('gr')
    }
  }

  showDialog(order){
    this.modalInfo = Object.assign({}, order);
    this.vc.createEmbeddedView(this.modal_1);
    this.modal_1.elementRef.nativeElement.previousElementSibling.style.display = 'block';
    this.bd.nativeElement.style.display = 'block';
    console.log(this.modalInfo)
/*    this.backdrop = document.createElement('DIV');
    this.backdrop.className = 'modal-backdrop';
    document.body.appendChild(this.backdrop)*/
  }

  closeDialog() {
/*    document.body.removeChild(this.backdrop)*/
    this.vc.clear();
    this.bd.nativeElement.style.display = 'none';
  }

}



