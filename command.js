let mxs = "mta6.am0.yahoodns.net"

let exec = require('child_process').exec
, openssl;
 
openssl = "openssl s_client -starttls smtp -crlf -connect" + " " + mxs + ":25 < /dev/null ";
console.log(openssl);
 
ssl = (openssl) => {
    return exec(openssl, {timeout: 10000},
        function(error, stdout, stderr) {
            //console.log('stdout: '+(stdout||'none'));
            //console.log('stderr: '+(stderr||'none'));
            if(stdout.match(/BEGIN CERTIFICATE/)) {
                console.log("SSL session");
            } 
            if(error !== null) {
                console.log('exec error: '+error);
            }
        }
    )
};


ssl(openssl);