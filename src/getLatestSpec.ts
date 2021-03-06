import { assert } from '@fmtk/decoders';
import http from 'http';
import https from 'https';
import stream from 'stream';
import zlib from 'zlib';
import {
  CloudFormationSpec,
  decodeCloudFormationSpec,
} from './CloudFormationSpec.js';

export const DefaultSpecUrl =
  'https://d1uauaxba7bl26.cloudfront.net/latest/gzip/CloudFormationResourceSpecification.json';

export async function getLatestSpec(
  url = DefaultSpecUrl,
  validate = true,
): Promise<CloudFormationSpec> {
  return new Promise((resolve, reject) => {
    const data: Buffer[] = [];

    const req = https.request(
      url,
      {
        headers: {
          'accept-encoding': 'deflate, gzip',
        },
      },
      (res) => {
        let reader: stream.Readable;
        const encoding = getHeader(res.headers, 'content-encoding');

        if (!encoding) {
          reader = res;
        } else if (encoding === 'gzip') {
          reader = res.pipe(zlib.createGunzip());
        } else if (encoding === 'deflate') {
          reader = res.pipe(zlib.createInflate());
        } else {
          reject(new Error(`can't process encoding ${encoding}`));
          return;
        }

        reader.on('data', (chunk) => {
          data.push(chunk);
        });

        reader.on('end', () => {
          try {
            const str = Buffer.concat(data).toString();
            const obj = JSON.parse(str);
            resolve(validate ? assert(decodeCloudFormationSpec, obj) : obj);
          } catch (err) {
            reject(err);
          }
        });
      },
    );

    req.on('error', reject);
    req.end();
  });
}

function getHeader(
  headers: http.IncomingHttpHeaders,
  key: string,
): string | undefined {
  key = key.toLowerCase();

  for (const header in headers) {
    if (header.toLowerCase() === key) {
      const value = headers[header];
      if (Array.isArray(value)) {
        return value.join(', ');
      } else {
        return value;
      }
    }
  }
}
