const path = require('path');

module.exports = {
  uploadAndGetPath: async (reqFile, folderPath) => {
    return new Promise((resolve, reject) => {
      if (!reqFile || !reqFile._files) {
        return reject(new Error('No file was uploaded'));
      }

      reqFile.upload({
        dirname: path.resolve(sails.config.appPath, folderPath),
        maxTimeToBuffer: 60000, // 60 seconds timeout
        maxBytes: 100000000 // 100 MB limit
      }, (err, uploadedFiles) => {
        if (err) {
          return reject(err);
        }
        if (uploadedFiles.length === 0) {
          return reject(new Error('No file was uploaded'));
        }

        // Return file path
        return resolve(folderPath + '/' + path.basename(uploadedFiles[0].fd));
      });
    });
  }
};
