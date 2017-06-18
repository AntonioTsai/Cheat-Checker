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
}).then((files) => {
    // data.sort((a, b) => {
    //     md5_a = a.split(' = ')[1];
    //     md5_b = b.split(' = ')[1];

    //     if(md5_a > md5_b) {
    //         return 1;
    //     } else if (md5_a < md5_b) {
    //         return -1;
    //     }
    //     return 0;
    // });

    // data.every((element, index, array) => {
    //     console.log("Index:", index, element);
    // });

    // Pre process for check repeat
    // Transfer item in array to object
    var files_json = files.map(file => {
        return {
            count: 1,
            file: file,
            md5: file.split(' = ')[1],
        };
    });
    files_json.unshift({});

    // Check repeated MD5
    var uniq = files_json.reduce((acc, cur) => {
        if(acc[cur.md5] == undefined) {
            acc[cur.md5] = {
                count: 1,
                files: [],
            };
            acc[cur.md5]['files'].push(cur.file);
        } else {
            acc[cur.md5].count++;
            acc[cur.md5]['files'].push(cur.file);
        }

        return acc;
    });
    //
    // console.log("Item in uniq");
    // Object.keys(uniq).map(i => console.log(uniq[i]));
    //
    var repeated = {};
    for(let md5 in uniq) {
        if(uniq[md5]['count'] > 1)
            repeated[md5] = uniq[md5];
    }

    return repeated;
}).then(repeated => {
    for(md5 in repeated) {
        repeated[md5]['files'].map(file => console.log(file));
        console.log();
    }
});
