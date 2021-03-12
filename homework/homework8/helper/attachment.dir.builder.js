const fs = require('fs-extra').promises;
const path = require('path');
const uuid = require('uuid').v1;

module.exports = async (file, docName, docType, userId, mainFolderName, subFolderName) => {
    const pathWithoutStatic = path.join(subFolderName, `${userId}`, docType);
    const attachmentDir = path.join(process.cwd(), mainFolderName, pathWithoutStatic);
    const fileExtension = docName.split('.').pop();
    const attachmentName = `${uuid()}.${fileExtension}`;
    const finalAttachmentPath = path.join(attachmentDir, attachmentName);
    const uploadPath = path.join(pathWithoutStatic, attachmentName);

    await fs.mkdir(attachmentDir, { recursive: true });
    await file.mv(finalAttachmentPath);

    return { finalAttachmentPath, attachmentDir, uploadPath };
};
