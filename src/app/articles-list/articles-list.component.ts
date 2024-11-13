import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Article } from '../common/article';
import { ArticleService } from '../shared/article.service';

@Component({
  selector: 'app-articles-list',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './articles-list.component.html',
  styleUrl: './articles-list.component.css'
})
export class ArticlesListComponent {

constructor( private articleService:ArticleService){}

article: Article = {
  id: "",
  name: '',
  price: '',
  contact: '',
  stock: '',
};

articles!: Article[];

ngOnInit() {
  this.articles = this.articleService.getFromLocalStorage();
  console.log(this.articles);
}

createArticle(){
 this.articleService.createArticle(this.article);
}
deleteArticle(articleToDelete:Article){
  this.articleService.deleteArticle(articleToDelete);
}
}