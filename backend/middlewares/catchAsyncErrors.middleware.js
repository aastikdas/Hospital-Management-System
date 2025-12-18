export const catchAsyncErrors = (theFunciton) =>{
    return (req,res,next)=>{
        Promise.resolve(theFunciton(req,res,next)).catch(next)
    }
}