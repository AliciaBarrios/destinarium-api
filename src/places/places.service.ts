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
    async getCoordinates(place: string): Promise<{ lat: number; lng: number }> {
        const key = this.configService.get('GOOGLE_API_KEY');

        const url = 'https://maps.googleapis.com/maps/api/place/findplacefromtext/json';
        const params = {
            input: place,
            inputtype: 'textquery',
            fields: 'geometry',
            key,
        };

        const response = await firstValueFrom(
            this.httpService.get(url, { params })
        );

        const candidates = response.data.candidates;

        if (candidates && candidates.length > 0) {
            const location = candidates[0].geometry.location;
            return { lat: location.lat, lng: location.lng };
        } else {
            throw new Error('No se encontró el lugar');
        }
    }

    getGoogleMapsApiUrl(): { url: string } {
        const apiKey = this.configService.get('GOOGLE_API_KEY');
        const url = `https://maps.googleapis.com/maps/api/js?key=${apiKey}&libraries=places`;
        return { url };
    }

    getPhotoUrl(photoReference: string, maxWidth = 400): string {
        const key = this.configService.get('GOOGLE_API_KEY');
        return `https://maps.googleapis.com/maps/api/place/photo?maxwidth=${maxWidth}&photoreference=${photoReference}&key=${key}`;
    }
}
