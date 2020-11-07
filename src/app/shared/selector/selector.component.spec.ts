import { ApiCallService } from '../api-call.service';
import {
  async,
  ComponentFixture,
  TestBed,
  fakeAsync,
  tick,
} from '@angular/core/testing';
import { delay } from 'rxjs/operators';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { Item } from '../item';
import { of } from 'rxjs';
import { SelectorComponent } from './selector.component';
import { StartsWithPipe } from '../starts-with.pipe';
import { FormsModule } from '@angular/forms';

const MOCK_DELAY_MS = 5000;

describe('SelectorComponent', () => {
  let component: SelectorComponent;
  let fixture: ComponentFixture<SelectorComponent>;
  let nativeElement: HTMLElement;
  let apiCallService: ApiCallService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [SelectorComponent, StartsWithPipe],
      imports: [FormsModule, HttpClientTestingModule],
      providers: [ApiCallService],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SelectorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    nativeElement = fixture.nativeElement;
    apiCallService = TestBed.inject(ApiCallService);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('Search Bar', () => {
    it('should have a search bar', () => {
      const searchBar = nativeElement.querySelector('.search-bar');
      expect(searchBar).toBeTruthy();
    });

    it('should filter from search bar', () => {
      // Arrange - Act (1): set items
      const itemInput: Item[] = [{ title: 'foo' }, { title: 'bar' }];
      component.items = itemInput;
      fixture.detectChanges();

      // Arrange - Act (2): perform search
      const searchBar: HTMLInputElement = nativeElement.querySelector(
        '.search-bar'
      );
      searchBar.value = 'f';
      searchBar.dispatchEvent(new Event('keypress'));
      fixture.detectChanges();

      // Assert
      const itemList = nativeElement.querySelectorAll('.item');
      expect(itemList.length).toBe(1);
    });
  });

  describe('Fetch Button', () => {
    let fetchButton: HTMLButtonElement;

    beforeEach(() => {
      fetchButton = nativeElement.querySelector('button.fetch-button');
    });
    it('should have a fetch button', () => {
      expect(fetchButton).toBeTruthy();
    });

    it('should trigger fetch request from API and show items in list', fakeAsync(() => {
      // Arrange
      const itemInput: Item[] = [{ title: 'foo' }, { title: 'bar' }];
      spyOn(apiCallService, 'fetchItems').and.returnValue(
        of([{ title: 'foo' }, { title: 'bar' }, { title: 'another' }]).pipe(
          delay(MOCK_DELAY_MS)
        )
      );

      // Act (1): Set items
      component.items = itemInput;
      fixture.detectChanges();

      // Assert (1): Sanity Check - Initial State
      let itemList = nativeElement.querySelectorAll('.item');
      expect(itemList.length).toBe(2);

      // Act (2): Click Fetch Button
      fetchButton.click();
      tick(MOCK_DELAY_MS);
      fixture.detectChanges();

      // Assert (2): Check Expected State
      itemList = nativeElement.querySelectorAll('.item');
      expect(itemList.length).toBe(3);
    }));
  });

  describe('Select All Button', () => {
    let selectAllButton: HTMLButtonElement;

    beforeEach(() => {
      selectAllButton = nativeElement.querySelector('button.select-all-button');
    });

    it('should have a select all button', () => {
      expect(selectAllButton).toBeTruthy();
    });

    it('should check all the checkboxes when the Select All button is clicked', fakeAsync(async () => {
      // Arrange
      const itemInput: Item[] = [{ title: 'foo' }, { title: 'bar' }];

      // Act (1): Set items
      component.items = itemInput;
      fixture.detectChanges();

      // Assert (1): Sanity Check - Initial State
      const checkboxes = nativeElement.querySelectorAll(
        '.item input[type=checkbox]'
      );
      expect(checkboxes.length).toBe(itemInput.length);

      // Act (2): Click Select All Button
      selectAllButton.click();
      fixture.detectChanges();
      await fixture.whenStable();

      // Assert (2): Check Expected State
      const checkedCheckboxes = nativeElement.querySelectorAll(
        '.item input[type=checkbox]:checked'
      );
      expect(checkedCheckboxes.length).toBe(itemInput.length);
    }));
  });

  describe('Items', () => {
    it('should have a items if provided', () => {
      // Arrange
      const itemInput: Item[] = [{ title: 'foo' }, { title: 'bar' }];

      // Act
      component.items = itemInput;
      fixture.detectChanges();

      // Assert
      const itemList = nativeElement.querySelectorAll('.item');
      expect(itemList.length).toBe(2);

      const checkboxList = nativeElement.querySelectorAll(
        '.item > input[type="checkbox"]'
      );
      expect(checkboxList.length).toBe(2);
    });
  });
});
