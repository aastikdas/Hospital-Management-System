import app from "./app.js";
import { v2 as cloudinary } from 'cloudinary'

const PORT=process.env.PORT || 8000;

cloudinary.config({ 
  cloud_name: process.env.COULDINARY_CLOUD_NAME, 
  api_key: process.env.COULDINAR_API_KEY, 
  api_secret: process.env.COULDINAR_API_SECRET,
});

app.listen(PORT,()=>{
    console.log(`Server is running on port ${PORT}`);
});               