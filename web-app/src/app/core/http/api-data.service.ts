import { Injectable } from '@angular/core';
import { AxiosInterceptorService } from './axios-interceptor.service';

@Injectable({
  providedIn: 'root',
})
export class ApiDataService {

  constructor(private axiosService: AxiosInterceptorService) { }

  start(): Promise<any> {
    return this.axiosService.post('/api/waitingroom/join', {});
  }

  move(data: any): Promise<any> {
    return this.axiosService.post('/api/game/move', data);
  }

  leave(data: any): Promise<any> {
    return this.axiosService.post('/api/game/leave', data);
  }

  scores() : Promise<any> {
    return this.axiosService.post('/api/scores', {});

  }
}
