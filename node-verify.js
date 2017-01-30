'use strict'

let https = require('https');
let domain = process.argv[2];
let url = 'https://mta-sts.'+ domain +'/.well-known/mta-sts.json';

function verify(){
    let responce = https.get(url, (res) => {
        //おまじない
        let body = '';
        res.setEncoding('utf-8');
        res.on('data', (chunk) => {
            body += chunk;
        });

        res.on('end', (res) => {
            res = JSON.parse(body);
            let mtaSTS = res;
            //console.log(mtaSTS);
            if (mtaSTS.version === 'STSv1') {
                console.log("Valid Policy");
            }
        //console.log("work")
        });
    }).on('error', (e) => {
        console.log(e.message);
    });
};
verify(url);
