const {
    DOCS_MIMETYPES,
    FILE_MAX_SIZE,
    PHOTO_MAX_SIZE,
    PHOTOS_MIMETYPES,
    VIDEO_MAX_SIZE,
    VIDEOS_MIMETYPES
} = require('../constant/constants');

module.exports = {
    checkFile: (req, res, next) => {
        try {
            const { files } = req;

            const allFiles = Object.values(files);

            console.log(files);

            const docs = [];
            const photos = [];
            const videos = [];

            for (let i = 0; i < allFiles.length; i++) {
                const { mimetype, name, size } = allFiles[i];

                if (PHOTOS_MIMETYPES.includes(mimetype)) {
                    if (PHOTO_MAX_SIZE < size) {
                        throw new Error(`file ${name} is too big`);
                    }

                    photos.push(allFiles[i]);
                } else if (DOCS_MIMETYPES.includes(mimetype)) {
                    if (FILE_MAX_SIZE < size) {
                        throw new Error(`file ${name} is too big`);
                    }

                    docs.push(allFiles[i]);
                } else if (VIDEOS_MIMETYPES.includes(mimetype)) {
                    if (VIDEO_MAX_SIZE < size) {
                        throw new Error(`file ${name} is too big`);
                    }

                    videos.push(allFiles[i]);
                } else {
                    throw new Error('Not valid file');
                }
            }

            req.docs = docs;
            req.photos = photos;
            req.videos = videos;

            next();
        } catch (e) {
            next(e);
        }
    },

    checkAvatar: (req, res, next) => {
        try {
            if (req.photos.length > 1) {
                throw new Error('You can download just one photo');
            }

            [req.avatar] = req.photos; // передаєм перший елемент масиву

            next();
        } catch (e) {
            next(e);
        }
    }
};
