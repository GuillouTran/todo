import React, {Component} from "react";
import firebaseConf from "./Firebase";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {form : [], alert : false, alertData : {}};
  }

  showAlert(type, message) {
    this.setState({alert : true, alertData : {type, message}});
    setTimeout(() => { this.setState({alert : false}); }, 4000);
  }

  resetForm() { this.refs.bookVault.reset(); }

  UNSAFE_componentWillMount() {
    let formRef =
        firebaseConf.database().ref("form").orderByKey().limitToLast(100);
    formRef.on("child_added", (snapshot) => {
      const {
        title,
        author,
        isbn,
        publisher,
        date,
        date2,
        comment,
      } = snapshot.val();
      const data = {title, author, isbn, publisher, date, date2, comment};
      this.setState({form : [ data ].concat(this.state.form)});
    });
  }

  sendMessage(e) {
    e.preventDefault();
    const params = {
      title : this.inputTitle.value,
      author : this.inputAuthor.value,
      publisher : this.inputPublisher.value,
      isbn : this.inputISBN.value,
      date : this.inputDate.value,
      date2 : this.inputDate2.value,
      comment : this.textComment.value,
    };
    if (params.title && params.author && params.publisher && params.isbn &&
        params.comment) {
      firebaseConf.database()
          .ref("form")
          .push(params)
          .then(() => {
            this.showAlert("success", "The book was successfully submitted");
          })
          .catch(() => {
            this.showAlert("danger", "The book might not been saved");
          });
      this.resetForm();
    } else {
      this.showAlert("warning", "Please fill the form");
    }
  }

  render() {
    return (
      <div>
        {this.state.alert && (
          <div
            className={`alert alert-${this.state.alertData.type}`}
            role="alert"
          >
            <div className="container">{this.state.alertData.message}</div>
          </div>
        )}
        <div className="container" style={{
      padding: `40px 0px` }}>
          <div className="row">
            <div className="col-sm-4">
              <h2>Book Vault</h2>
              <form onSubmit={this.sendMessage.bind(this)} ref="bookVault">
                <div className="form-group">
                  <label htmlFor="title">Title</label>
                  <input
            type = "text"
            className = "form-control"
            id = "title"
            placeholder = "The title of the book"
            ref =
            { (title) => (this.inputTitle = title) } />
                </div >
                <div className = "form-group"><label htmlFor = "author">Author<
                    /label>
                  <input
                    type="text"
                    className="form-control"
                    id="author"
                    placeholder="The author of the book"
                    ref={(author) => (this.inputAuthor = author)}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="publisher">Publisher</label><
                input
            type = "text"
            className = "form-control"
            id = "publisher"
            placeholder = "The Publisher of the book"
            ref =
            {
              (publisher) => (this.inputPublisher = publisher)
            } />
                </div > <div className = "form-group">
                                             <label htmlFor = "isbn">ISBN - 13 <
                /label>
                  <input
                    type="text"
                    className="form-control"
                    id="isbn"
                    placeholder="Usually start with 978 or 979"
                    ref={(isbn) => (this.inputISBN = isbn)}
                  / >
                </div>
                <div className="form-group">
                  <label htmlFor="date">Date of Start</label><
                input
            type = "text"
            classname = "form-control"
            id = "date"
            placeholder = "The date in which you have started the book"
            ref =
            { (date) => (this.inputDate = date) } />
                </div >
                <div className = "form-group">
                <label htmlFor = "date2">Date of Finish<
                    /label>
                  <input
                    type="text"
                    className="form-control"
                    id="date2"
                    placeholder="The date in which you have finished the book"
                    ref={(date2) => (this.inputDate2 = date2)}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="comment">Comment</label><
                textarea
            type = "text"
            className = "form-control"
            id = "comment"
            rows = "3"
                    ref={(comment) => (this.textComment = comment)}
                  ></textarea>
                </div>
                <button type="submit" className="btn btn-primary">
                  Send
                </button>
              </form>
            </div>
            <div className="col-sm-8">
              <div className="row">
                {this.state.form.map((form) => (
                  <div
                    className="col-sm-4"
                    key={form.phone}
                    style={{ margin: `0px 0px 30px 0px` }}
                  >
                    <div className="card">
                      <div className="card-body">
                        <h4 className="card-title">{form.title}</h4>
                        <h6 className="card-subtitle mb-2 text-muted">
                          {form.author}
                        </h6>
                        <h6 className="card-subtitle mb-2 text-muted">
                          {form.publisher}
                        </h6>
                        <p className="card-text">{form.isbn}</p>
                        <a className="card-link">{form.date}</a>
                        <p className="card-link">{form.comment}</p>
                      </div>
                    </div>
                  </div>
                ))
  }
  </div>
            </div></div>
        </div><
      /div>
    );
  }
}

export default App;
