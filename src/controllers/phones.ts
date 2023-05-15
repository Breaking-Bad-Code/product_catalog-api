import fs, { PathLike, promises as fsPromises } from 'fs';
import { Request, Response } from 'express';
import path from 'path';
import { Phone } from '../types/Phone';

const __dirname = path.resolve();

interface getPhonesQuery {
  from?: string;
  to?: string;
  id?: string | string[];
}

const getPhones = (
  req: Request<
    unknown,
    unknown,
    unknown,
    getPhonesQuery
  >,
  res: Response
) => {
  const { from, to, id } = req.query;
  const filePath: PathLike = path.join(
    __dirname,
    'public',
    'api',
    'phones.json',
  );

  if (
    from === undefined
    && to === undefined
    && id === undefined
  ) {
    const stream = fs.createReadStream(filePath);

    stream.pipe(res);

    return;
  }

  

  fsPromises.readFile(filePath)
    .then(data => {
      const rawData = Buffer.from(data).toString();
      const phones: Phone[] = JSON.parse(rawData);
      let selectedPhones: Phone[] = [];

      if (id === undefined) {
        const fromValue = Number(from);
        const toValue = Number(to);
        
        if (
          isNaN(fromValue)
          || isNaN(toValue)
          || toValue < fromValue
          || toValue + 1 > phones.length
        ) {
          res.sendStatus(400);
          
          return;
        }

        selectedPhones = phones.slice(fromValue, toValue + 1);
      } else {
        const ids = typeof id === 'string' ? [id] : id;

        selectedPhones = phones.filter(phone => ids.includes(phone.id));
      }

      res.json({
        total: phones.length,
        data: selectedPhones,
      });
    }) 
    .catch(err => {
      if (err) {
        res.sendStatus(400);

        return;
      }
    });
};

const getFileById = (req: Request, res: Response) => {
  const { phoneId } = req.params;

  const filePath = path.join(
    __dirname,
    'public',
    'api',
    'phones',
    `${phoneId}.json`,
  );

  if (!fs.existsSync(filePath)) {
    res.sendStatus(404);

    return;
  }

  const stream = fs.createReadStream(filePath);
  
  stream.pipe(res);
};

export default {
  getPhones,
  getFileById,
};