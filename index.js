const express = require('express');
const http = require('http');
const socketIO = require('socket.io');

const app = express();
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const multer = require('multer');
const path = require('path');
const port = 5000;

//setting up engines
app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use('/image', express.static(process.cwd() + '/Database/Images'));


// setting up image directory
const upload = multer({dest: __dirname + '/Database/Images'});

// local imports
const withAuth = require('./Routes/WithAuthMiddleware');
// importing db
const con = require('./Database/db');

// Routes

// register user
app.post('/register', require('./Routes/RegisterUser'));

// login user
app.post('/login', require('./Routes/Login'));

// Uploading image NOTE: here the name field is the name of the variable in which the image is being passed
app.post('/upload', upload.single('myImage'), require('./Routes/UploadImage'));

// saving image data in db
app.post('/saveImageData', require('./Routes/SaveImageData'));

// sending images info to the UI
app.get('/getImages/:userName', require('./Routes/GetImages'));

// blocking users
app.post('/blockUsers', require('./Routes/BlockUsers.js'));

// a way to simply ask our server if we have a valid token saved to our browser cookies
app.get('/checkToken', withAuth, function(req, res) {
    // console.log(req.userId);
    res.end(JSON.stringify(req.userId));
    // res.end(req.userId);
});

const server = http.Server(app);
server.listen(port, () => {
    console.log(`listening to port ${port}`);
});

// socket routes
const io = socketIO(server);
let myClientList = [];
io.on('connection', (socket) => {
    // myClientList[socket.id] = socket;
    console.info(`Client connected [id=${socket.id}]`);
    // console.log(socket.id);
    socket.on('addId', data => {
        for (var i = 0; i < myClientList.length; i++) {
            if (myClientList[i].name === data.name) {
                myClientList.splice(i, 1);
            }
        }
        myClientList.push(data);
        console.log(myClientList)
    });

    socket.on('like', data => {
        console.log(data)
        con.query(`select * from user where userId = ?`,
            [data.gotLikedId],
            (err, row) => {
                if (err) throw err;
                console.log(row);
                const index = myClientList.findIndex(client => client.name === row[0].name);
                console.log(index);
                if (index !== -1) {
                    socket.join(myClientList[index].id);
                    io.sockets.to(myClientList[index].id).emit('gotALike', {
                        id: myClientList[index].id,
                        msg: 'Somebody liked your picture'});
                }
                // console.log((data));

            })
    });

    socket.on('superLike', data => {
        console.log(data);
        con.query(`select * from user where userId = ?`,
            [data.gotLikedId],
            (err, row) => {
                if (err) throw err;
                const index = myClientList.findIndex(client => client.name === row[0].name);
                // console.log(index);
                if (index !== -1) {
                    socket.join(myClientList[index].id);
                    // console.log((data));
                    io.sockets.to(myClientList[index].id).emit('gotASuperLike', {
                        id: myClientList[index].id,
                        msg: `${data.likedBy} liked your picture`});
                }

            })
    });

    socket.on("disconnect", (socket) => {
       myClientList = myClientList.filter(obj => obj.id !== socket.id);
        console.log('disconnected');
        console.log(myClientList)
    });
});
