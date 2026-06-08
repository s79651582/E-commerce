import baseUrl from '../Api/baseURL'

const useDeleteData = async (url, parmas) => {
    const config={
        headers:{
            Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2OWNkN2VmMzljNTBjMTA4YjUxZWYyYTQiLCJpYXQiOjE3Nzg5NDA1OTgsImV4cCI6MTc4NjcxNjU5OH0.Iva9qQJbCMgJ8SD5SviRQNxMkGAxTKBuSfph-_na3Y4`
        }
    }
    const res = await baseUrl.delete(url, config);
    return res.data;
}

export default useDeleteData;