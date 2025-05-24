/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { ConfigService } from '@nestjs/config';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class PlacesService {
    constructor(
        private readonly httpService: HttpService,
        private readonly configService: ConfigService,
    ) {}

    async searchPlace(query: string) {
        const url = 'https://maps.googleapis.com/maps/api/place/findplacefromtext/json';
        const params = {
        input: query,
        inputtype: 'textquery',
        fields: 'place_id,name,formatted_address,geometry',
        key: this.configService.get('GOOGLE_API_KEY'),
        };

        const response = await firstValueFrom(
        this.httpService.get(url, { params })
        );

        return response.data;
    }
}
