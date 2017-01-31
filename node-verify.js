'use strict'

let https = require('https');
let domain = process.argv[2];
const URL = 'https://mta-sts.'+ domain +'/.well-known/mta-sts.json';

function verify(){
    let responce = https.get(URL, (res) => {
        //おまじない
        let body = '';
        res.setEncoding('utf-8');
        res.on('data', (chunk) => {
            body += chunk;
        });

    let webpki = res.on('end', (res) => {
            res = JSON.parse(body);
            let mtaSTS = res;
            if (mtaSTS.version === 'STSv1') {
                console.log("Valid Policy");
            }
            return console.log("true");
        });
    }).on('error', (e) => {
        console.log(e.message);
    });
};
verify();
