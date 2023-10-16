import { Injectable } from '@angular/core';
import { parseString } from 'xml2js';

@Injectable({
  providedIn: 'root'
})
export class SoapResponseHandlerService {

  constructor() { }

  // Parse the SOAP response and extract the data
  parseSoapResponse(response: string): Promise<any> {
    return new Promise((resolve, reject) => {
      parseString(response, { explicitArray: false }, (error, result) => {
        if (error) {
          reject(error);
        } else {
          resolve(result);
        }
      });
    });
  }

  // Extract the data you need from the SOAP response
  extractDataFromResponse(soapResponse: any): any {
    // Customize this method based on the structure of your SOAP response
    const responseData = soapResponse['soap:Envelope']['soap:Body'];
    // You can then navigate the responseData object to extract specific data.
    // For example, if your data is under 'GetProductsResult', you can do:
    // const products = responseData.GetProductsResponse.GetProductsResult;
    return responseData;
  }
}
