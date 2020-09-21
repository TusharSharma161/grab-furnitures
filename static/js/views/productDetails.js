
import AbstractView from './AbstractView.js';

export default class extends AbstractView {
  constructor(params) {
    super(params);
    this.productID = params.id;
    this.setTitle('Product Details');
  }

  async getHtml() {
    let url = '../../static/json/products.json';
    let response = await fetch(url);
    let products, product;
    if (response.ok) {
      products = await response.json();
      product = products.filter(item => {
        return item.id == this.productID;
      })[0];
    } else {
      console.log("HTTP-Error: " + response.status);
    }
    return `
        <div class="row">
          <div class="col-lg-12 col-md-12 col-12">
            <a href="/grab-furnitures/products/" class="nav__link backBtn" data-link>Back</a>
          </div>
        </div>
        <div class="row">
          <div class="col-lg-6 col-md-12 col-12 imageBox">
            <img class="productImg" src="${product.imgSrc}" alt="${product.imgAlt}">
          </div>
          <div class="col-lg-6 col-md 12 col-12 descBox">
            <h2>${product.name}</h2>
            <p>${product.description}</p>
            <div class="row">
              <div class="col-lg-6 col-md-6 col-6 price">
                <small> Cost Price :</small>
                <small>${product.price}</small>
              </div>
              <div clas="col-lg-6 col-md-6 col-6">
                <button type="button" value="Buy Now" class="buyNowBtn">Buy Now</button>
              </div>
            </div>
          </div>
        </div>
      `;
  }
}
