



const decodeBase64 = (base64String) => {
    const decodedBytes = Buffer.from(base64String, 'base64');
    const decodedString = decodedBytes.toString('utf-8');
    return JSON.parse(decodedString);
}

export default decodeBase64;