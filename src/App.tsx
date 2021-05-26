import React from 'react';
import logo from './logo.svg';
import {FormEvent, Component, ChangeEvent} from 'react';
import './App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <p>Upload your image here: </p>
        <ImageUpload />
      </header>
    </div>
  );
}

interface ImageUploadState {
  image: string;
}

class ImageUpload extends Component<{}, ImageUploadState> {
  reader = new FileReader();

  constructor({}) {
    super({});
    this.state = {image: ""}
    this.reader.onload = this.readerOnLoad.bind(this);
  }

  readerOnLoad(event: ProgressEvent<FileReader>) {
    if (event && event.target && event.target.result) {
      this.setState({image: event.target.result as string});
    }
  }

  handlePictureUpload(event: ChangeEvent<HTMLInputElement>) {
    if (event.target.files && event.target.files.length > 0) {
      const file = event.target.files.item(0)!;
      this.reader.readAsDataURL(file);
    }
  }

  render() {
    return (
      <div>
        <input type="file" accept="image/*" onChange={(event) => this.handlePictureUpload(event)} multiple = {false} />
        <img src = {this.state.image}
        ></img>
      </div>
    );
  }

}

export default App;
