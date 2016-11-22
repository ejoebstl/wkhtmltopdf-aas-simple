/*******************************************************************************
 * Simple node service wrapper around wkhtmltopdf.
 * 
 * Copyright (C) 2016 Emanuel Jöbstl <emanuel.joebstl@gmail.com>
 *
 * Licensed under MIT License. 
 ******************************************************************************/

import { spawn } from 'child_process';
import { http } from 'http';
import { default as express } from 'express';
import { default as bodyparser } from 'body-parser';

const PORT = process.env.SERVICE_PORT || 80;

const app = express();
app.use(bodyparser.json());
app.use(bodyparser.urlencoded());

app.get('/', (req, res) => {
  const url = req.query.url || req.body.url;
  const html = req.query.html || req.body.html;

  const options = req.query.options || req.body.html;

  let command = 'wkhtmltopdf -q ';
 
  // Options
  if(options) {
    command += options + ' ';
  }

  // Input
  if(url) {
    command += '"' + url + '" ';
    
    console.log("Servind PDF from URL: " + url);
  } else if(html) {
    command += '- ';
    console.log("Servind PDF from data");
  } else {
    res.status(500).send('No input given.');
    return;
  }

  // Output
  command += '- | cat';

  console.log("Invoking command: " + command);

  const child = spawn('/bin/sh', ['-c', command]);

  console.log(command);

  res.set('Content-Type', 'application/pdf');

  if(!url && html) {
    child.stdin.end(html);
  }
  
  child.stdout.pipe(res);

  child.on('close', () => {
    res.end();
  });
});

app.listen(PORT, () => {
  console.log('HTML to PDF service listening to port ' + PORT);
});






