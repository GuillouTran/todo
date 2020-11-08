import React, {Component} from "react";
import firebaseConf from "./Firebase";

class displayBook extends Component {
  UNSAFE_componentWillMount() {
    let bookRef =
        firebaseConf.database().ref("book").orderByKey().limitToLast(100);
    bookRef.on("child_added", (snapshot) => {
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
      this.setState({book : [ data ].concat(this.state.book)});
    });
  };
  render() {
    return (
      <div className="col-sm-8">
        <div className="row">
          {this.state.book.map((book) => (
            <div
      className = "col-sm-4"
    key = {book.phone} style =
        {{ margin: `0px 0px 30px 0px` }} > {" "}<div className = "card">
        <div className = "card-body"><h4 className = "card-title">{book.title}<
            /h4>
                  <h6 className="card-subtitle mb-2 text-muted">
                    {book.author}
                  </h6>
        <h6 className = "card-subtitle mb-2 text-muted">{book.publisher}<
            /h6>
                  <p className="card-text">{book.isbn}</p>
        <a className = "card-link">{book.date}<
            /a>
                  <p className="card-link">{book.comment}</p>
        </div>
              </div></div>
          ))}
        </div><
        /div>
    );
  }
}

export default displayBook;
