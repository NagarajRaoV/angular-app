import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LibService } from '../lib.service';
import { LibModel } from '../lib.model';

@Component({
  selector: 'app-add-books',
  templateUrl: './add-books.component.html',
  styleUrls: ['./add-books.component.css'],
})
export class AddBooksComponent implements OnInit {
  libraryForm: FormGroup;
  submitted = false;
  editingBook: LibModel | null = null;

  constructor(
    private formBuilder: FormBuilder,
    private libService: LibService,
    private router: Router
  ) {
    this.libraryForm = this.formBuilder.group({
      BookName: ['', Validators.required],
      Author: ['', Validators.required],
      Description: ['', Validators.required],
      Status: ['', Validators.required],
      Comment: ['', Validators.required],
    });

    const navigation = this.router.getCurrentNavigation();
    const state = navigation?.extras.state as { book: LibModel };
    if (state && state.book) {
      this.editingBook = state.book;
      this.libraryForm.patchValue(this.editingBook);
    }
  }

  ngOnInit(): void {}

  save(): void {
    if (this.libraryForm.valid) {
      const bookData: LibModel = this.libraryForm.value;

      if (this.editingBook) {
        this.libService
          .updateLib(this.editingBook.BookName, bookData)
          .subscribe({
            next: (response) => {
              console.log('Book updated successfully', response);
              this.submitted = true;
              this.libraryForm.reset();
            },
            error: (error) => {
              console.error('Error updating book', error);
            },
          });
      } else {
        this.libService.addLib(bookData).subscribe({
          next: (response) => {
            console.log('Book added successfully', response);
            this.submitted = true;
            this.libraryForm.reset();
          },
          error: (error) => {
            console.error('Error adding book', error);
          },
        });
      }
    } else {
      console.error('Form is invalid');
    }
  }
}
