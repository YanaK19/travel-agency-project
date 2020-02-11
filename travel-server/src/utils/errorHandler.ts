export default (res: any, error: any) => {
    res.status(500).json({
        success: false,
        message: "Internal Server error !"
        //message: error.message ? error.message : error
    })
}