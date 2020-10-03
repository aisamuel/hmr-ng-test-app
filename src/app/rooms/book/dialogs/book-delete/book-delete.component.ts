import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Component, Inject } from '@angular/core';
import { BookService } from '../../book.service';

@Component({
  selector: 'app-book-delete',
  templateUrl: './book-delete.component.html',
  styleUrls: ['./book-delete.component.sass']
})
export class BookDeleteComponent {

  constructor(
    public dialogRef: MatDialogRef<BookDeleteComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public bookService: BookService
  ) {}
  onNoClick(): void {
    this.dialogRef.close();
  }
  confirmDelete(): void {
    this.bookService.deleteBooks(this.data.id);
  }

}
