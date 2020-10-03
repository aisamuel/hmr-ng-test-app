import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { BookService } from './book.service';
import { CustomersService } from '../customers/customers.service';
import { RoomsService } from '../rooms/rooms.service';
import { HttpClient } from '@angular/common/http';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { Books } from './book';
import { Customers } from '../customers/customers';
import { Rooms } from '../rooms/rooms';
import { DataSource } from '@angular/cdk/collections';
import { MatSnackBar } from '@angular/material/snack-bar';
import { BehaviorSubject, fromEvent, merge, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { BookDeleteComponent } from './dialogs/book-delete/book-delete.component';
import { BookFormDialogComponent } from './dialogs/book-form-dialog/book-form-dialog.component';
import { MatMenuTrigger } from '@angular/material/menu';
import { SelectionModel } from '@angular/cdk/collections';

@Component({
  selector: 'app-book',
  templateUrl: './book.component.html',
  styleUrls: ['./book.component.sass']
})
export class BookComponent implements OnInit {

  displayedColumns = [
    'select',
    'name',
    'mobile',
    'room',
    'no_of_nights',
    'amount',
    'from',
    'to',
    'booking_id',
    'actions',
  ];
  exampleDatabase: BookService | null;
  customersService: CustomersService | null;
  roomsService: RoomsService | null;
  dataSource: ExampleDataSource | null;
  selection = new SelectionModel<Books>(true, []);
  id: number;
  customers: Customers[];
  books: Books | null;
  rooms: Rooms[];
  constructor(
    public httpClient: HttpClient,
    public dialog: MatDialog,
    public booksService: BookService ,
    private snackBar: MatSnackBar
  ) { }
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  @ViewChild('filter', { static: true }) filter: ElementRef;
  @ViewChild(MatMenuTrigger)
  contextMenu: MatMenuTrigger;
  contextMenuPosition = { x: '0px', y: '0px' };

  ngOnInit() {
    this.loadCustomersData();
    this.loadRoomsData();
    this.loadData();
  }
  refresh() {
    this.loadData();
  }
  loadCustomersData(){
    this.booksService.getAllCustomers()
     .subscribe(
       (response) => {
         this.customers = response;
         console.log(response);
         console.log("get classes working");
        //  this.getParentProfile();

       }, (error) => {
         console.error(error);
         console.log("get classes not working")

       }
     );
  }
  loadRoomsData(){
    this.booksService.getAllRooms()
     .subscribe(
       (response) => {
         this.rooms = response;
         console.log(response);
         console.log("get classes working");
        //  this.getParentProfile();

       }, (error) => {
         console.error(error);
         console.log("get classes not working")

       }
     );
  }
    

  addNew() {
    const dialogRef = this.dialog.open(BookFormDialogComponent, {
      data: {
        books: this.books,
        action: 'add',
      },
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result === 1) {
        // After dialog is closed we're doing frontend updates
        // For add we're just pushing a new row inside DataServicex
        this.exampleDatabase.dataChange.value.unshift(
          this.booksService.getDialogData()
        );
        this.refreshTable();
        this.showNotification(
          'snackbar-success',
          'Add Booking Successfully...!!!',
          'bottom',
          'center'
        );
      }
    });
  }
  editCall(row) {
    this.id = row.id;
    const dialogRef = this.dialog.open(BookFormDialogComponent, {
      data: {
        books: row,
        action: 'edit',
      },
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result === 1) {
        // When using an edit things are little different, firstly we find record inside DataService by id
        const foundIndex = this.exampleDatabase.dataChange.value.findIndex(
          (x) => x.id === this.id
        );
        // Then you update that record using data from dialogData (values you enetered)
        this.exampleDatabase.dataChange.value[
          foundIndex
        ] = this.booksService.getDialogData();
        // And lastly refresh table
        this.refreshTable();
        this.showNotification(
          'black',
          'Edit Booking Successfully...!!!',
          'bottom',
          'center'
        );
      }
    });
  }
  deleteItem(row) {
    this.id = row.id;
    const dialogRef = this.dialog.open(BookDeleteComponent, {
      data: row,
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result === 1) {
        const foundIndex = this.exampleDatabase.dataChange.value.findIndex(
          (x) => x.id === this.id
        );
        // for delete we use splice in order to remove single object from DataService
        this.exampleDatabase.dataChange.value.splice(foundIndex, 1);
        this.refreshTable();
        this.showNotification(
          'snackbar-danger',
          'Delete Booking Successfully...!!!',
          'bottom',
          'center'
        );
      }
    });
  }
  private refreshTable() {
    this.paginator._changePageSize(this.paginator.pageSize);
  }
  /** Whether the number of selected elements matches the total number of rows. */
  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.renderedData.length;
    return numSelected === numRows;
  }

  /** Selects all rows if they are not all selected; otherwise clear selection. */
  masterToggle() {
    this.isAllSelected()
      ? this.selection.clear()
      : this.dataSource.renderedData.forEach((row) =>
        this.selection.select(row)
      );
  }
  removeSelectedRows() {
    const totalSelect = this.selection.selected.length;
    this.selection.selected.forEach((item) => {
      const index: number = this.dataSource.renderedData.findIndex(
        (d) => d === item
      );
      // console.log(this.dataSource.renderedData.findIndex((d) => d === item));
      this.exampleDatabase.dataChange.value.splice(index, 1);
      this.refreshTable();
      this.selection = new SelectionModel<Books>(true, []);
    });
    this.showNotification(
      'snackbar-danger',
      totalSelect + ' Record Delete Successfully...!!!',
      'bottom',
      'center'
    );
  }
  public loadData() {
    this.exampleDatabase = new BookService(this.httpClient);
    this.dataSource = new ExampleDataSource(
      this.exampleDatabase,
      this.paginator,
      this.sort
    );
    fromEvent(this.filter.nativeElement, 'keyup')
      // .debounceTime(150)
      // .distinctUntilChanged()
      .subscribe(() => {
        if (!this.dataSource) {
          return;
        }
        this.dataSource.filter = this.filter.nativeElement.value;
      });
  }
  showNotification(colorName, text, placementFrom, placementAlign) {
    this.snackBar.open(text, '', {
      duration: 2000,
      verticalPosition: placementFrom,
      horizontalPosition: placementAlign,
      panelClass: colorName,
    });
  }
  // context menu
  onContextMenu(event: MouseEvent, item: Books) {
    event.preventDefault();
    this.contextMenuPosition.x = event.clientX + 'px';
    this.contextMenuPosition.y = event.clientY + 'px';
    this.contextMenu.menuData = { item: item };
    this.contextMenu.menu.focusFirstItem('mouse');
    this.contextMenu.openMenu();
  }
}
export class ExampleDataSource extends DataSource<Books> {
  _filterChange = new BehaviorSubject('');
  get filter(): string {
    return this._filterChange.value;
  }
  set filter(filter: string) {
    this._filterChange.next(filter);
  }
  filteredData: Books[] = [];
  renderedData: Books[] = [];
  constructor(
    public _exampleDatabase: BookService,
    public _paginator: MatPaginator,
    public _sort: MatSort
  ) {
    super();
    // Reset to the first page when the user changes the filter.
    this._filterChange.subscribe(() => (this._paginator.pageIndex = 0));
  }
  /** Connect function called by the table to retrieve one stream containing the data to render. */
  connect(): Observable<Books[]> {
    // Listen for any changes in the base data, sorting, filtering, or pagination
    const displayDataChanges = [
      this._exampleDatabase.dataChange,
      this._sort.sortChange,
      this._filterChange,
      this._paginator.page,
    ];
    this._exampleDatabase.getAllBooks();
    return merge(...displayDataChanges).pipe(
      map(() => {
        // Filter data
        this.filteredData = this._exampleDatabase.data
          .slice()
          .filter((books: Books) => {
            const searchStr = (
              books.id +
              books.amount +
              books.booking_id +
              books.customers.name +
              books.customers.mobile +
              books.no_of_nights +
              books.from +
              books.to +
              books.rooms.occupied
              ).toLowerCase();
            return searchStr.indexOf(this.filter.toLowerCase()) !== -1;
          });
        // Sort filtered data
        const sortedData = this.sortData(this.filteredData.slice());
        // Grab the page's slice of the filtered sorted data.
        const startIndex = this._paginator.pageIndex * this._paginator.pageSize;
        this.renderedData = sortedData.splice(
          startIndex,
          this._paginator.pageSize
        );
        return this.renderedData;
      })
    );
  }
  disconnect() { }
  /** Returns a sorted copy of the database data. */
  sortData(data: Books[]): Books[] {
    if (!this._sort.active || this._sort.direction === '') {
      return data;
    }
    return data.sort((a, b) => {
      let propertyA: number | string = '';
      let propertyB: number | string = '';
      switch (this._sort.active) {
        case 'id':
          [propertyA, propertyB] = [a.id, b.id];
          break;
        case 'name':
          [propertyA, propertyB] = [a.customers.name, b.customers.name];
          break;
        case 'mobile':
          [propertyA, propertyB] = [a.customers.mobile, b.customers.mobile];
          break;
        case 'booking_id':
          [propertyA, propertyB] = [a.booking_id, b.booking_id];
          break;
        case 'room_number':
          [propertyA, propertyB] = [a.rooms.room_number, b.rooms.room_number];
          break;
        case 'amount':
          [propertyA, propertyB] = [a.amount, b.amount];
          break;
        case 'from':
          [propertyA, propertyB] = [a.from, b.from];
          break;
        case 'to':
          [propertyA, propertyB] = [a.to, b.to];
          break;
      }
      const valueA = isNaN(+propertyA) ? propertyA : +propertyA;
      const valueB = isNaN(+propertyB) ? propertyB : +propertyB;
      return (
        (valueA < valueB ? -1 : 1) * (this._sort.direction === 'asc' ? 1 : -1)
      );
    });
  }


}
