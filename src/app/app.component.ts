import {Component, OnInit} from '@angular/core';
import {SoapService} from "./soap.service";
import {Product} from "./model/product.model";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  title = 'Angular-SOAP';
  products: any;
  product: Product = new Product();


  constructor(private soapService: SoapService) {

  }
  displayStyle = "none";

  openPopup(product: Product | null) {
    if(product?.Id){
      this.product = product;
    }else {
      this.product = new Product();
    }
    this.displayStyle = "block";
  }
  closePopup() {
    this.displayStyle = "none";
  }
  ngOnInit():void{
    this.getProductsList();
  }

  private getProductsList() {
    this.soapService.getProducts().subscribe((response: any) => {
      console.log(response);
      this.products = response.GetProductsResponse.GetProductsResult.Product;
    })
  }


  deleteProduct(productId: number){
    this.soapService.deleteProduct(productId).subscribe((response: any) => {
      console.log(response);
      this.getProductsList();
      // this.products = response.GetProductsResponse.GetProductsResult.Product;
    })
  }

  onSubmit(): void {
    // Process checkout data here

    console.log('Your Product data : ', this.product );

    if(this.product.Name && this.product.Price)
    if(this.product.Id){
      this.soapService.updateProduct(this.product).subscribe((response: any) => {
        console.log(response);
        this.closePopup();
        this.getProductsList();
        // this.products = response.GetProductsResponse.GetProductsResult.Product;
      })
    }else{
        this.soapService.createProduct(this.product).subscribe((response: any) =>{
          console.log(response);
          console.log(response.CreateProductResponse.CreateProductResult);
          this.closePopup();
          this.getProductsList();
        });
    }


  }

}
