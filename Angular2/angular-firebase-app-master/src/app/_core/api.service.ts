import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpErrorResponse } from '@angular/common/http';
import { RequestOptions } from '@angular/http';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/shareReplay';
import { environment } from '../../environments/environment';
import { LoggerService } from './logger/logger.service';
import { catchError } from 'rxjs/operators';
import { ErrorObservable } from 'rxjs/observable/ErrorObservable';

@Injectable()
export class ApiService {

  constructor(private http: HttpClient) {
  }

  SellDefaultAncillaries() {
    return this.http.post<any>(environment.apiURL + '/booking/DefaultAncillariesSelector', helper.httpOptions)
      .pipe(
      );
  }

  AddSsr(addSsrRequest: externalModels.AddSsrRequest) {
    return this.http.post<any>(environment.apiURL + '/booking/ancillary', addSsrRequest, helper.httpOptions)
      .pipe(
      );
  }

  RemoveSsr(addSsrRequest: externalModels.AddSsrRequest) {

    return this.http.request<any>('delete', environment.apiURL +  '/booking/ancillary', { body: addSsrRequest })
    .pipe(
    );
  }
  
  GetMeals() {
    return this.http.get<externalModels.AvailableAncillariesResponse>(environment.apiURL + '/booking/availableAncillaries?AncillaryTypes=Meal', helper.httpOptions)
    .pipe(
    );
  }

  GetBaggages() {
    return this.http.get<externalModels.AvailableAncillariesResponse>(environment.apiURL 
      + '/booking/availableAncillaries?AncillaryTypes=Baggage', helper.httpOptions)
    .pipe(
    );
  }

  GetOverSizeBaggages() {
    return this.http.get<externalModels.AvailableAncillariesResponse>(environment.apiURL + '/booking/availableAncillaries?AncillaryTypes=Oversize', helper.httpOptions)
    .pipe(
    );
  }

  GetPriority() {
    return this.http.get<externalModels.AvailableAncillariesResponse>(environment.apiURL + '/booking/availableAncillaries?AncillaryTypes=Priority', helper.httpOptions)
    .pipe(
    );
  }

  AddPassenger(addPassengerRequest: externalModels.AddPassengerRequest): Observable<any> {

    return this.http.post<any>(environment.apiURL + '/passenger', addPassengerRequest, helper.httpOptions)
      .pipe(
      //  catchError(this.handleError)
      );
  }

  AddContact(addContactRequest: externalModels.AddBookingContactRequest): Observable<any> {
    return this.http.post<any>(environment.apiURL + '/booking/contact', addContactRequest, helper.httpOptions)
    .pipe(
    //  catchError(this.handleError)
    );
  }

  AddJimuPayment(addJimuPaymentRequest: externalModels.AddJimuPaymentRequest): Observable<externalModels.AddJimuPaymentResponse> {
    return this.http.post<externalModels.AddJimuPaymentResponse>(environment.apiURL + '/booking/payment/jimu', addJimuPaymentRequest, helper.httpOptions)
    .pipe(
    //  catchError(this.handleError)
    );
  }

  AddCCPayment(addCCPaymentRequest: externalModels.AddCCPaymentRequest): Observable<externalModels.AddCCPaymentResponse> {
    return this.http.post<externalModels.AddCCPaymentResponse>(environment.apiURL + '/booking/payment/creditcard', addCCPaymentRequest, helper.httpOptions)
    .pipe(
    //  catchError(this.handleError)
    );
  }

  AddWorldPayPayment(request: externalModels.AddWorldPayRequest): Observable<externalModels.AddWorldPayResponse> {
    return this.http.post<externalModels.AddWorldPayResponse>(environment.apiURL + '/booking/payment/worldpay', request, helper.httpOptions)
    .pipe(
    //  catchError(this.handleError)
    );
  }

