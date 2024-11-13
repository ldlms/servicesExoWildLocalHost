import { Injectable } from '@angular/core';
import { Article } from '../common/article';

@Injectable({
  providedIn: 'root'
})
export class ArticleService {

  constructor() { }
  
  articles: Article[] = this.getFromLocalStorage("articles");
  deletedArticles: Article[] = this.getFromLocalStorage("deleted-articles");

  createArticle(article: Article) {
    this.articles.push(article);
    localStorage.setItem('articles', JSON.stringify(this.articles)); // on passe de JS en String pour le stocker dans le LocalStorage
  }

  getFromLocalStorage(item: string): Article[] {
    const stringData = localStorage.getItem(item);
    const articles: Article[] = JSON.parse(stringData || '[]'); 
    return articles;
  }

  deleteArticle(article:Article) {
    const index = this.articles.findIndex((x) => x.id === article.id);
    this.articles.splice(index, 1);
    this.deletedArticles.push(article);
    localStorage.setItem('articles', JSON.stringify(this.articles));  // on passe de JS en String pour le stocker dans le LocalStorage
    localStorage.setItem('deleted-articles', JSON.stringify(this.deletedArticles));
  }

  deleteFromDeletedArticles(article: Article) {
    const index = this.deletedArticles.findIndex((x) => x.id === article.id);
    this.deletedArticles.splice(index, 1);
    localStorage.setItem('deleted-articles', JSON.stringify(this.deletedArticles));
  }

  restoreArticle(article:Article){
    this.createArticle(article);
    this.deleteFromDeletedArticles(article);
  }
}
