import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SoapRequestBuilderService {

  constructor() { }

  buildSoapRequest(methodName: string, params: any, apiType: string, entity: string): string {
    const soapEnvelope =
      `<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:tem="http://tempuri.org/">
          <soapenv:Body>
            <tem:${methodName}>
                ${this.buildParams(params,apiType,entity)}
            </tem:${methodName}>
          </soapenv:Body>
        </soapenv:Envelope>`;

    return soapEnvelope;
  }

  private buildParams(params: any,apiType: string, entity: string): string {
    let paramXML = '';
      // Loop through params and build the XML request

    apiType=='create' || apiType== 'update' ? paramXML += `<tem:${entity.toLowerCase()}>`:'';
    for (const key in params) {
      if (params.hasOwnProperty(key)) {
        paramXML += `<tem:${key}>${params[key]}</tem:${key}>`;
      }
    }
    apiType=='create' || apiType== 'update'? paramXML += `</tem:${entity.toLowerCase()}>`:'';

    return paramXML;
  }
}
