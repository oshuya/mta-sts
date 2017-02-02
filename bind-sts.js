'use strict'

let https = require('https');
let domain = process.argv[2];
let TXT = process.argv[3];
let mxs = process.argv[4];

const URL = 'https://mta-sts.'+ domain +'/.well-known/mta-sts.json';

function version (mtaSTS) {
    if (mtaSTS.version === 'STSv1'){
       //console.log("Valid Policy")
    }
}

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
        version(mtaSTS);
    });
}).on('error', (e) => {
    console.log(e.message);
});

let exec = require('child_process').exec
, openssl;
 
openssl = "openssl s_client -starttls smtp -crlf -connect" + " " + mxs + ":25 < /dev/null ";
//console.log(openssl);
 
let ssl = (openssl) => {
    return exec(openssl, {timeout: 10000},
        function(error, stdout, stderr) {
            //console.log('stdout: '+(stdout||'none'));
            //console.log('stderr: '+(stderr||'none'));
            if(stdout.match(/Verify return code: 0 /)) {
                //console.log("SSL session");
                //return 1;
				console.log(1);
            } 
            if(error !== null) {
                console.log('exec error: '+error);
                console.log(0); 
            }
        }
    )
};

ssl(openssl);
