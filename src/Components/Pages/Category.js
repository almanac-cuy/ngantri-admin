import React, { Component } from "react";
import "../Css/Queue.css";
import Axios from "axios";
// import Modal1 from "./Modal1";

class Category extends Component {
  constructor(props) {
    super(props);
    this.state = {
      services: [],
      name: "",
      duration: ""
    };
  }

  // componentDidMount() {
  //   this.getCategory();
  // }

  componentDidMount() {
    this.getCategory();
  }

  getCategory = async () => {
    try {
      const response = await Axios.get(
        "http://192.168.100.149:9400/api/instances/services/5e0216953c5f4e2b88afdc51"
      );
      // console.log(response.data.services);
      this.setState({
        services: response.data.services
      });
    } catch (error) {
      console.log(error);
    }
  };

  handleEditChange = e => {
    e.preventDefault();
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  handleAddCategory = () => {
    const name = this.state.name;
    const duration = this.state.duration * 60;
    const categoryNew = new FormData();
    categoryNew.append("name", name);
    categoryNew.append("duration", duration);
    console.log(categoryNew);

    Axios.post(
      "http://192.168.100.149:9400/api/instances/services/5e0216953c5f4e2b88afdc51",
      categoryNew
    )
      .then(() => {
        this.getCategory();
        this.setState({
          name: "",
          duration: ""
        });
      })
      .catch(error => {
        console.log(error);
      });
  };

  // handleEditCategory() {
  //   const { name, duration } = this.state;
  //   const categoryUpdate = {
  //     name,
  //     duration
  //   };
  //   Axios.patch
  // }

  addModal() {
    return (
      <div
        className="modal fade"
        id="exampleModal2"
        tabIndex={-1}
        role="dialog"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">
                Edit
              </h5>
              <button
                type="button"
                className="close"
                data-dismiss="modal"
                aria-label="Close"
              >
                <span aria-hidden="true">×</span>
              </button>
            </div>
            <div className="modal-body">
              <form>
                <div className="form-group">
                  <label htmlFor="exampleInputEmail1">Name</label>
                  <input
                    type="text"
                    className="form-control"
                    id="exampleInputEmail1"
                    name="name"
                    value={this.state.name}
                    onChange={this.handleEditChange}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="exampleInputPassword1">Duration</label>
                  <input
                    type="number"
                    className="form-control"
                    id="exampleInputPassword1"
                    name="duration"
                    value={this.state.duration}
                    onChange={this.handleEditChange}
                  />
                </div>
                <small id="emailHelp" className="form-text text-muted">
                  Inpun in minute
                </small>
              </form>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-dismiss="modal"
              >
                Close
              </button>
              <button
                onClick={this.handleAddCategory}
                type="button"
                className="btn btn-primary"
              >
                Save changes
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  editModal() {
    const { name, duration } = this.state;
    return (
      <div
        className="modal fade"
        id="exampleModal"
        tabIndex={-1}
        role="dialog"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">
                Edit
              </h5>
              <button
                type="button"
                className="close"
                data-dismiss="modal"
                aria-label="Close"
              >
                <span aria-hidden="true">×</span>
              </button>
            </div>
            <div className="modal-body">
              <form>
                <div className="form-group">
                  <label htmlFor="exampleInputEmail1">Name</label>
                  <input
                    type="text"
                    className="form-control"
                    id="exampleInputEmail1"
                    name="name"
                    value={name}
                    onChange={this.handleEditChange}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="exampleInputPassword1">Duration</label>
                  <input
                    type="number"
                    className="form-control"
                    id="exampleInputPassword1"
                    name="duration"
                    value={duration}
                    onChange={this.handleEditChange}
                  />
                </div>
                <small id="emailHelp" className="form-text text-muted">
                  Inpun in minute
                </small>
              </form>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-dismiss="modal"
              >
                Close
              </button>
              <button type="button" className="btn btn-primary">
                Save changes
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  render() {
    // console.log(this.state.services);
    return (
      <div>
        <div className="content">
          <button
            style={{ float: "right" }}
            className="button button1"
            data-toggle="modal"
            data-target="#exampleModal2"
          >
            Add Category
          </button>
          <h2>Category Table</h2>
          {/* <p></p>
          <p></p> */}
          <div style={{ overflowX: "auto" }}>
            <table>
              <tbody>
                <tr>
                  <th>No</th>
                  <th>Name</th>
                  <th>Duration</th>
                  <th>Action</th>
                </tr>
                {this.state.services.map((item, index) => (
                  <tr key={item._id}>
                    <td>{index + 1}</td>
                    <td>{item.name}</td>
                    <td>{item.duration / 60} mins </td>
                    <td>
                      <button
                        onClick={e => {
                          e.preventDefault();
                          this.setState({
                            name: item.name,
                            duration: item.duration / 60
                          });
                        }}
                        type="button"
                        className="button button2"
                        data-toggle="modal"
                        data-target="#exampleModal"
                      >
                        Edit
                      </button>
                      <button className="button button3">Delete</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
        {this.editModal()}
        {this.addModal()}
      </div>
    );
  }
}

export default Category;
