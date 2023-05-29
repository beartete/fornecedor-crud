import { Component, OnInit } from '@angular/core';
import { CrudService } from '../crud.service';

import { FormBuilder, FormGroup } from '@angular/forms';
import { Fornecedor } from '../crud';

@Component({
  selector: 'app-crud',
  templateUrl: './crud.component.html',
  styleUrls: ['./crud.component.css']
})
export class CrudComponent implements OnInit {
  fornecedor: Fornecedor[] = [];
  formGroupFornecedor: FormGroup;
  isEditing: boolean = false;

  constructor(private crudService: CrudService, private formBuilder: FormBuilder) {

    this.formGroupFornecedor = formBuilder.group({
      id: [''],
      name: [''],
      active: [''],
      category: ['Regional'],
      contact: ['']
    })
  }
  ngOnInit(): void {
    this.loadFornecedor();
  }

  loadFornecedor() {
    this.crudService.getFornecedor().subscribe({
      next: data => this.fornecedor = data
    })
  }
  salvarFornecedor() {
    if (this.isEditing) {
       this.isEditing = false;
       this.crudService.updateFornecedor(this.formGroupFornecedor.value).subscribe({
        next: data => {
          this.loadFornecedor();
          this.formGroupFornecedor.reset();
        }
      })
    }
    else {
      this.crudService.salvarFornecedor(this.formGroupFornecedor.value).subscribe({
        next: data => {
          this.fornecedor.push(data);
          this.formGroupFornecedor.reset();
        }
      })
    }
  }
  editFornecedor(fornecedor: Fornecedor): void {
    this.formGroupFornecedor.setValue(fornecedor);
    this.isEditing = true;
  }
  removerFornecedor(fornecedor: Fornecedor): void {
    this.crudService.removerFornecedor(fornecedor).subscribe({
      next: () => {
        this.fornecedor.splice(this.fornecedor.indexOf(fornecedor), 1);
      }
    })
  }
}