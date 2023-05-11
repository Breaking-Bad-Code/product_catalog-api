import fs, { PathLike, promises as fsPromises } from 'fs';
import { Request, Response } from 'express';
import path from 'path';
import { Phone } from '../types/Phone';

const __dirname = path.resolve();

interface getPhonesQuery {
  from?: string;
  to?: string;
}

const getPhones = (req: Request<{}, {}, {}, getPhonesQuery>, res: Response) => {
  const { from, to } = req.query;
  const filePath: PathLike = path.join(
    __dirname,
    'public',
    'api',
    'phones.json',
  );


  if (from === undefined && to === undefined) {
      const stream = fs.createReadStream(filePath);

      stream.pipe(res);

      return
  }

  const fromValue = Number(from);
  const toValue = Number(to);

  if (isNaN(fromValue) || isNaN(toValue) || toValue < fromValue) {
    res.sendStatus(400);

    return;
  }

  fsPromises.readFile(filePath)
    .then(data => {
      const rawData = Buffer.from(data).toString();
      const phones: Phone[] = JSON.parse(rawData);
      if (toValue + 1 > phones.length) {
        res.sendStatus(400);
        
        return;
      }

      const selectedPhones = phones.slice(fromValue, toValue + 1);

      res.json({
        total: phones.length,
        data: selectedPhones,
      })
    }) 
    .catch(err => {
      if (err) {
        res.sendStatus(400);

        return;
      }
    });
};


const getFileById = (req: Request, res: Response) => {
  const { phoneId } = req.params

  const filePath = path.join(
    __dirname,
    'public',
    'api',
    'phones',
    `${phoneId}.json`,
  );

  const stream = fs.createReadStream(filePath);
  
  stream.pipe(res);
}


export default {
    getPhones,
    getFileById,
}
