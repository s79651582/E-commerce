import baseUrl from '../Api/baseURL'


const useInsertDataWithImage = async (url, params) => {
    try {
        const config={
            headers:{
                "Content-Type":"multipart/form-data",
                //Authorization: `Bearer ${localStorage.getItem("token")}`
                Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2OWNkN2VmMzljNTBjMTA4YjUxZWYyYTQiLCJpYXQiOjE3Nzg5NDA1OTgsImV4cCI6MTc4NjcxNjU5OH0.Iva9qQJbCMgJ8SD5SviRQNxMkGAxTKBuSfph-_na3Y4`
            }
        }
        const res = await baseUrl.post(url, params, config);
        console.log(res.status)
        return res;
    } 
    catch (err) {
        //return err.response;   // ✅ هنا الحل
        throw err;
    }
}


const useInsertData = async (url, params) => {
    const config={
        headers:{
            //Authorization: `Bearer ${localStorage.getItem("token")}`
            Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2OWNkN2VmMzljNTBjMTA4YjUxZWYyYTQiLCJpYXQiOjE3Nzg5NDA1OTgsImV4cCI6MTc4NjcxNjU5OH0.Iva9qQJbCMgJ8SD5SviRQNxMkGAxTKBuSfph-_na3Y4`
        }
    }
    const res = await baseUrl.post(url, params, config);
    return res;
}

export { useInsertData, useInsertDataWithImage };