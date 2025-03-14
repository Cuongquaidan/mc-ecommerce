const url = `https://api.cloudinary.com/v1_1/${process.env.REACT_APP_CLOUD_NAME_CLOUDINARY}/image/upload`;

// const uploadImage = async (image) => {
//     const formData = new FormData();
//     formData.append("file", image);
//     formData.append("upload_preset", "mcshop");
//     const dataResponse = await fetch(url, {
//         method: "POST",
//         body: formData,
//     });
//     return dataResponse.json();
// };

const uploadImage = async (image) => {
    const timestamp = Date.now(); // Lấy thời gian hiện tại (milliseconds)
    
    // Lấy tên file gốc từ image.name (giả sử image là File object)
    const originalName = image.name.split(".")[0]; // Bỏ phần đuôi mở rộng (.jpg, .png)
    
    const uniqueFileName = `${originalName}_${timestamp}`; // Tạo tên file mới

    const formData = new FormData();
    formData.append("file", image, uniqueFileName); 
    formData.append("upload_preset", "mcshop");

    const response = await fetch(url, {
        method: "POST",
        body: formData,
    });

    return response.json();
};

export default uploadImage;
