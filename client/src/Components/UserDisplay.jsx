import React from "react";
import axios from 'axios';
import Button from "reactstrap/lib/Button";

let socket = require("socket.io-client")("http://localhost:5000");

export default class UserDisplay extends React.Component {
    state = {
        imageData: []
    };

    componentDidMount() {
        // alert('user logged in')
        console.log(this.props.match.params.name);
        let n = (this.props.match.params.name);
        socket.onopen = () => {
            socket.send('Hello, Client is connected!!')
        };
        socket.on('connect', function() {
            const obj = {
                name: n,
                id: socket.id
            };
            socket.emit('addId', obj);
            console.log(socket.id);
        });
        socket.on('gotALike', data => {
            // console.log(socket.id, data.id)
            if (data.id === socket.id) {
                alert(data.msg)
            }
        });

        socket.on('gotASuperLike', data => {
            if (data.id === socket.id) {
                alert(data.msg)
            }
        });

        axios.get(`/getImages/${this.props.match.params.name}`)
            .then(async res => {
                const imageData = [];
                for (let i in res.data) {
                    const imgSrc ='/image/' + res.data[i].image;
                    if (res.data[i].name !== this.props.match.params.name){
                        imageData.push({
                            name: res.data[i].name,
                            imgSrc,
                            userId: res.data[i].userId
                        })
                    }
                }
                await this.setState({imageData});
                console.log(this.state.imageData);
            })
    }

    blockUser = (e) => {
        e.preventDefault();
        const obj = {
            currentUser: this.props.match.params.name,
            name: e.target.value
        };

        axios.post('/blockUsers', obj)
            .then(res => {
                console.log(res.data)
            });
        console.log(e.target.value);
    };

    likeImage = (e) => {
        e.preventDefault();
        console.log(e.target.value);
        const data = {
            likedBy: e.target.value,
            gotLikedId: e.target.name
        };
        console.log(socket.id);
        socket.emit('like', data);

    };

    superLikeImage = (e) => {
        e.preventDefault();
        console.log(e.target.value);
        const data = {
            likedBy: e.target.value,
            gotLikedId: e.target.name
        };
        console.log(socket.id);
        socket.emit('superLike', data);
    };

    render() {
        // window.location.reload()
        const {imageData} = this.state;
        return (
            <div className="row images">
                {
                 imageData.map((value, index) => {
                     return (
                         <div
                             className="col-md-6 col-sm-12 image-container"
                             key={index}
                         >
                             <img src={value.imgSrc} alt={value.name} />
                             <div className="row options-row">
                                 <div className="col-sm-12 options">
                                     <Button
                                         name={value.userId}
                                         value={this.props.match.params.name}
                                         onClick={this.likeImage}
                                     >
                                         Like
                                     </Button>
                                     <Button
                                         name={value.userId}
                                         value={this.props.match.params.name}
                                         onClick={this.superLikeImage}
                                     >
                                         Super Like
                                     </Button>
                                     <Button value={value.name}
                                             onClick={this.blockUser}
                                     >
                                         Block
                                     </Button>
                                 </div>
                             </div>
                         </div>
                     )
                 })
                }
            </div>
        );
    }
}