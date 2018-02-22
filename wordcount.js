const request = require('request');

if (require.main == module) {

    let url = process.argv[3];
    let search = process.argv[2];

    // Running as a script
    if(process.argv[2] === undefined || process.argv[3] === undefined){
        console.log("please pass in the first parameter as search string and second as URL");
        console.log("Example: node wordcount.js 'search string' google.com");
        process.exit();
    }

    if (url.toString().indexOf("http") !== 0) {
        url = "http://www." + url
    }

    console.log('downloading the URL...');
    request(url, (error, response, body) => {
        //if error send it to console
        if (error) console.log(error);

        //else go ahead and find the string
        console.log('counting the words...');
        find(search, body)
            .then(data => console.log(data))
            .catch(error => console.log(error))
    });

} else {
    // Being required
    module.exports = find;
}

const find = (search, data) => {
    return new Promise((resolve, reject) => {
        let find = new RegExp(search, "g");
        let count = data.match(find);
        if (count === null) {
            count = [];
        }
        return resolve(count.length);
    })
}