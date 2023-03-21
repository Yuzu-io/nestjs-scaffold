import { Injectable } from '@nestjs/common';
import * as path from 'path';
import * as fs from 'fs';
import * as uuid from 'uuid';
import * as dayjs from 'dayjs';

@Injectable()
export class FileService {
  async uploadFile(file: Express.Multer.File) {
    // console.log(file);

    const fileName = uuid.v4() + path.extname(file.originalname);

    const folderPath = path.resolve(
      'public',
      'uploads',
      `${dayjs().format('YYYY-MM-DD')}`,
    );
    const filePath = path.resolve(
      'public',
      'uploads',
      `${dayjs().format('YYYY-MM-DD')}`,
      fileName,
    );

    // 检查目录是否存在，不存在直接创建
    if (!fs.existsSync(folderPath)) {
      fs.mkdirSync(folderPath, { recursive: true });
    }

    return new Promise((resolve, reject) =>
      fs.writeFile(filePath, file.buffer, (err) => {
        if (err) {
          reject(err);
        } else {
          resolve({
            fileName,
            filePath:
              `/public/uploads/${dayjs().format('YYYY-MM-DD')}/` + fileName,
          });
        }
      }),
    );
  }
}
