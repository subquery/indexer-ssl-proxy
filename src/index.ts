import express from 'express';
import httpProxy from 'http-proxy';

const proxy = httpProxy.createProxyServer({
  ignorePath: true,
});

const app = express();
// TODO: check indexer and its url
app.post('/:indexer', function(req, res) {
  const {indexer} = req.params;
  const {to} = req.query;
  console.log('Request', to, indexer);
  if (!indexer || !to) {
    res.status(500).end();
    return;
  }
  proxy.web(req, res, { target: to.toString() });
});

app.listen(process.env.PORT ?? 3000);
