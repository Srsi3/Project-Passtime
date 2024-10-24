import React from "react";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import axios from "axios";

// Define the interface for the quote data
interface QuoteDetail {
    detail: string;
    name: string;
}

class Quote extends React.Component {
    state: {
        details: QuoteDetail[];
        user: string;
        quote: string;
    } = {
        details: [], // Initialize the state
        user: "",
        quote: "",
    };

    // Fetch data when the component mounts
    componentDidMount() {
        axios
            .get<QuoteDetail[]>("http://localhost:8000/wel/")
            .then((res) => {
                this.setState({
                    details: res.data,
                });
            })
            .catch((err) => {
                console.error(err);
            });
    }

    // Function to determine the background color
    renderSwitch = (param: number) => {
        switch (param + 1) {
            case 1:
                return "primary";
            case 2:
                return "secondary";
            case 3:
                return "success";
            case 4:
                return "danger";
            case 5:
                return "warning";
            case 6:
                return "info";
            default:
                return "yellow";
        }
    };

    // Handle input changes for the form
    handleInput = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        this.setState({
            [e.target.name]: e.target.value,
        });
    };

    // Handle form submission
    handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        axios
            .post("http://localhost:8000/wel/", {
                name: this.state.user,
                detail: this.state.quote,
            })
            .then((res) => {
                // Clear form fields and refresh quotes
                this.setState({
                    user: "",
                    quote: "",
                });
                this.componentDidMount(); // Re-fetch quotes after submission
            })
            .catch((err) => {
                console.error(err);
            });
    };

    // Render the component
    render() {
        return (
                <div className="container jumbotron">
                    {/* Navigation */}
                    <nav>
                        <ul>
                            <li>
                                <Link to="/">View Quotes</Link>
                            </li>
                            <li>
                                <Link to="/submit">Submit a Quote</Link>
                            </li>
                        </ul>
                    </nav>

                    <hr />

                    {/* Define Routes */}
                    <Routes>
                        {/* Quote List Route */}
                        <Route
                            path="/"
                            element={
                                <div>
                                    {this.state.details.map((detail, id) => (
                                        <div key={id}>
                                            <div className="card shadow-lg">
                                                <div
                                                    className={
                                                        "bg-" +
                                                        this.renderSwitch(id % 6) +
                                                        " card-header"
                                                    }
                                                >
                                                    Quote {id + 1}
                                                </div>
                                                <div className="card-body">
                                                    <blockquote
                                                        className={
                                                            "text-" +
                                                            this.renderSwitch(id % 6) +
                                                            " blockquote mb-0"
                                                        }
                                                    >
                                                        <h1>{detail.detail}</h1>
                                                        <footer className="blockquote-footer">
                                                            <cite title="Source Title">{detail.name}</cite>
                                                        </footer>
                                                    </blockquote>
                                                </div>
                                            </div>
                                            <span className="border border-primary"></span>
                                        </div>
                                    ))}
                                </div>
                            }
                        />

                        {/* Quote Submission Form Route */}
                        <Route
                            path="/submit"
                            element={
                                <form onSubmit={this.handleSubmit}>
                                    <div className="input-group mb-3">
                                        <div className="input-group-prepend">
                                            <span className="input-group-text" id="basic-addon1">
                                                Author
                                            </span>
                                        </div>
                                        <input
                                            type="text"
                                            className="form-control"
                                            placeholder="Name of the Poet/Author"
                                            aria-label="Username"
                                            aria-describedby="basic-addon1"
                                            value={this.state.user}
                                            name="user"
                                            onChange={this.handleInput}
                                        />
                                    </div>

                                    <div className="input-group mb-3">
                                        <div className="input-group-prepend">
                                            <span className="input-group-text">Your Quote</span>
                                        </div>
                                        <textarea
                                            className="form-control"
                                            aria-label="With textarea"
                                            placeholder="Tell us what you think of ....."
                                            value={this.state.quote}
                                            name="quote"
                                            onChange={this.handleInput}
                                        ></textarea>
                                    </div>

                                    <button type="submit" className="btn btn-primary mb-5">
                                        Submit
                                    </button>
                                </form>
                            }
                        />
                    </Routes>
                </div>
        );
    }
}

export default Quote;
