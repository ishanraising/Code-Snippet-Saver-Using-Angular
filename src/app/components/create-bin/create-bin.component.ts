import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { DbService } from '../../services/db.service';
import { Sinppet } from '../../../models/Snippet';

@Component({
  selector: 'app-create-bin',
  standalone: true,
  imports: [ ReactiveFormsModule],
  templateUrl: './create-bin.component.html',
  styleUrl: './create-bin.component.css'
})
export class CreateBinComponent {

  constructor(private dbservice : DbService){}

  title = new FormControl("",[
    Validators.required
  ])

  code = new FormControl("",[
    Validators.required
  ])
  binForm = new FormGroup({
    title : this.title,
    code : this.code
  }) 
  async save(){
    console.log(this.binForm.value)
    await this.dbservice.create(this.binForm.value as Sinppet)
  }
}
