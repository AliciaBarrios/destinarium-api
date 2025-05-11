/*eslint-disable*/

import { Injectable, InternalServerErrorException } from '@nestjs/common';
import * as sharp from 'sharp';
import { randomUUID } from 'crypto';
import * as fs from 'fs';
import * as path from 'path';

@Injectable()
export class ImageService {
  private uploadDir = path.join(process.cwd(), 'uploads');

  constructor() {
    if (!fs.existsSync(this.uploadDir)) {
      fs.mkdirSync(this.uploadDir, { recursive: true });
    }
  }

  async processAndSaveImage(file: Express.Multer.File): Promise<string> {
    const fileExt = path.extname(file.originalname);
    const fileName = `${randomUUID()}${fileExt}`;
    const filePath = path.join(this.uploadDir, fileName);

    try {
      await sharp(file.buffer)
        .resize(1200, 800, { fit: 'cover' })
        .jpeg({ quality: 80 })
        .toFile(filePath);

      return fileName;
    } catch (err) {
      console.error(err);
      throw new InternalServerErrorException('Error processing image');
    }
  }
}
