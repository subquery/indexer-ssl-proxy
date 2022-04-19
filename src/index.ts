import express from 'express';
import httpProxy from 'http-proxy';
import { ServerResponse } from "http";

const proxy = httpProxy.createProxyServer({
  ignorePath: true,
  changeOrigin: true,
});

const app = express();
// TODO: check indexer and its url
app.all('/:indexer', function (req, res) {
  const { indexer } = req.params;
  let { to } = req.query;
  if (!to) {
    to = req.headers.to;
  }
  console.log('Request', req.method, to, indexer);
  if (!indexer || !to) {
    res.status(500).end();
    return;
  }
  res.setHeader('Access-Control-Allow-Origin', '*');
  proxy.web(req, res, { target: to.toString() }, (err, req, res, target) => {
    console.error(err);
    (res as ServerResponse).writeHead(500, {
      'Content-Type': 'text/plain'
    });

    res.end(err.message);
  });
});

app.listen(process.env.PORT ?? 3000);
