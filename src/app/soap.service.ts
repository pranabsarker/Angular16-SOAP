// soap.service.ts
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
// @ts-ignore
import { Observable } from 'rxjs';
import { SoapRequestBuilderService } from './soapRequestBuilder.service';
import {map, switchMap} from "rxjs/operators";
import {SoapResponseHandlerService} from "./soapResponseHandler.service";

@Injectable({
  providedIn: 'root'
})
export class SoapService {
  private endpointUrl = 'http://192.168.1.169:81/ProductManagement/ProductManagement.asmx';

  constructor(private http: HttpClient, private soapRequestBuilder: SoapRequestBuilderService, private soapResponseHandler: SoapResponseHandlerService) { }

  callSoapMethod(methodName: string, params: any, apiType: string, entity: string): Observable<any> {
    const soapRequest = this.soapRequestBuilder.buildSoapRequest(methodName, params,apiType,entity);
    const headers = new HttpHeaders({
      'Content-Type': 'text/xml;charset=UTF-8',
    });
    return this.http.post(this.endpointUrl, soapRequest, { headers: headers, responseType: 'text' })
      .pipe(
        switchMap((response: any) => {
          return this.soapResponseHandler.parseSoapResponse(response);
        }),
        map((parsedResponse: any) => {
          return this.soapResponseHandler.extractDataFromResponse(parsedResponse);
        })
      );

  }

  createProduct(productData: any): Observable<any> {
    return this.callSoapMethod('CreateProduct', productData,'create','product');
  }

  updateProduct(productData: any): Observable<any> {
    return this.callSoapMethod('UpdateProduct', productData,'update','product');
  }

  getProducts(): Observable<any>{
    return this.callSoapMethod('GetProducts', {},'','');
  }

  deleteProduct(productId: number): Observable<any>{
    const param = {
      id : productId
    }
    return this.callSoapMethod('DeleteProduct', param,'delete','');
  }

  // Implement other SOAP methods with dynamic actionURL
}
