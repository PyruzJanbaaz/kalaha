import { Injectable } from '@angular/core';
import { AxiosInterceptorService } from './axios-interceptor.service';

@Injectable({
  providedIn: 'root',
})
export class ApiDataService {

  constructor(private axiosService: AxiosInterceptorService) { }

  startGame(data: any): Promise<any> {
    return this.axiosService.post('/api/v1/game', data);
  }

  exitGame(): Promise<any> {
    return this.axiosService.post('/api/v1/game/exit', {});
  }
}
