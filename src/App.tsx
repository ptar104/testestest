import React from 'react';
import adam from './Adam.jpeg';
import {FormEvent, Component, ChangeEvent} from 'react';
import './App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <p>Upload your image here: </p>
        <img src="Adam.jpeg"></img>
        <ImageUpload />
        <PostPage />
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
        <img src = {this.state.image}></img>
      </div>
    );
  }
}

interface Post {
  content: String
}

interface PostPageState {
  posts: Post[];
}
 
class PostPage extends React.Component<{}, PostPageState> {
  constructor({}) {
    super({});
    this.state = {
      posts: [{content: "existing post"}],
    };
  }
  submitPost(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const submittedContent = event.currentTarget.contentField.value;
    this.setState({
      posts: [...this.state.posts, {content: event.currentTarget.contentField.value}],
    });
    event.currentTarget.contentField.value = '';
  }
 
  render() {
    return (
      <div className="App">
        <h1>Sample Post page:</h1>
        
        {this.state.posts.map(post => <p>{post.content}</p>)}
 
        <form onSubmit={e => this.submitPost(e)}>
          <input name="contentField" type="text" />
          <button type="submit">Submit</button>
        </form>
      </div>
    );
  }
}

export default App;
