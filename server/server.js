import e from "express";
import cors from "cors";
import dotenv from "dotenv";
import routes from "./routes.js"

dotenv.config();

const app = e();
const PORT = process.env.PORT

app.use(cors());
app.use(e.json());
app.use('/api', routes);

app.get('/', (req,res)=>{
    res.json({message: "Budget Tracker API running"});
});

app.listen(PORT,()=>{
    console.log(`server is running in port ${PORT}`);
});


