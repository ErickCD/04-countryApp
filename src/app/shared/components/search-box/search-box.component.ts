import {
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnDestroy,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import { debounceTime, Subject, Subscription } from 'rxjs';

@Component({
  selector: 'shared-search-box',
  templateUrl: './search-box.component.html',
  styles: ``,
})
export class SearchBoxComponent implements OnInit, OnDestroy {

  private debouncer: Subject<string> = new Subject<string>();
  private debouncerSubscription?: Subscription;

  @Input()
  public placeholder: string = 'Search...';

  @Input()
  public initialValue: string = '';

  @ViewChild('txtInput')
  public tagInput!: ElementRef<HTMLInputElement>;

  @Output() onValue = new EventEmitter<string>();
  @Output() onDebounce = new EventEmitter<string>();

  ngOnInit(): void {
    this.debouncerSubscription = this.debouncer
    .pipe(debounceTime(800))
    .subscribe((value) => {
      console.log('Debouncer value: ', value);
      this.onDebounce.emit(value);
    });
  }

  ngOnDestroy(): void {
    // console.log('Destruido');
    this.debouncerSubscription?.unsubscribe();
  }

  emitValue(): void {
    const term = this.tagInput.nativeElement.value;
    this.onValue.emit(term);
  }

  onKeyPress(searchTerm: string) {
    // console.log({searchTerm});
    this.debouncer.next(searchTerm);
  }
}
