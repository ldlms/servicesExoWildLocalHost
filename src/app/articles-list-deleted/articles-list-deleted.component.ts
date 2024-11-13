import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Article } from '../common/article';
import { ArticleService } from '../shared/article.service';

@Component({
  selector: 'app-articles-list-deleted',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './articles-list-deleted.component.html',
  styleUrl: './articles-list-deleted.component.css'
})
export class ArticlesListDeletedComponent {
  
  constructor(private articleService:ArticleService){}

  articlesDeleted: Article[] = this.articleService.deletedArticles;
  article: Article = {
    id: "",
    name: '',
    price: '',
    contact: '',
    stock: '',
  };
  
  restore(article:Article) {
    this.articleService.restoreArticle(article);
  }
}
