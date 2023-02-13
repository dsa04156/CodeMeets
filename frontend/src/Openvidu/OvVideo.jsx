import React, { Component } from 'react';

export default class OpenViduVideoComponent extends Component {

    constructor(props) {
        super(props);
        this.videoRef = React.createRef();
    }

    componentDidUpdate(props) {
        if (props && !!this.videoRef) {
            this.props.streamManager.addVideoElement(this.videoRef.current);
        }
    }

    componentDidMount() {
        if (this.props && !!this.videoRef) {
            this.props.streamManager.addVideoElement(this.videoRef.current);
        }
    }

    render() {
        return (
            <div>
                {console.log(this.props)}
                {this.props.type === "main" ? <video autoPlay={true} ref={this.videoRef} style={{width:"150vh", height:"78vh", border:"1px solid black"}}/> : <video autoPlay={true} ref={this.videoRef} style={{width:"10vh", height:"7vh"}}/>}
            </div>
        );
    }
}
