import { Component, EventEmitter, Input, OnInit, Output ,AfterViewChecked} from '@angular/core';

@Component({
  selector: 'app-select',
  templateUrl: './select.component.html',
  styleUrls: ['./select.component.scss']
})
export class SelectComponent implements OnInit, AfterViewChecked {
  @Input() title:string = ""
  @Input() data:any[] = []
  @Output() selectedValue = new EventEmitter()
  constructor() { }

  ngOnInit(): void {
    
  }

  ngAfterViewChecked(){
    console.log(this.data);
  }

  detectChanges(event:any) {
    this.selectedValue.emit(event);
    
  }
}
