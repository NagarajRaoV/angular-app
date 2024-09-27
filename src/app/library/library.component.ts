import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { LibService } from '../lib.service';
import { LibModel } from '../lib.model';

@Component({
  selector: 'app-hola',
  templateUrl: './library.component.html',
  styleUrls: ['./library.component.css'],
})
export class LibraryComponent implements OnInit {
  displayedColumns: string[] = [
    'BookName',
    'Author',
    'Description',
    'Status',
    'Comment',
    'Actions',
  ];
  dataSource: MatTableDataSource<LibModel> = new MatTableDataSource();

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private libService: LibService, private router: Router) {}

  ngOnInit(): void {
    this.loadBooks();
  }

  loadBooks(): void {
    this.libService.getAllLibs().subscribe({
      next: (data: LibModel[]) => {
        this.dataSource.data = data;
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      },
      error: (error) => {
        console.error('Error fetching books', error);
      },
    });
  }

  editBook(book: LibModel): void {
    this.router.navigate(['/addBooks'], { state: { book } });
  }

  deleteBook(id: string): void {
    if (confirm('Are you sure you want to delete this book?')) {
      this.libService.deleteLib(id).subscribe({
        next: () => {
          console.log('Book deleted successfully');
          this.loadBooks();
        },
        error: (error) => {
          console.error('Error deleting book', error);
        },
      });
    }
  }
}
