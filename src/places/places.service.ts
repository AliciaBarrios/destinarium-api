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

    async searchPlaces(query: string) {
        const key = this.configService.get('GOOGLE_API_KEY');

        const textSearchUrl = 'https://maps.googleapis.com/maps/api/place/textsearch/json';
        const params = {
            query,
            key,
        };

        const response = await firstValueFrom(
            this.httpService.get(textSearchUrl, { params })
        );

        const results = response.data.results;

        return results.map(place => {
            const photos = (place.photos || []).map(
                (p) => this.getPhotoUrl(p.photo_reference, 400)
            );

            return {
                name: place.name,
                address: place.formatted_address,
                rating: place.rating,
                types: place.types,
                photos,
                place_id: place.place_id,
                location: place.geometry?.location,
            };
        });
    }

    getPhotoUrl(photoReference: string, maxWidth = 400): string {
        const key = this.configService.get('GOOGLE_API_KEY');
        return `https://maps.googleapis.com/maps/api/place/photo?maxwidth=${maxWidth}&photoreference=${photoReference}&key=${key}`;
    }
}
