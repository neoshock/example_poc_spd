import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-modals',
  templateUrl: './modals.component.html',
  styleUrls: ['./modals.component.css']
})
export class ModalsComponent implements OnInit {

  @Input() modalTitle: string = '';
  @Input() showModal: boolean = false;
  @Input() chartOptions: any;
  @Output() chartInstanceEvent: EventEmitter<any> = new EventEmitter();


  constructor() { }

  ngOnInit(): void {

  }

  closeModal() {
    this.showModal = false;
  }

  // Método que emite el chart instance
  emitChartInstance(param: any) {
    this.chartInstanceEvent.emit(param);
  }

}
