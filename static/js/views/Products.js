import AbstractView from './AbstractView.js';
import { u } from '../lib.js';

export default class extends AbstractView {
  constructor(params) {
    super(params);
    this.setTitle('Products');
  }

  async getHtml() {
    let finalHtml = '';
    let url = '../../static/json/products.json';
    let response = await fetch(url);
    let productsArr;
    if (response.ok) {
      let products = await response.json();
      productsArr = Array.from(products);
      for (let item of productsArr) {
        let redirectPath = '/products/' + item.id;
        let htmlText = `
        <div class="col-lg-4 col-md-6 col-12">
          <div class="card">
            <img class="card-img-top" src="${item.imgSrc}" alt="${item.imgAlt}">
            <div class="card-body">
              <h5 class="card-title">${item.name}</h5>
            </div>
            <div class="card-footer">
              <div class="row">
                <div class="col-lg-6 col-md-6 col-6">
                  <small class="text-muted">${item.price}</small>
                </div>
                <div class="col-lg-6 col-md-6 col-6 text-right">
                  <a class="viewMore" href="${u(redirectPath)}" data-link>View More...</a>
                </div>
              </div>
            </div>
          </div>
        </div>
        `;
        finalHtml += htmlText;
      }
      return `
      <h1>Our Products : </h1>
      <div class="card-deck">
        ${finalHtml}
      </div>
      `;
    } else {
      alert("HTTP-Error: " + response.status);
      return `
      <h1>Our Products : </h1>
     <div class="alert alert-danger" role="alert">
        <p>
          Something went wrong. Please try Again
        </p>
        <p> Error : ${response.status}
        </p>
      </div>
      `;
    }
  }
}
