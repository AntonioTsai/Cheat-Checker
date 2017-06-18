const fs = require('fs');

new Promise((resolve) => {
    fs.readFile('MD5sums.txt', 'utf8', (err, data) => {
        if(err)
            throw err;

        file = data.split('\n');
        console.log(`Total ${file.length - 1} files`);
        // The final line is empty
        if(file.length != 1)
            resolve(file);
    });
}).then((data) => {
    data.sort((a, b) => {
        md5_a = a.split(' = ')[1];
        md5_b = b.split(' = ')[1];

        if(md5_a > md5_b) {
            return 1;
        } else if (md5_a < md5_b) {
            return -1;
        }
        return 0;
    });

    data.every((element, index, array) => {
        console.log("Index:", index, element);
    });
});
