# wkhtmltopdf-aas-simple
Post URL, receive PDF. Build upon node and docker. 🚀

## How to use

This is a tiny node service, which listens only to a single route: `\`. The service takes an URL or HTML and a string containing options, then calls `wkhtmltopdf` and sends the generated PDF back to the client. Options can be send as query parameters (HTTP GET), or inside request body. Params in the body can be url- or json-encoded.

*Options*

`url`: The url of the website to render as PDF.  

`html`: HTML to render as PDF. Either `url` or `html` have to be set.  

`options`: String of options forwarded to `wkhtmltopdf`.

*Sample usage*
```
curl "http://localhost:8080/?url=https%3A%2F%2Fgoogle.com" > test.pdf
```

## Compile and Run (without docker)

```
npm run compile
node compiled/index.js
```

## Runing with docker

```
docker pull ejobstl/wkhtmltopdf-aas-simple
docker run -p 8080:80 ejoebstl/wkhtmltopdf-aas-simple
```

## Security Considerations

This simple service does not do any param sanitizing. Since it spawns child processes, it's very easy to inject bad commands (such as `cat /etc/shadow`) and get their output. Please do not expose this service to the outside. 