  GetWorldPayOrder(request: externalModels.WorldPayOrderRequest): Observable<externalModels.WorldPayResponse> {
    let httpParams = {};

    httpParams['OrderNumber'] = request.OrderNumber;

    return this.http.get<externalModels.WorldPayResponse>(environment.apiURL + '/booking/payment/worldpay', { params: httpParams })
    .pipe(
     // catchError(this.handleError)
    );
  }

  WorldPayVerifyPayment(request: externalModels.WorldPayVerifyRequest): Observable<externalModels.WorldPayResponse> {
    return this.http.post<externalModels.WorldPayResponse>(environment.apiURL + '/booking/payment/worldpayverify', request, helper.httpOptions)
    .pipe(
    //  catchError(this.handleError)
    );
  }

  CCPaymentValidation(request: externalModels.ExternalCCPaymentValidationRequest): Observable<externalModels.ExternalCCPaymentValidationResponse> {
    return this.http.post<externalModels.ExternalCCPaymentValidationResponse>(environment.apiURL + '/booking/payment/externalCreditCardPaymentValidation', request, helper.httpOptions)
    .pipe(
    //  catchError(this.handleError)
    );
  }

  AddVoucherPayment(voucherPaymentRequest: externalModels.VoucherPaymentRequest): Observable<externalModels.VoucherPaymentResponse> {
    return this.http.post<externalModels.VoucherPaymentResponse>(environment.apiURL + '/booking/payment/voucher', voucherPaymentRequest, helper.httpOptions)
    .pipe(
    //  catchError(this.handleError)
    );
  }

  RemoveVoucherPayment(voucherPaymentRequest: externalModels.VoucherPaymentRequest): Observable<externalModels.ApiResponse> {
    let httpParams = {};

    httpParams['voucherId'] = voucherPaymentRequest.VoucherId;

    return this.http.request<any>('delete', environment.apiURL +  '/booking/payment/voucher', { params: httpParams })
    .pipe(
    //  catchError(this.handleError)
    );
  }

  GetPoints(getPointsRequest: externalModels.GetPointsRequest): Observable<externalModels.GetPointsResponse> {
    let httpParams = {};

    httpParams['Password'] = getPointsRequest.Password;
    httpParams['LoyaltyNumber'] = getPointsRequest.LoyaltyNumber;

    return this.http.get<externalModels.GetPointsResponse>(environment.apiURL + '/booking/payment/loyalty', { params: httpParams })
    .pipe(
     // catchError(this.handleError)
    );
  }

  AddLoyaltyPayment(loyaltyPaymentRequest: externalModels.LoyaltyPaymentRequest): Observable<externalModels.ApiResponse> {
    return this.http.post<externalModels.ApiResponse>(environment.apiURL + '/booking/payment/loyalty', loyaltyPaymentRequest, helper.httpOptions)
    .pipe(
     // catchError(this.handleError)
    );
  }

  RemoveLoyaltyPayment(): Observable<externalModels.ApiResponse> {
    return this.http.request<any>('delete', environment.apiURL + '/booking/payment/loyalty', {body: {}, withCredentials: true})
    .pipe(
    //  catchError(this.handleError)
    );
  }

  CommitBooking(): Observable<ApiResponse> {
    return this.http.post<any>(environment.apiURL + '/booking', '', helper.httpOptions)
    .pipe(
    //  catchError(this.handleError)
    );
  }

  GetDayAvailability(request: externalModels.DayAvailabilityRequest, tripType: string): Observable<externalModels.DayAvailabilityResponse> {
    let httpParams = {};

    httpParams['outboundDate'] = helper.convertToApiDate(request.outboundDate);
    if (tripType === 'RT' || tripType === 'MC') {
      httpParams['returnDate'] = helper.convertToApiDate(request.returnDate);
    }


    return this.http.get<any>(environment.apiURL + '/availability/dayavailability',
      { params: httpParams })
      .pipe(
      )
      .shareReplay();
  }

}
