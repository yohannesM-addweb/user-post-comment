const {parse, join} = require('path');
const {createWriteStream} = require('fs');
const fs = require('fs');

module.exports.readImageFile = async (file) => {
    const {createReadStream, filename} = await file;
    const stream = createReadStream();

    var {ext, name} = parse(filename);
    name = `image${Math.floor((Math.random() * 10000) + 1)}`;
    let url = join(__dirname, `../Images/${name}-${Date.now()}${ext}`);
    const imageStream = await createWriteStream(url);
    await stream.pipe(imageStream);
    
    url = `http://localhost:3333/images/${url.split('Images')[1]}`;

    return url;

}
