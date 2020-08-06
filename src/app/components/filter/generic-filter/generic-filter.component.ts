import { Component, EventEmitter, Input, Output } from '@angular/core';
import { GenericFilter } from 'src/app/models/Genericfilters';

@Component({
  selector: 'app-generic-filter',
  templateUrl: './generic-filter.component.html',
  styleUrls: ['./generic-filter.component.scss'],
})
export class GenericFilterComponent {
  @Input()
  public data: GenericFilter;

  @Output()
  public selectEvent = new EventEmitter();

  public activeOption = this.data?.default;

  public activate(option) {
    if (this.activeOption === option) {
      this.activeOption = undefined;
    } else {
      this.activeOption = option;
    }
    this.selectEvent.emit({ [this.data.key]: this.activeOption });
  }
}
