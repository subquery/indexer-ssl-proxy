import express from 'express';
import httpProxy from 'http-proxy';

const proxy = httpProxy.createProxyServer({
  ignorePath: true,
});

const app = express();
// TODO: check indexer and its url
app.options('/:indexer', function(req, res) {
  const {indexer} = req.params;
  let {to} = req.query;
  if (!to) {
    to = req.headers.to;
  }
  console.log('Request', req.method, to, indexer);
  if (!indexer || !to) {
    res.status(500).end();
    return;
  }
  res.setHeader('Access-Control-Allow-Origin', '*');
  proxy.web(req, res, { target: to.toString() });
});
app.post('/:indexer', function(req, res) {
  const {indexer} = req.params;
  let {to} = req.query;
  if (!to) {
    to = req.headers.to;
  }
  console.log('Request', req.method, to, indexer);
  if (!indexer || !to) {
    res.status(500).end();
    return;
  }
  res.setHeader('Access-Control-Allow-Origin', '*');
  proxy.web(req, res, { target: to.toString() });
});

app.listen(process.env.PORT ?? 3000);
