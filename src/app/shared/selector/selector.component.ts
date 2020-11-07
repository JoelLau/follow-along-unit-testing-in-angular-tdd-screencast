import { Component, OnInit, OnDestroy } from '@angular/core';
import { Item } from '../item';
import { ApiCallService } from '../api-call.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-selector',
  templateUrl: './selector.component.html',
  styleUrls: ['./selector.component.scss'],
})
export class SelectorComponent implements OnInit, OnDestroy {
  items: Item[];
  query: string;

  fetchItemsSubscription: Subscription;

  constructor(private apiCallService: ApiCallService) {}

  ngOnInit(): void {}

  onSearchChange($event: Event): void {
    const searchBar = $event.target as HTMLInputElement;
    this.query = searchBar.value;
  }

  fetchItems(): void {
    this.fetchItemsSubscription = this.apiCallService
      .fetchItems()
      .subscribe((response) => {
        this.items = response;
      });
  }

  selectAll(): void {
    this.items.forEach((item) => {
      item.isSelected = true;
    });
  }

  ngOnDestroy(): void {
    if (this.fetchItemsSubscription) {
      this.fetchItemsSubscription.unsubscribe();
    }
  }
}
