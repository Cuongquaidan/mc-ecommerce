export default function convertToBase64(file) {
    const fileReader = new FileReader();
    fileReader.readAsDataURL(file);

    const data = new Promise((resolve, reject) => {
        fileReader.onload = () => {
            resolve(fileReader.result);
        };
        fileReader.onerror = (error) => {
            reject(error);
        };
    });
    return data;
}
