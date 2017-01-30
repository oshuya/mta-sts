let https = require('https');
let url = 'https://mta-sts.yahoo.com/.well-known/mta-sts.json';

https.get(url, (res) => {
    let body = '';
    res.setEncoding('utf-8');

    res.on('data', (chunk) => {
        body += chunk;
    });

    res.on('end', (res) => {
        res = JSON.parse(body);
        let mtaSTS = res;
        //console.log(mtaSTS.version);
        if (mtaSTS.version === 'STSv1') {
            console.log("it works");
        }
    });
}).on('error', (e) => {
    console.log(e.message);
});