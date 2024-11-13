import { Injectable } from '@angular/core';
import { Article } from '../common/article';

@Injectable({
  providedIn: 'root'
})
export class ArticleService {

  constructor() { }
  
  articles!: Article[];

  createArticle(article: Article) {
    const existingArticles:Article[] = JSON.parse(localStorage.getItem('articles') || '[]')
    existingArticles.push(article);
    localStorage.setItem('articles', JSON.stringify(existingArticles));
  }

  getFromLocalStorage(): Article[] {

    const stringData = localStorage.getItem('articles');
    const articles: Article[] = JSON.parse(stringData || '[]');
    return articles;
  }

  getDeletedArticle(){
    const stringData = localStorage.getItem('deletedArticles');
    const deletedArticles: Article[] = JSON.parse(stringData || '[]');
    return deletedArticles;
  }

  deleteArticle(articleToDelete:Article) {
    const index = articleToDelete.id;
    const deletedArticles:Article[] = JSON.parse(localStorage.getItem('deletedArticles') || '[]');
    const existingArticles:Article[] = JSON.parse(localStorage.getItem('articles') || '[]');

    const deletedArticle:Article = existingArticles.find((article:Article) => index == article.id) as Article;

    deletedArticles.push(deletedArticle); 

    const updatedArticles = existingArticles.filter((article:Article) => index != article.id);

    localStorage.setItem('articles',JSON.stringify(updatedArticles));
    localStorage.setItem('deletedArticles',JSON.stringify(deletedArticles));
  }

  restoreArticle(id:string){
    const deletedArticle:Article[] = JSON.parse(localStorage.getItem('deletedArticles') || '[]');
    const existingArticles:Article[] = JSON.parse(localStorage.getItem('articles') || '[]');
    existingArticles.push(deletedArticle.find((article:Article) => id == article.id) as Article);
    const deletedArticlesAfterRestore:Article[] = deletedArticle.filter((article:Article) => id != article.id);

    localStorage.setItem('articles',JSON.stringify(existingArticles));
    localStorage.setItem('deletedArticles',JSON.stringify(deletedArticlesAfterRestore));
  }
}
