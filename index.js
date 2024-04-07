const express = require("express");
const mongoose = require('mongoose')
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

let CONNECTION_STRING = "mongodb+srv://lahirumadhushan80:zLQR31o42WHS5YYH@codesec.1e0o3xd.mongodb.net/?retryWrites=true&w=majority";

let databaseName = "Codesec";

app.listen(3005, async () => {
    try {
        await mongoose.connect(CONNECTION_STRING, {
            dbName: databaseName,
        });

        isConnected = true;
        console.log("MongoDB Connected");
    } catch (error) {
        console.log(error);
    }
})



const UserSchema = new mongoose.Schema({
    Fname: String,
    Lname: String,
    Email: String,
    Phone: String,
    Password: String
  });
  
  const User = mongoose.model("registers", UserSchema);
  

app.post('/api/AddUser', async (request, response) => {
    try {
        const { Fname, Lname, Email, Phone, Password } = request.body;
        

      
        if (!Fname || !Lname || !Email || !Phone || !Password) {
            return response.status(400).json({ error: 'All fields are required' });
        }

    
        const existingUser = await User.findOne({ Email: Email });
        if (existingUser) {
            return response.status(400).json({ error: 'Email already exists' });

        }
        

     
        const newUser = new User({
            Fname,
            Lname,
            Email,
            Phone,
            Password
        });

   
        const savedUser = await newUser.save();
        response.json(savedUser);
    } catch (error) {
        console.error('Error saving user:', error);
        response.status(500).json({ error: 'Internal server error' });
    }
});



app.get('/api/login', async  (req, res) =>{
    const {Email, Password} = req.body;
    const user = await User.findOne({ Email: Email });


    if(user){
        if(user.Password == Password){
            res.json("success")
        }
        else{
            res.json("the password is incorrect")
        }
    }
    
    
    else{
        res.json("no record exist")
    }
})






app.get('/api/GetUserByEmail/:email', async (request, response) => {
    try {
        const Email = request.params.Email;


        const user = await User.findOne({ Email: Email });

        if (!user) {
            return response.status(404).json({ error: 'User not found' });
        }

        response.json(user);
    } catch (error) {
        console.error('Error fetching user:', error);
        response.status(500).json({ error: 'Internal server error' });
    }
});
