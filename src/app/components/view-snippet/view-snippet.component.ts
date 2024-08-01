import { Component } from '@angular/core';
import { DbService } from '../../services/db.service';
import { ActivatedRoute, ActivatedRouteSnapshot } from '@angular/router';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-view-snippet',
  standalone: true,
  imports: [],
  templateUrl: './view-snippet.component.html',
  styleUrl: './view-snippet.component.css'
})
export class ViewSnippetComponent {
  codeSnipet = {
    title:"",
    code:""
  }
  constructor(private dbservice : DbService,private route : ActivatedRoute){
    
  }
  ngOnInit(){
    const docId=this.route.snapshot.paramMap.get('id');
    this.dbservice.getSnippetById(docId!).then((data:any)=>{
      this.codeSnipet=data
    })
  }

}
