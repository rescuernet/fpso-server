class checkUpload {
    checkUploadFile = (data,type) => {

        if(type === 'image'){
            if(data.mimetype !== ('image/jpeg' || 'image/jpg')){
                return 401
            }else{
                return 200
            }
        }
        if(type === 'docs'){
            switch(data.mimetype) {
                case "application/pdf": return 200
                case "application/vnd.openxmlformats-officedocument.wordprocessingml.document": return 200
                case "application/msword": return 200
                case "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet": return 200
                case "application/vnd.ms-excel": return 200
                default: return 401
            };
        }

    }
}



module.exports = new checkUpload();