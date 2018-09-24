import * as fs from 'fs';

export const importSchema = (path) => {
    const schema = [];
    let files    = getFiles(path);

    for (let file of files) {
        schema.push(fs.readFileSync(file, { encoding: 'utf8' }));
    }

    return schema;
};

const getFiles = (dir, files_ = []) => {
    files_ = files_ || [];

    let files = fs.readdirSync(dir);

    for (let i in files) {
        let name = dir + '/' + files[i];
        if (fs.statSync(name).isDirectory()) {
            getFiles(name, files_);
        } else {
            let regex = /^.*\.graphql/g;

            if (regex.exec(name)) {
                files_.push(name);
            }
        }
    }

    return files_;
};