import csv from 'csv-parser';
import { createReadStream } from 'streamifier';

export const csvToJson = async <T>(file: Express.Multer.File): Promise<T[]> => {
  const csvData: T[] = []; // Array to store parsed CSV data
  try {
    await new Promise((resolve, reject) => {
      createReadStream(file.buffer)
        .pipe(csv())
        .on('data', (data: T) => csvData.push(data))
        .on('error', (error) => reject(error))
        .on('end', async () => {
          try {
            resolve(csvData); // Resolve the promise with the parsed data
          } catch (error) {
            console.error('Error processing CSV data:', error);
            throw new Error('Errore durante la conversione del CSV.');
          }
        });
    });

    return csvData;
  } catch (error) {
    console.error('Error reading CSV file:', error);
    throw new Error('Errore nella lettura del file CSV.');
  }
};
