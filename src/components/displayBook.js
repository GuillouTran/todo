import React, {Component} from "react";
import firebaseConf from "./Firebase";

class displayBook extends Component {
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
        firebaseConf.database().ref("book").orderByKey().limitToLast(100);
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
  render() {
    return (
                   <div className="col-sm-8">
              <div className="row">
                {this.state.form.map((form) => (
                  <div
      className = "col-sm-4"
    key = {form.phone} style =
        {{ margin: `0px 0px 30px 0px` }} > <div className = "card">
        <div className = "card-body"><h4 className = "card-title">{form.title}<
            /h4>
                        <h6 className="card-subtitle mb-2 text-muted">
                          {form.author}
                        </h6>
        <h6 className = "card-subtitle mb-2 text-muted">{form.publisher}<
            /h6>
                        <p className="card-text">{form.isbn}</p>
        <a className = "card-link">{form.date}<
            /a>
                        <p className="card-link">{form.comment}</p>
        </div>
                    </div>
        </div>
                ))}
              </div><
        /div>
    )}}

export default displayBook;