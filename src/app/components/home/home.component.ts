import { Component } from '@angular/core';
import { DbService } from '../../services/db.service';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  constructor(private dbservice : DbService){

  }
  item : {id : string,title : string}[] = []
  ngOnInit(){
    this.dbservice.getAllSnipet().then(data=>{
      console.log(data)
      this.item=data
    })
  }


}
