import { Component, ElementRef, EventEmitter, Input, Output, ViewChild } from '@angular/core';

@Component({
  selector: 'shared-search-box',
  templateUrl: './search-box.component.html',
  styles: ``
})
export class SearchBoxComponent {
  @Input()
  public placeholder: string = 'Search...';

  @ViewChild('txtInput')
  public tagInput!: ElementRef<HTMLInputElement>;

  @Output() onValue = new EventEmitter<string>();

  emitValue(): void {
    const term = this.tagInput.nativeElement.value;
    this.onValue.emit(term);
  }
}
